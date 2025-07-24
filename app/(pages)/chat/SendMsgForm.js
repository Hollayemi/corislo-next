// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Icon from "@/app/components/icon";

// ** Styled Components
const ChatFormWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
}));

const Form = styled("form")(({ theme }) => ({
  padding: theme.spacing(0, 1.5, 1.5),
}));

const SendMsgForm = (props) => {
  // ** Props
  const { store, dispatch, sendMsg, socket, setMessageLog } = props;
  const selectedChat = store?.selectedChat;
  // ** State
  const [msg, setMsg] = useState("");

  const handleSendMsg = (e) => {
    e.preventDefault();
    if (store && selectedChat && msg.trim().length) {
      const messageToEmit = {
        chatId: selectedChat?.contact?.chatId,
        message: msg,
        by: store.userProfile.role,
        branchId: selectedChat?.contact?.branchId,
      };

      socket.emit("sendMessage", messageToEmit);
      setMessageLog((prev) => {
        const log = prev?.log || [];
        const newLog = [
          ...log,
          {
            ...messageToEmit,
            feedback: { isSent: false, isDelivered: false, isSeen: false },
            time: new Date(),
          },
        ];
        return { ...prev, log: newLog };
      });
    }

    setMsg("");
  };

  return (
    <Form onSubmit={handleSendMsg} className="w-full flex justify-center">
      <ChatFormWrapper className="!rounded-md !bg-gray-50 !border w-full md:!w-11/12 py-1 px-2 ">
        <IconButton
          size="small"
          component="label"
          htmlFor="upload-img"
          sx={{ mr: 0.5, color: "text.primary" }}
        >
          <Icon icon="tabler:paperclip" />
          <input hidden type="file" id="upload-img" />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "flex-end" }} className="-mt-2">
          <TextField
            fullWidth
            value={msg}
            size="small"
            minRows={1}
            maxRows={4}
            multiline
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSendMsg(event)
              }
            }}
            placeholder="Type your message here…"
            onChange={(e) => setMsg(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused": { boxShadow: "none" },
              },
              "& .MuiOutlinedInput-input": {
                p: (theme) => theme.spacing(0.2875, 0.5),
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
};

export default SendMsgForm;
