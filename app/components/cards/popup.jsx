"use client";
import { forwardRef } from "react";
import {
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Box,
  Typography,
} from "@mui/material";

const DialogPop = ({ dialogComponent, dialogInfo, updateDialogInfo }) => {
  // Dialog transition
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleCloseDialog = () =>
    updateDialogInfo((prev) => {
      return { ...prev, open: false };
    });

  return (
    dialogInfo.open && (
      <Dialog
        open={dialogInfo?.open || false}
        keepMounted
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        aria-labelledby="custom-confirmation"
        aria-describedby="desc"
        className
      >
        <DialogTitle id="custom-confirmation" className="!text-[16px]">
          {dialogInfo.title}
        </DialogTitle>
        <Box>{dialogInfo?.alert || (dialogComponent && dialogComponent)}</Box>
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
    )
  );
};

export default DialogPop;

export const BasicModal = ({ openModal, toggleModal, content }) => {
  return (
    <Modal
      open={openModal}
      onClose={toggleModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {content}
    </Modal>
  );
};
