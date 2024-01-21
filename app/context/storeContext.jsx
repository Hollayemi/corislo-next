"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import useSWR from "swr";
import io from "socket.io-client";

const { createContext, useEffect, useState } = require("react");

const defaultProvider = {
  staffInfo: {},
  storeInfo: {},
  connection: false,
  socket: null,
};
const StoreDataContext = createContext(defaultProvider);

const StoreDataProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [socket, setSocket] = useState(null);
  const { userData } = useSelector((state) => state.reducer.loginReducer);

  const getPath = pathname.split("/");

  // useEffect(() => {
  //   if (
  //     !connection &&
  //     getPath[1] !== "store" &&
  //     getPath[2] !== "login"
  //   ) {
  //     router.replace(`/store/login`);
  //   }else{
  //     router.replace(`/store/dashboard`);
  //   }
  // }, [userData, getPath, router]);

  useEffect(() => {
    if (!socket) {
      const newSocket = io("http://localhost:3033", {
        query: {
          token: localStorage.getItem("store_token"),
          by: "store_token",
        },
      });
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Socket connected");
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      newSocket.on("roomJoined", ({ room }) => {
        // console.log(`Successfully joined room: ${room}`);
      });

      newSocket.on("newMessage", (data) => {
        // console.log(data);
      });
    }

    // Cleanup when the component unmounts
    return () => {
      if (socket) {
        socket.on("newMessage", (data) => {
          console.log(data);
        });
        socket.disconnect();
      }
    };
  }, [socket]);

  useEffect(() => {
    const getLocalToken =
      typeof window !== "undefined" && localStorage.getItem("store_token");

    if (
      getLocalToken &&
      userData?.accessToken &&
      getPath[1] === "auth" &&
      getPath[2] === "login"
    ) {
      router.replace(`/`);
    }
  }, [userData, getPath, router]);

  const connection = () => {
    const getLocalToken =
      typeof window !== "undefined" && localStorage.getItem("store_token");
    if (userData?.accessToken && getLocalToken) {
      // const decodedToken = jwt_decode(userData?.accessToken); // Decode the JWT token
      // const currentTime = Date.now() / 1000; // Get the current time in seconds
      // // Check if the token is still valid based on its expiration time
      // return decodedToken.exp < currentTime;
    }
    return Boolean(getLocalToken);
  };

  //
  //
  //
  //
  //
  //data fetching functions

  //
  // fetch staffInfo
  //
  const {
    data: staffInfo,
    error: staffErr,
    isLoading: staffIsLoading,
  } = useSWR(connection() && "/branch/logged-in-staff");
  //
  //
  // fetch storeInfo
  //
  const {
    data: storeInfo,
    error: storeErr,
    isLoading: storeIsLoading,
  } = useSWR(connection() && "/store");
  //

  return (
    <StoreDataContext.Provider
      value={{
        staffInfo: (!staffErr && !staffIsLoading && staffInfo?.data) || {},
        storeInfo: (!storeErr && !storeIsLoading && storeInfo) || {},
        selectedAddress: {},
        connection: connection(),
        socket,
      }}
    >
      {children}
    </StoreDataContext.Provider>
  );
};
export { StoreDataProvider, StoreDataContext };
