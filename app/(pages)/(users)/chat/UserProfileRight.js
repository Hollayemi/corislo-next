// ** React Imports
import { Fragment } from "react";

// ** MUI Imports
import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import List from "@mui/material/List";
import Badge from "@mui/material/Badge";
import MuiAvatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

// ** Icon Imports
import Icon from "@/app/components/icon";
import { NotifOrderDisplay } from "@/app/components/view/home/Components/notification";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";
// ** Custom Component Imports
import Sidebar from "@/app/components/sidebar";
import CustomAvatar from "@/app/components/avatar";
import { StyleList } from "./Styled";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";

const UserProfileRight = (props) => {
  const {
    store,
    hidden,
    statusObj,
    getInitials,
    sidebarWidth,
    userProfileRightOpen,
    handleUserProfileRightSidebarToggle,
  } = props;

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return (
        <Box sx={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}>
          {children}
        </Box>
      );
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false }}>
          {children}
        </PerfectScrollbar>
      );
    }
  };

  return (
    <Sidebar
      direction="right"
      show={userProfileRightOpen}
      backDropClick={handleUserProfileRightSidebarToggle}
      sx={{
        zIndex: 9,
        height: "100%",
        width: sidebarWidth,
        borderTopRightRadius: (theme) => theme.shape.borderRadius,
        borderBottomRightRadius: (theme) => theme.shape.borderRadius,
        "& + .MuiBackdrop-root": {
          zIndex: 8,
          borderRadius: 1,
        },
      }}
    >
      <UserProfileRightComponent
        store={store}
        hidden={hidden}
        statusObj={statusObj}
        getInitials={getInitials}
        sidebarWidth={sidebarWidth}
        ScrollWrapper={ScrollWrapper}
        userProfileRightOpen={userProfileRightOpen}
        handleUserProfileRightSidebarToggle={
          handleUserProfileRightSidebarToggle
        }
      />
    </Sidebar>
  );
};

export default UserProfileRight;

export const UserProfileRightComponent = ({
  store,
  statusObj,
  hideCancel,
  getInitials,
  handleUserProfileRightSidebarToggle,
}) => {
  const contact = store.selectedChat.contact;

  const { data: result } = useSWR(
    `/user/order?store=${contact.store}&branch=${contact.branch}`
  );
  const { result: fetchedOrder, totalNumber } = result?.data || {}
  const MyListItem = ({ info, title, infoComponent }) => (
    <Box className="flex items-start mb-2">
      <Typography
        variant="body2"
        className="!text-[12px] !text-gray-400 parent-hover:!text-black !flex-shrink-0 !w-32"
      >
        {title}
      </Typography>
      {!infoComponent && (
        <Typography
          variant="body2"
          className="!text-[12px] !text-gray-600 parent-hover:!text-black !flex-shrink-0 w-40 !text-right !pr-3"
        >
          {info || "Nill"}
        </Typography>
      )}

      {infoComponent}
    </Box>
  );

  return (
    <Box>
      <Box className="h-14 border-b pt-6 !rounded-t-md">
        <Box className="flex justify-between items-center !px-3">
          <Typography className="!font-bold !text-[17px]">
            Store Information
          </Typography>
          {!hideCancel && (
            <IconButton
              size="small"
              onClick={handleUserProfileRightSidebarToggle}
              sx={{
                color: "text.disabled",
              }}
            >
              <Icon icon="tabler:x" />
            </IconButton>
          )}
        </Box>
      </Box>
      <StyleList sx={{ height: "calc(100vh - 11.5125rem)" }}>
        <Box className={`!rounded-b-md`}>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: (theme) => theme.spacing(5.25, 3, 2.5),
              }}
            >
              <Box className="mb-2 flex justify-evenly items-center">
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    <Box
                      component="span"
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        color: `${statusObj[contact.status]}.main`,
                        boxShadow: (theme) =>
                          `0 0 0 2px ${theme.palette.background.paper}`,
                        backgroundColor: `${statusObj[contact.status]}.main`,
                      }}
                    />
                  }
                >
                  {contact.avatar ? (
                    <MuiAvatar
                      sx={{ width: "5rem", height: "5rem" }}
                      src={contact.avatar}
                      alt={contact.chatName}
                    />
                  ) : (
                    <CustomAvatar
                      skin="light"
                      color={contact.avatarColor}
                      sx={{
                        width: "5rem",
                        height: "5rem",
                        fontWeight: 500,
                        fontSize: "2rem",
                      }}
                    >
                      {getInitials(contact.chatName)}
                    </CustomAvatar>
                  )}
                </Badge>
                <Image
                  src="/images/more/qr.png"
                  alt="qrcode"
                  width={70}
                  height={70}
                />
              </Box>
              <Typography
                variant="body2"
                className="!font-bold !text-[15]"
                sx={{ textAlign: "center" }}
              >
                {contact.chatName}
              </Typography>
              <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
                {contact.role}
              </Typography>
            </Box>
          </Box>

          <Box className="!px-4">
            <Box sx={{ mb: 3 }}>
              <List dense sx={{ p: 0 }}>
                <MyListItem title="Store Email Address:" info={contact.email} />
                <MyListItem title="Phone Number:" info={contact.phone} />
                <MyListItem title="Physical Address:" info={contact.address} />
                {/* <MyListItem
                  title="Store Rating:"
                  infoComponent={
                    <Box className="flex items-center flex-shrink-0">
                      <Rating
                        size="small"
                        value={3 / 5}
                        readOnly
                        max={1}
                        precision={0.1}
                      />
                      <Typography
                        variant="body2"
                        className="!text-[13px] !font-bold !px-2 pt-0.5 !text-black"
                      >
                        4/5
                      </Typography>
                    </Box>
                  }
                /> */}
              </List>
            </Box>
            <Box>
              <Accordion expanded className="!bg-transparent !shadow-none ">
                <AccordionSummary
                  className="!border-b border-2 !outline- !h-8"
                  expandIcon={
                    <Icon fontSize="1.25rem" icon="tabler:chevron-down" />
                  }
                >
                  <Typography variant="body2" className="!font-black">
                    Order Made
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {result && fetchedOrder ?
                    fetchedOrder.map((res, i) => (
                      <NotifOrderDisplay key={i} orderId={res._id} />
                    )) : <Box className="flex items-center justify-center h-20">
                      <Typography variant="caption">No order to preview</Typography>
                    </Box>}
                </AccordionDetails>
                {fetchedOrder && <Box className="flex justify-center items-center border-t pt-3"><Link href={`/order?store=${contact.store}&branch=${contact.store}`} className="!text-[12px] text-center w-full">See More</Link></Box>}
              </Accordion>
            </Box>
          </Box>
        </Box>
      </StyleList>
    </Box>
  );
};
