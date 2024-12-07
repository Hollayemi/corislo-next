'use client' 
import IconifyIcon from '@/app/components/icon'
import { Box, Typography } from "@mui/material";
import { useRouter } from 'next/navigation'

const StoreTabs = ({ currTab }) => {
  const router = useRouter();
  const Each = ({ text, tab, icon }) => {
    return (
      <Box
        className={`h-10 flex items-center px-3 md:px-5 cursor-pointer border-b flex-shrink-0 ${
          currTab === tab ? "bg-blue-100 md:border-r-4 border-r-blue-800 " : ""
        }`}
        onClick={() => router.push(`?tab=${tab}`)}
      >
        <IconifyIcon icon={icon} />
        <Typography variant="body2" className="!text-[12px] !ml-4">
          {text}
        </Typography>
      </Box>
    );
  };
  return (
    <Box className="w-full flex flex-row md:flex-col justify-center">
      <Each text="Products" tab={"0"} icon="tabler:user-plus" />
      <Each text="Reviews" tab={"1"} icon="tabler:link" />
      <Each text="Store Policies" tab={"2"} icon="tabler:user-plus" />
    </Box>
  );
};

export default StoreTabs;
