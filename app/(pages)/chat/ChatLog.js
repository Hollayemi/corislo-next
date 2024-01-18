// ** React Imports
import { useRef, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// ** Icon Imports
import Icon from "@/app/components/icon";

// ** Third Party Components
import PerfectScrollbarComponent from "react-perfect-scrollbar";

// ** Custom Components Imports
import CustomAvatar from "@/app/components/avatar";

// ** Utils Imports
import { getInitials } from "@/app/utils/get-initials";
import { StyleList } from "./Styled";
import { directSocketConnect } from "@/app/utils/socket.io";

const PerfectScrollbar = styled(PerfectScrollbarComponent)(({ theme }) => ({
  padding: theme.spacing(5),
}));

const ChatLog = (props) => {
  // ** Props
  const { data, hidden } = props;

  console.log(data);
  const storeContact = data?.contact;
  console.log(storeContact);
  if (!storeContact?.storeJoined) {
    directSocketConnect("store").emit("joinRoom", {
      customer: storeContact.userId,
      branchId: storeContact.branchId,
      store: data?.userContact?.role,
    });
  }
  // ** Ref
  const chatArea = useRef(null);

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    if (chatArea.current) {
      if (hidden) {
        chatArea.current.scrollTop = chatArea.current.scrollHeight;
      } else {
        chatArea.current.scrollTop = chatArea.current.scrollHeight;
      }
    }
  };

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    let chatLog = [];
    if (data.chat) {
      if (data.chat.chat) {
        chatLog = data.chat.chat;
      }
    }
    const formattedChatLog = [];
    let chatMessageBy = chatLog[0] ? chatLog[0].by : null;

    let msgGroup = {
      by: chatMessageBy,
      messages: [],
    };
    chatLog.forEach((msg, index) => {
      if (chatMessageBy === msg.by) {
        msgGroup.messages.push({
          time: msg.time,
          msg: msg.message,
          feedback: msg.feedback,
        });
      } else {
        chatMessageBy = msg.by;
        formattedChatLog.push(msgGroup);
        msgGroup = {
          by: msg.by,
          messages: [
            {
              time: msg.time,
              msg: msg.message,
              feedback: msg.feedback,
            },
          ],
        };
      }
      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup);
    });

    return formattedChatLog;
  };

  const renderMsgFeedback = (isSender, feedback) => {
    if (isSender) {
      if (feedback.isSent && !feedback.isDelivered) {
        return (
          <Box
            component="span"
            sx={{
              display: "flex",
              "& svg": { mr: 0.5, color: "text.secondary" },
            }}
          >
            <Icon icon="tabler:check" fontSize="0.825rem" />
          </Box>
        );
      } else if (feedback.isSent && feedback.isDelivered) {
        return (
          <Box
            component="span"
            sx={{
              display: "flex",
              "& svg": {
                mr: 0.5,
                color: feedback.isSeen ? "success.main" : "text.secondary",
              },
            }}
          >
            <Icon icon="tabler:checks" fontSize="0.825rem" />
          </Box>
        );
      } else {
        return null;
      }
    }
  };
  useEffect(() => {
    if (data && data.chat && data.chat?.chat?.length) {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // ** Renders user chat
  const renderChats = () => {
    return formattedChatData().map((item, index) => {
      const isSender = item.by === data.userContact.role;

      return (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: !isSender ? "row" : "row-reverse",
            mb: index !== formattedChatData().length - 1 ? 4 : undefined,
          }}
        >
          <div>
            <CustomAvatar
              skin="light"
              className="border"
              color={
                data.contact.avatarColor ? data.contact.avatarColor : undefined
              }
              sx={{
                width: 32,
                height: 32,
                fontSize: "1rem",
                ml: isSender ? 1.5 : undefined,
                mr: !isSender ? 1.5 : undefined,
              }}
              {...(data.contact.avatar && !isSender
                ? {
                    src: data.contact.avatar,
                    alt: data.contact.fullName,
                  }
                : {})}
              {...(isSender
                ? {
                    src: data.userContact.avatar,
                    alt: data.userContact.fullName,
                  }
                : {})}
            >
              {data.contact.avatarColor
                ? getInitials(data.contact.fullName)
                : null}
            </CustomAvatar>
          </div>

          <Box
            className="chat-body"
            sx={{ maxWidth: ["calc(100% - 5.75rem)", "75%", "65%"] }}
          >
            {item.messages.map((chat, index, { length }) => {
              const time = new Date(chat.time);

              return (
                <Box key={index} sx={{ "&:not(:last-of-type)": { mb: 1.5 } }}>
                  <div>
                    <Typography
                      sx={{
                        borderRadius: 1.5,
                        width: "fit-content",
                        p: (theme) => theme.spacing(1.25, 2),
                        ml: isSender ? "auto" : undefined,
                        borderTopLeftRadius: !isSender ? 0 : undefined,
                        borderTopRightRadius: isSender ? 0 : undefined,
                        color: "text.secondary",
                        backgroundColor: isSender
                          ? "custom.bodyGray"
                          : "custom.lightSec",
                      }}
                      className="!text-[13px]"
                    >
                      {chat.msg}
                    </Typography>
                  </div>
                  {index + 1 === length ? (
                    <Box
                      sx={{
                        mt: 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: isSender ? "flex-end" : "flex-start",
                      }}
                    >
                      {renderMsgFeedback(isSender, chat.feedback)}
                      <Typography
                        variant="body2"
                        className="!text-[11px]"
                        sx={{ color: "text.disabled" }}
                      >
                        {time
                          ? new Date(time).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })
                          : null}
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    });
  };

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return (
        <Box ref={chatArea} className="!h-full">
          {children}
        </Box>
      );
    } else {
      return <Box ref={chatArea}>{children}</Box>;
    }
  };

  return (
    <Box sx={{ height: "calc(100vh - 13.9375rem)" }}>
      <StyleList
        sx={{ height: "calc(100% - 0.7375rem)" }}
        className="!overflow-x-hidden px- md:px-4 py-5"
        ref={chatArea}
      >
        <Box className="flex justify-center !mb-8">
          <Typography variant="caption" className="!text-gray-400 text-[12px]">
            {data.userContact.username} has been connected to{" "}
            {data?.contact?.store}
          </Typography>
        </Box>
        {renderChats()}
      </StyleList>
    </Box>
  );
};

export default ChatLog;
