'use client'
import { forwardRef } from 'react'
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
} from '@mui/material'
import { SpinLoader } from './loader'

const DialogPop = ({ dialogComponent, dialogInfo, updateDialogInfo }) => {
  // Dialog transition
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  })
  const handleCloseDialog = () =>
    updateDialogInfo((prev) => {
      return { ...prev, open: false }
    })

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
  )
}

export default DialogPop

export const BasicModal = ({
  openModal,
  toggleModal,
  content = <></>,
  isLoading,
}) => {
  return (
    <Modal
      open={isLoading || openModal}
      onClose={toggleModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {isLoading ? (
        <Box className="flex justify-center items-center h-full w-full">
          <Box className="flex justify-center items-center h-20 w-20 bg-white rounded-md">
            {<SpinLoader size={10} />}
          </Box>
        </Box>
      ) : (
        content
      )}
    </Modal>
  )
}
