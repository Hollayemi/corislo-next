import toast from "react-hot-toast";

const toaster = ({ message, type, promise, error, position }) => {
  if (type === "error") {
    toast.error(content);
  } else if (type === "success") {
    toast.success(content);
  } else if (type === "promise") {
    toast.promise(promise, {
      loading: "Loading",
      success: message,
      error: error,
    });
  }
};

export default toaster;
