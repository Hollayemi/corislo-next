export const jsonHeader = () => {
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("user_token"),
    },
  };
  return config;
};
