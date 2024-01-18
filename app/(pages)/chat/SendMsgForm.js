// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

// ** Icon Imports
import Icon from "@/app/components/icon";
import { directSocketConnect } from "@/app/utils/socket.io";
// import { sendMessage } from '@/app/redux/state/slices/chat'

// ** Styled Components
const ChatFormWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

const Form = styled('form')(({ theme }) => ({
  padding: theme.spacing(0, 1.5, 1.5)
}))

const SendMsgForm = props => {
  // ** Props
  const { store, dispatch, sendMsg } = props

  // ** State
  const [msg, setMsg] = useState('')

  const handleSendMsg = e => {
    e.preventDefault()
    if (store && store.selectedChat && msg.trim().length) {
      directSocketConnect("user_token").emit(
        "sendMessage",
        {
          chatId: store?.selectedChat?.contact?.chat?.id,
          // storeContact.userId,
          message: msg,
          by: store.userProfile.role,
          branchId: store?.selectedChat?.contact?.branchId,
        },
        dispatch
      );
    }
    setMsg('')
  }

  return (
    <Form onSubmit={handleSendMsg} className="w-full flex justify-center">
      <ChatFormWrapper className="!rounded-full !bg-gray-50 !border w-full md:!w-11/12 py-1 px-2 ">
        <IconButton
          size="small"
          component="label"
          htmlFor="upload-img"
          sx={{ mr: 0.5, color: "text.primary" }}
        >
          <Icon icon="tabler:paperclip" />
          <input hidden type="file" id="upload-img" />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            value={msg}
            size="small"
            placeholder="Type your message here…"
            onChange={(e) => setMsg(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused": { boxShadow: "none" },
              },
              "& .MuiOutlinedInput-input": {
                p: (theme) => theme.spacing(0.875, 1.5),
              },
              "& fieldset": { border: "0 !important" },
            }}
            className="mx-1"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <IconButton size="small" sx={{ color: "text.primary" }}>
            <Icon icon="tabler:microphone" />
          </IconButton> */}

          <Button type="submit" variant="text">
            <Icon icon="tabler:send-2" />
          </Button>
        </Box>
      </ChatFormWrapper>
    </Form>
  );
}

export default SendMsgForm
