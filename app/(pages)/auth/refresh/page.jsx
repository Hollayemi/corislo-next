"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { CircleLoader } from "@/app/components/cards/loader";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

const RefreshToken = () => {
    const searchParams = useSearchParams();
    const [redirected, setRedirected] = useState(false);
    const router = useRouter();
    const { data, isLoading } = useSWR(`/auth/refresh-token?token=${searchParams.get("refresh")}`);
    useEffect(() => {
      if (data && data?.user?.accessToken && !redirected) {
        const { accessToken } = data.user;
        localStorage.setItem("user_token", accessToken);
        router.push(`/`);
        setRedirected(true);
      }
    }, [data, router, redirected]);
    console.log(data, isLoading);
    return (
      <Box className="flex flex-col justify-center items-center h-[350px] w-full">
        <CircleLoader width={40} />
        <Typography variant="body2" className="!mt-2">Almost done</Typography>
      </Box>
    );
}
export default RefreshToken;