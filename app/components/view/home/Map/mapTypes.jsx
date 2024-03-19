import { useState } from"react";
import IconifyIcon from "@/app/components/icon";
import { Box, Typography } from"@mui/material";
import Image from"next/image";

const Maps = ({ setStage }) => {
  const [type, setType] = useState("default");
  const MapSample = ({ name }) => (
    <Box onClick={() => setType(name)} className="relative my-3">
      <Image
        src={`/images/misc/${name.toLowerCase()}-map.png`}
        alt="map-type"
        width={500}
        height={500}
        className="w-full h-28"
      />
      <Box
        className={`absolute top-0 left-0 w-full h-full bg-purple-400 opacity-40 ${
          type !== name && "hidden"
        } hover:!block `}
      ></Box>
      <Typography
        variant="body2"
        className="!font-bold absolute bottom-2 right-4 !text-white !text-base"
      >
        {name}
      </Typography>
    </Box>
  );
  return (
    <Box className="pt-6 w-full relative">
      <Box
        className="flex items-center justify-center bg-gray-100 rounded-full z-50 w-6 h-6 p-px cursor-pointer absolute m-1  top-0 right-0"
        onClick={() => setStage("")}
      >
        <IconifyIcon icon="tabler:x" className="!text-gray-600 !text-[15px]" />
      </Box>
      <MapSample name="Default" />
      <MapSample name="Satalite" />
      <MapSample name="Terrain" />
    </Box>
  );
};

export default Maps;
