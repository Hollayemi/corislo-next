const { useContext } = require("react");
import { StoreDataContext } from "../context/storeContext";
import { SuperDataContext } from "../context/superContex";
import { DataContext } from"../context/userContext";

export const useUserData = () => useContext(DataContext)
export const useStoreData = () => useContext(StoreDataContext)
export const useSuperData = () => useContext(SuperDataContext)