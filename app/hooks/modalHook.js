const { useState, useEffect } = require("react");

const ModalHook = (update) => { 
    const [dialogInfo, updateDialogInfo] = useState({
    open: false,
    title: "Action Confirmation",
    alert: "",
    acceptFunctionText: "Yes, Continue",
    acceptFunction: () => {},
  });
  useEffect(() => {
    {
      updateDialogInfo((prev) => {
        return {
          ...prev,
          ...update
        };
      });
    }
  }, [update]);

  return { dialogInfo, updateDialogInfo }
}

export default ModalHook