"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useSWR from "swr";
import io from "socket.io-client";

const { createContext, useEffect, useState } = require("react");

const defaultProvider = {
  cartedProds: [],
  following: [],
  cartData: {},
  userInfo: {},
  selectedAddress: {},
  isOffline: true,
  loading: false,
  setLoading: () => {},
  socket: null,
};
const DataContext = createContext(defaultProvider);

const UserDataProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const { userData } = useSelector((state) => state.reducer.loginReducer);

  const getPath = pathname.split("/");
  useEffect(() => {
    const getLocalToken =
      typeof window !== "undefined" && localStorage.getItem("user_token");

    if (
      getLocalToken &&
      userData?.accessToken &&
      getPath[1] === "auth" &&
      getPath[2] === "login"
    ) {
      router.replace(`/`);
    }
  }, [userData, getPath, router]);

  const isOffline = () => {
    const getLocalToken =
      typeof window !== "undefined" && localStorage.getItem("user_token");
    if (userData?.accessToken && getLocalToken) {
      // const decodedToken = jwt_decode(userData?.accessToken); // Decode the JWT token
      // const currentTime = Date.now() / 1000; // Get the current time in seconds
      // // Check if the token is still valid based on its expiration time
      // return decodedToken.exp < currentTime;
    }
    return !Boolean(getLocalToken);
  };



  
  useEffect(() => {
    if (!socket) {
      const newSocket = io("http://localhost:3033", {
        query: {
          token: localStorage.getItem("user_token"),
          by: "user_token",
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
    }

    // Cleanup when the component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  //
  //
  //
  //
  //
  //data fetching functions

  //
  // fetch userInfo
  //
  const {
    data: userInfo,
    error: userErr,
    isLoading: userIsLoading,
  } = useSWR(!isOffline() && "/user/get-account");
  //
  // fetch CARTiNFO
  //
  const {
    data: cartData,
    error: cartErr,
    isLoading: cartIsLoading,
  } = useSWR(!isOffline() && "/user/cart");

  // fetch stores you follow
  //
  const {
    data: following,
    error: folErr,
    isLoading: folIsLoading,
  } = useSWR(!isOffline() && "/user/following");
  return (
    <DataContext.Provider
      value={{
        cartedProds:
          (!cartErr && !cartIsLoading && cartData?.data?.cartedProds) || [],
        following: (!folErr && !folIsLoading && following?.data) || [],
        cartData: (!cartErr && !cartIsLoading && cartData?.data) || {},
        userInfo: (!userErr && !userIsLoading && userInfo?.user) || {},
        selectedAddress: {},
        socket,
        loading,
        setLoading: setLoading,
        isOffline: isOffline(),
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export { UserDataProvider, DataContext };
