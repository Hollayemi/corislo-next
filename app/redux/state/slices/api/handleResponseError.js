import toaster from "@/app/configs/toaster";
import "toasted-notes/src/styles.css";

const redirect = () => {
  localStorage.setItem("user_token", null);
  localStorage.setItem("store_token", null);
  toaster({ type:"error", message: "Redirecting to Login" });
  setTimeout(() => (window.location.href = "/login"), 1000);
};

export default (error) => {
  if (error?.data) {
    const { errors, message } = error.data;

    if (message) {
      toaster({message, type: "error"});
      if (message === "token_expired") {
        redirect();
      }
    }
    if (errors && typeof errors === Array) {
      errors.forEach((error) => {
        toaster.notify(error.code, {
          duration: "4000",
          position: "bottom",
        });
      });
    }
  }
};
