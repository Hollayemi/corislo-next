import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useStoreData } from "@/app/hooks/useData";

const StyledBox = styled(Box)(({ theme }) => ({
  overflowY: "auto",
  width: 200,
  "&::-webkit-scrollbar": {
    width: "5px", // Width of the scrollbar
  },
  borderRadius: 5,
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#BDBDBD", // Color of the scrollbar thumb
    borderRadius: "6px", // Rounded corners of the thumb
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#42496b", // Color of the scrollbar thumb on hover
  },
  cursor: "pointer",
  transition: "all 1.5s",
  // Firefox
  scrollbarWidth: "thin", // Width of the scrollbar
  scrollbarColor: "#888 #f1f1f1",
}));

const ele_2 = [
  {
    title: "Store Lists",
    contents: [
      {
        name: "Store 1",
        path: "/store-1",
      },
      {
        name: "Store 2",
        path: "/store-2",
      },
      {
        name: "Store 2",
        path: "/store-2",
      },
      {
        name: "Store 3",
        path: "/store-3",
      },
      {
        name: "Store 4",
        path: "/store-4",
      },
    ],
  },
];

const OnlyContents = ({ each, path }) => {
  const { storeInfo } = useStoreData();
  const onSubList = !path.sublist ? "" : `/${path.sublist}`;
  const listPath = `/store/dashboard/${path.sidebar}${each.path}`;
  return (
    <Link href={listPath}>
      <ListItem
        disablePadding
        sx={{ display: "block", color: "gray" }}
        className="text-xs"
      >
        {storeInfo?.profile?.branchName?.toLowerCase() !==
          each.name.toLowerCase() && (
          <ListItemButton
            size="small"
            sx={{
              minHeight: 40,
              fontSize: "13px",
              my: 0.5,
              px: 2.5,
              textDecoration: "none",
              color: onSubList !== each.path ? "#666" : "#fff",
              bgcolor: onSubList !== each.path ? "#fff" : "#2C337C",
              borderRadius: 2,
              // mx: 1,
              transition: "none",
              "&:hover": {
                color: "white !important",
                bgcolor: "#2C337C",
                borderRadius: 2,
              },
            }}
          >
            <ListItemText>
              <Typography variant="h5" style={{ fontSize: "13px" }}>
                {each.name}
              </Typography>
            </ListItemText>
          </ListItemButton>
        )}
      </ListItem>
    </Link>
  );
};

const InnerBar = ({ path, InnerList }) => {
  const {
    staffInfo: { permissions },
  } = useStoreData();
  return (
    permissions && (
      <StyledBox className="overflow-y-auto">
        <List className="overflow-hidden shrink-0">
          <Box className="p-3">
            <Typography
              variant="h5"
              className="!text-[12px] text-gray-500 !mb-3"
            >
              {InnerList.title}
            </Typography>
            {InnerList?.content?.map((each, index) => {
              return (
                permissions[each.permission] !== false && (
                  <OnlyContents each={each} key={index} path={path} />
                )
              );
            })}
          </Box>
        </List>
      </StyledBox>
    )
  );
};

export default InnerBar;
