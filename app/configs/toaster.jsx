import { Snackbar } from "@mui/material";
import toast from "react-hot-toast";

const toaster = ({ message, type, promise, error, duration, position }) => {
  console.log(message, type);

  const colors = {
    success: "bg-green-800",
    error: "bg-red-800"
  }

    toast.custom(
      (t) => (
        <div
          className={`toast-custom ${
            t.visible ? "" : "animate-leave"
          } ${colors[type]}`}
        >
          {message}
        </div>
      ),
      {
        position: "top-right", // Ensure the position is set appropriately
        duration: 4000, // Customize the duration as needed
      }
    );
  
    //  );
  // if (type === "error") {
  //   toast.error(message, {duration: 10000});
  // } else if (type === "success") {
  //   toast.success(message);
  // } else if (type === "promise") {
  //   toast.promise(promise, {
  //     loading: "Loading",
  //     success: message,
  //     error: error,
  //   });
  // }
};

export default toaster;
