/* <div className="md:pr-3 !rounded-md overflow-hidden">
  <Drawer
    open={leftSidebarOpen}
    onClose={handleLeftSidebarToggle}
    variant={mdAbove ? "permanent" : "temporary"}
    ModalProps={{
      disablePortal: true,
      keepMounted: true, // Better open performance on mobile.
    }}
    sx={{
      zIndex: 7,
      height: "100%",
      display: "block",
      position: mdAbove ? "static" : "absolute",
      "& .MuiDrawer-paper": {
        boxShadow: "none",
        borderRadius: 2,
        elevation: 0,
        width: sidebarWidth,
        position: mdAbove ? "static" : "absolute",
      },
      "& > .MuiBackdrop-root": {
        borderRadius: 1,
        position: "absolute",
        zIndex: (theme) => theme.zIndex.drawer - 1,
      },
    }}
    className="!border-0 !rounded-md"
  >
    <Box className="h-14 border-b pt-6">
      <Box className="flex justify-between items-center !px-3">
        <Typography className="!font-bold !text-[17px]">Inbox</Typography>
        <Icon icon="tabler:search" fontSize={20} />
      </Box>
    </Box>

    <Box
      sx={{
        py: 1,
        px: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        size="small"
        value={query}
        onChange={handleFilter}
        className="border-none"
        placeholder="Search for store..."
        sx={{
          "& .MuiInputBase-root": { borderRadius: 5, border: "none" },
          border: "none",
        }}
        InputProps={{
          className: "!bg-gray-50 !border-none",
          startAdornment: (
            <InputAdornment position="start" sx={{ color: "text.secondary" }}>
              <Icon icon="tabler:search" fontSize={20} />
            </InputAdornment>
          ),
        }}
      />
      {!mdAbove ? (
        <IconButton sx={{ p: 1, ml: 1 }} onClick={handleLeftSidebarToggle}>
          <Icon icon="tabler:x" />
        </IconButton>
      ) : null}
    </Box>

    <StyleList sx={{ height: "calc(100vh - 13.9375rem)" }}>
      <Box className="overflow-hidden">
        <Box sx={{ p: (theme) => theme.spacing(2, 2, 2) }}>
    
          <List sx={{ mb: 2.5, p: 0 }}>{renderChats()}</List>
        </Box>
      </Box>
    </StyleList>
  </Drawer>

  <UserProfileLeft
    store={store}
    hidden={hidden}
    statusObj={statusObj}
    userStatus={userStatus}
    sidebarWidth={sidebarWidth}
    setUserStatus={setUserStatus}
    userProfileLeftOpen={userProfileLeftOpen}
    handleUserProfileLeftSidebarToggle={handleUserProfileLeftSidebarToggle}
  />
</div >






// const fakeStore = {
  //   chats: [
  //     {
  //       id: 1,
  //       fullName: "Felecia Rower",
  //       role: "Frontend Developer",
  //       about:
  //         "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  //       avatar: "/images/misc/shop/2.png",
  //       status: "offline",
  //       chat: {
  //         id: 1,
  //         unseenMsgs: 0,
  //         lastMessage: {
  //           message: "I will purchase it for sure. 👍",
  //           time: "2023-12-23T03:29:36.775Z",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //       },
  //     },
  //     {
  //       id: 2,
  //       fullName: "Adalberto Granzin",
  //       role: "UI/UX Designer",
  //       avatarColor: "primary",
  //       about:
  //         "Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.",
  //       status: "busy",
  //       chat: {
  //         id: 2,
  //         unseenMsgs: 0,
  //         lastMessage: {
  //           message: "If it takes long you can mail me at my mail address.",
  //           time: "2023-12-22T03:29:36.775Z",
  //           senderId: 11,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: false,
  //             isSeen: false,
  //           },
  //         },
  //       },
  //     },
  //   ],
  //   contacts: [
  //     {
  //       id: 3,
  //       fullName: "Joaquina Weisenborn",
  //       role: "Town planner",
  //       about:
  //         "Soufflé soufflé caramels sweet roll. Jelly lollipop sesame snaps bear claw jelly beans sugar plum sugar plum.",
  //       avatar: "/images/misc/shop/8.png",
  //       status: "busy",
  //     },
  //     {
  //       id: 4,
  //       fullName: "Verla Morgano",
  //       role: "Data scientist",
  //       about:
  //         "Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.",
  //       avatar: "/images/misc/shop/3.png",
  //       status: "online",
  //     },
  //     {
  //       id: 5,
  //       fullName: "Margot Henschke",
  //       role: "Dietitian",
  //       avatarColor: "success",
  //       about:
  //         "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  //       status: "busy",
  //     },
  //     {
  //       id: 6,
  //       fullName: "Sal Piggee",
  //       role: "Marketing executive",
  //       about:
  //         "Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.",
  //       avatar: "/images/misc/shop/5.png",
  //       status: "online",
  //     },
  //     {
  //       id: 7,
  //       fullName: "Miguel Guelff",
  //       role: "Special educational needs teacher",
  //       about:
  //         "Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.",
  //       avatar: "/images/misc/shop/7.png",
  //       status: "online",
  //     },
  //     {
  //       id: 8,
  //       fullName: "Mauro Elenbaas",
  //       role: "Advertising copywriter",
  //       about:
  //         "Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly I love marzipan wafer.",
  //       avatar: "/images/misc/shop/6.png",
  //       status: "away",
  //     },
  //     {
  //       id: 9,
  //       avatarColor: "warning",
  //       fullName: "Bridgett Omohundro",
  //       role: "Designer, television/film set",
  //       about:
  //         "Gummies gummi bears I love candy icing apple pie I love marzipan bear claw. I love tart biscuit I love candy canes pudding chupa chups liquorice croissant.",
  //       status: "offline",
  //     },
  //     {
  //       id: 10,
  //       avatarColor: "error",
  //       fullName: "Zenia Jacobs",
  //       role: "Building surveyor",
  //       about:
  //         "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  //       status: "away",
  //     },
  //   ],
  //   userProfile: {
  //     id: userInfo._id,
  //     avatar: "/images/misc/shop/1.png",
  //     role: "user",
  //     ...userInfo,
  //     about: "",
  //     status: "online",
  //     settings: {
  //       isTwoStepAuthVerificationEnabled: true,
  //       isNotificationsOn: false,
  //     },
  //   },
  //   selectedChat: {
  //     chat: {
  //       id: 1,
  //       userId: userInfo._id,
  //       unseenMsgs: 3,
  //       chat: [
  //         {
  //           message: "How can we help? We're here for you!",
  //           time: "Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)",
  //           senderId: 11,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message:
  //             "Hey John, I am looking for the best admin template. Could you please help me to find it out?",
  //           time: "Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "It should be MUI v5 compatible.",
  //           time: "Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "Absolutely!",
  //           time: "Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)",
  //           senderId: 11,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "This admin template is built with MUI!",
  //           time: "Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)",
  //           senderId: 11,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "Looks clean and fresh UI. 😍",
  //           time: "Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "It's perfect for my next project.",
  //           time: "Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "How can I purchase it?",
  //           time: "Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "Thanks, From our official site  😇",
  //           time: "Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)",
  //           senderId: 11,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //         {
  //           message: "I will purchase it for sure. 👍",
  //           time: "2023-12-23T03:29:36.775Z",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //       ],
  //     },
  //     contact: {
  //       id: 1,
  //       fullName: "Felecia Rower",
  //       role: "Frontend Developer",
  //       about:
  //         "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
  //       avatar: "/images/misc/shop/2.png",
  //       status: "offline",
  //       chat: {
  //         id: 1,
  //         unseenMsgs: 0,
  //         lastMessage: {
  //           message: "I will purchase it for sure. 👍",
  //           time: "2023-12-23T03:29:36.775Z",
  //           senderId: 1,
  //           feedback: {
  //             isSent: true,
  //             isDelivered: true,
  //             isSeen: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // };

*/
