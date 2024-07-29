import { forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";

const DialogPop = ({ handleCloseDialog, dialogComponent, dialogInfo }) => {
  // Dialog transition
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <Dialog
      open={dialogInfo?.open || false}
      keepMounted
      onClose={handleCloseDialog}
      TransitionComponent={Transition}
      aria-labelledby="custom-confirmation"
      aria-describedby="desc"
    >
      <DialogTitle id="custom-confirmation" className="!text-[16px]">
        {dialogInfo.title}
      </DialogTitle>
      <DialogContent>
        {dialogInfo?.alert || (dialogComponent && dialogComponent)}
      </DialogContent>
      <DialogActions className="dialog-actions-dense">
        <Button onClick={handleCloseDialog}>Close</Button>
        <Button
          variant="contained"
          className="!shadow-none"
          onClick={dialogInfo.acceptFunction}
        >
          {dialogInfo.acceptFunctionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogPop;
