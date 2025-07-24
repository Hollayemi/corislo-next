export const jsonHeader = (by) => {
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem(by === "store" ? "store_token" : "user_token"),
    },
  };
  return config;
};

export const superHeader = () => {
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("super_token"),
    },
  };
  return config;
};
