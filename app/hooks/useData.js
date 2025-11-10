"use client"
import { useContext } from "react";
import { StoreDataContext } from "../context/storeContext";
import { SuperDataContext } from "../context/superContex";
import { DataContext } from"../context/userContext";
import { ChatContext } from "./useChatContext";

export const useUserData = () => useContext(DataContext)
export const useStoreData = () => useContext(StoreDataContext)
export const useSuperData = () => useContext(SuperDataContext)
export const useChatData = () => useContext(ChatContext);