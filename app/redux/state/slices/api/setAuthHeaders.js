export const jsonHeader = (by) => {
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem(by === "store" ? "store_token" : "user_token"),
    },
  };
  return config;
};
