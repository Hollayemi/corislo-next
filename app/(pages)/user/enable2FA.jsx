import { Box, Button, Switch, Typography } from "@mui/material";
import Image from "next/image";
import { TitleSubtitle } from "./components";
import IconifyIcon from "@/app/components/icon";
import { updateUserAccount } from "@/app/redux/state/slices/users/updateAccount";
import { useUserData } from "@/app/hooks/useData";
import { useDispatch } from "react-redux";

const Enable2FA = ({ showOverlay }) => {
  const { userInfo } = useUserData()
  const dispatch = useDispatch()
  return (
    <Box className="w-full h-full flex justify-center !relative items-center">
      <Box className="h-[300px] w-[360px] p-3 flex flex-col items-center bg-white rounded-md relative">
        <Box
          onClick={showOverlay()}
          className="w-7 h-7 flex justify-center cursor-pointer items-center rounded-full absolute bg-white !z-50 !-top-10 !right-0"
        >
          <IconifyIcon icon="tabler:x" className="!text-[17px]" />
        </Box>
        <Image
          src="/images/misc/TwoFA.png"
          alt="2fa"
          width={500}
          height={500}
          className="w-16 h-16 rounded-full mt-2"
        />
        <TitleSubtitle title="2 - Factor Authentication" className=" my-5" />

        <Typography variant="caption" className="!text-[13px] !text-center">
          Protect your account with an extra layer of security. Enable
          two-factor authentication now to keep your login secure.
        </Typography>
        <Box className="flex items-center mt-4">
          <Button
            className="!w-36 !h-10 !rounded-full !shadow-none !text-[12px]"
            variant="contained"
            onClick={() =>
              updateUserAccount({ two_fa: !userInfo.two_fa }, dispatch)
            }
          >
            {!userInfo.two_fa ? "Activate" : "De-activate"}
          </Button>
          <Button
            className="!w-36 !h-10 !rounded-full !shadow-none !ml-4 !text-[12px]"
            variant="outlined"
            onClick={showOverlay()}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Enable2FA;
