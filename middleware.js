import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

const PROTECTED_USER_PREFIXES = ["/dashboard"];
const PROTECTED_ADMIN_PREFIXES = ["/dashboard"];
const ADMIN_PUBLIC_PATHS = ["/dashboard/login"];

export default auth((req) => {
  const { pathname, origin } = req.nextUrl;
  const session = req.auth;
  const hostname = req.headers.get('host') || '';

  // Log for debugging
  console.log('Middleware - Host:', hostname);
  console.log('Middleware - Path:', pathname);
  console.log('Middleware - Session actor:', session?.actor);

  // Check if we're in production (has domain with subdomain support)
  const isProduction = !hostname.includes('localhost') && !hostname.includes('127.0.0.1');
  
  // Check if this is the module subdomain (production only)
  const isModuleSubdomain = isProduction && hostname.startsWith('module.');
  
  // For localhost development, use a path-based approach
  const isModuleLocalhost = !isProduction && pathname.startsWith('/module');

  // Handle module subdomain (production)
  if (isModuleSubdomain) {
    // If trying to access dashboard login on subdomain, redirect to main domain
    if (pathname === '/dashboard/login') {
      const mainDomainLogin = new URL("/dashboard/login", `https://corisio.com`);
      return NextResponse.redirect(mainDomainLogin);
    }

    // Check if authenticated as dashboard
    if (!session || session.actor !== "dashboard") {
      // Redirect to main domain dashboard login
      const loginUrl = new URL("/dashboard/login", `https://corisio.com`);
      loginUrl.searchParams.set("from", pathname);
      loginUrl.searchParams.set("subdomain", "module");
      return NextResponse.redirect(loginUrl);
    }

    // If authenticated, handle the rewrite
    const url = req.nextUrl.clone();
    if (url.pathname === '/') {
      url.pathname = '/dashboard';
      return NextResponse.rewrite(url);
    }

    if (!url.pathname.startsWith('/dashboard')) {
      url.pathname = `/dashboard${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // Handle localhost development with /module path
  if (isModuleLocalhost) {
    // Remove /module prefix and rewrite to /dashboard
    const url = req.nextUrl.clone();
    const modulePath = url.pathname.replace(/^\/module/, '');
    
    // If it's just /module or /module/, redirect to /dashboard
    if (modulePath === '' || modulePath === '/') {
      url.pathname = '/dashboard';
      return NextResponse.rewrite(url);
    }

    // For /module/*, rewrite to /dashboard/*
    url.pathname = `/dashboard${modulePath}`;
    return NextResponse.rewrite(url);
  }

  // Regular dashboard route protection for main domain (including localhost)
  const isAdminRoute =
    PROTECTED_ADMIN_PREFIXES.some((p) => pathname.startsWith(p)) &&
    !ADMIN_PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  
  const isUserRoute = PROTECTED_USER_PREFIXES.some((p) => pathname.startsWith(p));

  // Admin authentication - handles both production and localhost
  if (isAdminRoute) {
    if (!session || session.actor !== "dashboard") {
      const loginUrl = new URL("/dashboard/login", origin);
      loginUrl.searchParams.set("from", pathname);
      console.log('Redirecting to dashboard login:', loginUrl.toString());
      return NextResponse.redirect(loginUrl);
    }
    console.log('Admin authenticated, allowing access to:', pathname);
  }

  // User authentication
  if (isUserRoute) {
    if (!session || session.actor !== "user") {
      const loginUrl = new URL("/login", origin);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/dashboard/:path*",
    "/module/:path*", // Add this for localhost development
    "/((?!_next/static|_next/image|favicon.ico|images|fonts|logo|icons).*)"
  ],
};