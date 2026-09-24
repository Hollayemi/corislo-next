import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { server } from "./app/redux/api/backendUrl";

/**
 * NextAuth is configured to WRAP the existing Express/MongoDB backend rather
 * than replace it:
 *  - Credentials providers call the backend's real /signin endpoints and the
 *    backend remains the single source of truth for password hashing, user
 *    records, and validation rules.
 *  - What changes is where the resulting access token lives: instead of
 *    `localStorage` (readable by any injected/XSS script), it's now sealed
 *    inside NextAuth's encrypted, httpOnly session cookie.
 *  - Google sign-in exchanges the OAuth profile with a backend endpoint
 *    (`/api/v1/auth/oauth`) that the backend does not have yet — see
 *    BACKEND_OAUTH_SPEC.md for exactly what to build there. Until it exists,
 *    Google sign-in will surface a clear "OAuthBackendError".
 */

class BackendCredentialsError extends CredentialsSignin {
  code;
  constructor(message) {
    super(message);
    this.code = message;
  }
}

async function backendFetch(path, body) {
  const res = await fetch(`${server}/api/v1${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  let json;
  try {
    json = await res.json();
  } catch {
    // fall through — res.ok check below will produce a sane error
  }

  if (!res.ok || !json?.success) {
    throw new BackendCredentialsError(json?.message || "Invalid email or password");
  }

  return json;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  trustHost: true,
  
  // IMPORTANT: Configure cookies to work across subdomains
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
      ? `__Secure-next-auth.session-token`
      : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        // This is the key - the dot prefix makes it work for all subdomains
        domain: process.env.NODE_ENV === 'production' ? '.lawticha.com' : undefined,
      },
    },
  },

  providers: [
    // Citizen / Lawyer login — wraps POST /api/v1/auth/signin
    Credentials({
      id: "credentials",
      name: "Citizen/Lawyer Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email 
        const password = credentials?.password
        if (!email || !password) {
          throw new BackendCredentialsError("Email and password are required");
        }

        const json = await backendFetch<any>("/auth/signin", { email, password });
        const { user, accessToken } = json.data;

        console.log(user)

        return {
          id: user._id,
          email: user.email,
          name: user.fullName,
          image: user.avatarUrl,
          role: user.role, // "citizen" | "lawyer"
          actor: "user",
          accessToken,
        };
      },
    }),

    // Admin login — wraps POST /api/v1/auth/admin/login
    Credentials({
      id: "admin-credentials",
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password  ;
        if (!email || !password) {
          throw new BackendCredentialsError("Email and password are required");
        }

        const json = await backendFetch<AdminAuthResponse>("/auth/admin/login", {
          email,
          password,
        });
        const { admin, accessToken } = json.data;

        return {
          id: admin.email,
          email: admin.email,
          name: admin.name,
          role: (admin.role) || "admin",
          actor: "admin",
          accessToken,
        };
      },
    }),

    // Google OAuth — exchanged with the backend in the jwt callback below
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // Credentials sign-in (citizen/lawyer/admin): `user` is whatever
      // authorize() returned above.
      if (user) {
        token.accessToken = (user).accessToken;
        token.role = (user).role;
        token.actor = (user).actor;
        token.userId = (user).id;
      }

      // Google sign-in: exchange the OAuth profile with the backend so it
      // can create-or-fetch the user and issue a real backend access token.
      if (account?.provider === "google") {
        try {
          const res = await fetch(`${server}/api/v1/auth/oauth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              provider: "google",
              providerAccountId: account.providerAccountId,
              email: token.email,
              name: token.name,
              image: token.picture,
            }),
          });
          const json = await res.json();

          if (res.ok && json?.success && json?.data?.accessToken) {
            token.accessToken = json.data.accessToken;
            token.role = json.data.user?.user?.role ?? "citizen";
            token.actor = "user";
            token.userId = json.data.user?.user?._id;
            delete token.error;
          } else {
            // Expected until /api/v1/auth/oauth is implemented backend-side.
            token.error = "OAuthBackendError";
          }
        } catch {
          token.error = "OAuthBackendError";
        }
      }

      // Lets the client push a freshly-refreshed backend access token into
      // the NextAuth session after calling the backend's refresh-token
      // endpoint directly (see redux/shared/axiosBaseQuery.ts). Triggered by
      // `useSession().update({ accessToken })` on the client.
      if (trigger === "update" && (session)?.accessToken) {
        token.accessToken = (session).accessToken;
      }

      return token;
    },

    async session({ session, token }) {
      (session).accessToken = token.accessToken;
      (session).role = token.role;
      (session).actor = token.actor;
      (session).error = token.error;
      if (session.user) (session.user).id = token.userId;
      return session;
    },
  },
});