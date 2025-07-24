import IconifyIcon from "@/app/components/icon";
import MapGraph from "@/app/components/view/home/Map/map";
import useGeolocation from "@/app/hooks/useGeolocation";
import { Box, Button } from "@mui/material";

export const SetLocation = ({ close }) => {
  const {
    coordinates: { latitude: lat, longitude: lng },
  } = useGeolocation();
  return (
    <Box className="flex h-full justify-center items-center px-4">
      <Box className="w-full h-full">
        <MapGraph markers={[{ lat, lng }]} />
        <Button
          variant="outlined"
          className="!bg-white"
          fullWidth
          onClick={close}
          endIcon={<IconifyIcon icon="tabler:current-location" />}
        >
          <span className="mr-4">Set Location</span> ({lat}, {lng})
        </Button>
      </Box>
    </Box>
  );
};
