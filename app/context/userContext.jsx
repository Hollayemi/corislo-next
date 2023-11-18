"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import useSWR from "swr";

const { createContext, useEffect } = require("react");

const defaultProvider = {
  cartNum: 0,
  userInfo: {},
  selectedAddress: {},
  isOffline: true,
};
const DataContext = createContext(defaultProvider);

const UserDataProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { userData } = useSelector((state) => state.reducer.loginReducer);

  // console.log(userData);

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
      console.log(userData?.accessToken);
      // const decodedToken = jwt_decode(userData?.accessToken); // Decode the JWT token
      // const currentTime = Date.now() / 1000; // Get the current time in seconds

      // // Check if the token is still valid based on its expiration time
      // return decodedToken.exp < currentTime;
    }
    return !Boolean(getLocalToken);
  };

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
  } = useSWR(!isOffline() &&  "/user/get-account");

  return (
    <DataContext.Provider
      value={{
        cartNum: 0,
        userInfo: (!userErr && !userIsLoading && userInfo?.user) || {},
        selectedAddress: {},
        isOffline: isOffline(),
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export { UserDataProvider, DataContext };
