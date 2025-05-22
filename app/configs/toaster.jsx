import { Snackbar } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'

const toaster = ({
  message,
  type = 'info',
  promise,
  error,
  duration,
  position,
}) => {
  console.log(message, type)

  const colors = {
    success: 'bg-green-800',
    error: 'bg-red-800',
  }

  const cleanText = (text) => {
    return text.replace(/[^a-zA-Z0-9_ ]/g, '').replace(/_/g, ' ')
  }

  toast[type](cleanText(message), {
    position: 'top-center',
    className: 'capitalize',
    duration: duration || 5000,
  })

  // toast.custom(
  //   (t) => (
  //     <div
  //       className={`toast-custom ${
  //         t.visible
  //           ? '!z-[99999999999999999999999999999999999]'
  //           : 'animate-leave'
  //       } ${colors[type]} `}
  //     >
  //       {message}
  //     </div>
  //   ),
  //   {
  //     position: 'top-right', // Ensure the position is set appropriately
  //     duration: 4000, // Customize the duration as needed
  //   }
  // )

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
}

export default toaster
