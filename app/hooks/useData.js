const { useContext } = require("react");
const { DataContext } = require("../context/userContext");

export const useUserData = () => useContext(DataContext)