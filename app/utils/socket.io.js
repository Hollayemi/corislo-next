// socket.js

import { io } from "socket.io-client";
import toaster from "../configs/toaster";

const socketSetup = (by, setSocket) => {
  const newSocket = io("http://localhost:3033", {
    query: {
      token: localStorage.getItem(
        by === "store" ? "store_token" : "user_token"
      ),
      by: by === "store" ? "store_token" : "user_token",
    },
  });

  newSocket.on("disconnect", () => {
    setSocket(null);
    setTimeout(socketSetup(by, setSocket), 3000);
    toaster({ type: "error", message: "chat disconnected" });
  });
  newSocket.on("connect", () => {
    toaster({ type: "success", message: "chat connected" });
  });

  setSocket(newSocket);
};
export default socketSetup;

export const directSocketConnect = (by) =>
  io("http://localhost:3033", {
    query: {
      token: localStorage.getItem(
        by === "store" ? "store_token" : "user_token"
      ),
      by: by === "store" ? "store_token" : "user_token",
    },
  });