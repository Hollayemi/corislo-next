const { default: toaster } = require("../configs/toaster");

export const copyToClipboard = async (textToCopy, setIsCopied) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(textToCopy);
    toaster({message: "Copied to clipboard", type: "success", duration: "4000"})
    setTimeout(() => {
      setIsCopied("");
    }, 4000); // Reset the "Copied" state after 4 seconds
  } catch (error) {
    console.error("Unable to copy to clipboard", error);
    toaster({
      message: "Unable to copy to clipboard",
      type: "error",
      duration: "4000",
    });
  }
};
