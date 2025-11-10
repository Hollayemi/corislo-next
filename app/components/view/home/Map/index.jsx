import { useUserData } from "@/app/hooks/useData";
import { IconImage } from "../header";
import { useState } from "react";
import Image from "next/image";
import IconifyIcon from "@/app/components/icon";
import Direction from "./direction";
import AboutStore from "./store";
import Maps from "./mapTypes";
import MapGraph from "./map";
import useSWR from "swr";
import { Box, Button, Typography, TextField } from "@mui/material";
import { CircleLoader } from "@/app/components/cards/loader";

const MapOverlay = () => {
  const { showMapScreen, popMap } = useUserData();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("");
  const [mapType, setMapType] = useState("default");
  const [markers, setMarkers] = useState([
    {
      lat: 7.1762595,
      lng: 4.7260668,
      info: "Coristen",
      branchId: "65ac80101cc3db0407fa00c9",
    },
    {
      lat: 7.1768595,
      lng: 4.7290668,
      info: "Marker 2",
      branchId: "65ac80101cc3db0407fa00c9",
    },
    {
      lat: 7.1768393,
      lng: 4.7280468,
      info: "Corisio",
      branchId: "65ac80101cc3db0407fa00c9",
    },
  ]);

  const { data: storeSearch, isLoading: searchLoading } = useSWR(
    `/store-search?search=${search}`
  );

  const searchResult = storeSearch?.data || [];

  const stages = {
    direction: <Direction setStage={setStage} />,
    store: <AboutStore setStage={setStage} />,
    map_type: (
      <Maps setStage={setStage} setMapType={setMapType} mapType={mapType} />
    ),
  };

  const MapStageBtn = ({ icon, name }) => (
    <Box
      className={`${name === stage && "bg-slate-200"
        } hover:bg-slate-200 h-8 w-8 rounded flex justify-center items-center mb-1 par`}
      onClick={() => setStage(name)}
    >
      <IconifyIcon
        icon={icon}
        className={`${name === stage ? "!text-blue-800" : "!text-gray-400"
          } par-hover:!text-blue-800 !text-[16px]`}
      />
    </Box>
  );

  const SearchResults = ({ name, click }) => {
    const resultClick = () => {
      setSearch("");
      const storeLoc = searchResult.map((each) => {
        return {
          lat: 7.1762595,
          lng: 4.7260668,
          info: each.businessName,
          branchId: each.branchId,
        };
      });

      setMarkers(storeLoc);
    };
    return (
      <Box
        className="flex justify-between p-1.5 mt-px cursor-pointer parent"
        onClick={resultClick}
      >
        <Box className="flex items-center">
          <IconifyIcon icon="tabler:map-pin" className="!text-[16px] mr-2.5" />
          <Typography
            variant="body2"
            className="!text-[12px] !text-gray-400 parent-hover:!text-black !flex-shrink-0"
          >
            {name}
          </Typography>
        </Box>
        <IconifyIcon
          icon="tabler:corner-up-left"
          className="!text-[16px] mr-2.5"
        />
      </Box>
    );
  };

  return (
    <Box className="w-full h-screen fixed z-50 top-0 left-0 overflow-hidden">
      <Box className="w-full h-full absolute bg-white opacity-95 top-0 left-0"></Box>
      <Box className="flex justify-center !w-full !h-full  py-8 md:!px-8 md:py-12">
        <Box className="!w-full relative !h-full bg-white z-50 rounded-md mt-8">
          <Box className="w-full h-full p-2">
            {/* <Image
              src="/images/more/map.png"
              alt="jkd"
              className="w-full h-full"
              width={1000}
              height={1000}
            /> */}
            <MapGraph mapType={mapType} markers={markers} />
          </Box>
          <Box className="absolute z-50 top-2 left-2 w-full">
            <Button
              className="!h-7 !shadow-none !absolute !hidden md:!flex !top-4 !left-4 !rounded-full !text-white !font-bold !text-[10px]"
              variant="contained"
              onClick={() => showMapScreen()}
              startIcon={
                <Box className="flex items-center justify-center bg-white rounded-full w-3 h-3 p-px">
                  <IconifyIcon
                    icon="tabler:x"
                    className="!text-blue-950 !text-[15px]"
                  />
                </Box>
              }
            >
              Close Map
            </Button>
            <Box
              className="flex items-center md:hidden absolute top-0 left-0 -ml-1.5 -mt-1.5 justify-center bg-blue-950 rounded-full w-6 h-6 p-px"
              onClick={() => showMapScreen()}
            >
              <IconifyIcon
                icon="tabler:x"
                className="!text-white !text-[16px] !font-bold"
              />
            </Box>

            <Box className="!px-8">
              <Box className="!-ml-2 md:!ml-40 relative w-full md:w-[350px]">
                <Box className="relative md:block w-full md:w-auto md:!px-0 mt-4 md:mt-6">
                  <input
                    type="text"
                    placeholder="Search for stores or locations"
                    value={search}
                    className="w-full pl-10 text-[13px] !bg-white pr-4 h-11 shadow-xl rounded-full transition-all outline-none"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <IconImage
                    image="search"
                    className="w-4 absolute top-2 ml-4 mt-1.5"
                  />
                </Box>

                {search && (
                  <Box className="w-full bg-white !px-2 py-2 absolute top-14 z-50 rounded-xl left-0 h-40 min-h-40 shadow-xl">
                    <Typography
                      variant="body2"
                      className="!text-[12px] !text-gray-600 mb-2 !px-3 py-2 !flex-shrink-0 border-b"
                    >
                      Search for stores or locations
                    </Typography>
                    {searchLoading ? (
                      <Box className="h-20 w-full flex justify-center items-center">
                        <CircleLoader />
                      </Box>
                    ) : (
                      searchResult.map((each, i) => (
                        <SearchResults
                          name={`${each.businessName} (${each.more.branchName})`}
                          key={i}
                          click
                        />
                      ))
                    )}
                  </Box>
                )}
              </Box>
            </Box>

            {stage && (
              <Box className=" w-[303px] md:w-[360px] h-auto pb-3 shadow-xl bg-white rounded-xl absolute right-20 top-20 md:top-4 !px-3">
                {stages[stage]}
              </Box>
            )}

            <Box className="w-auto p-2 h-auto shadow-xl bg-white rounded-sm absolute right-6 top-20 md:top-4">
              <MapStageBtn icon="tabler:corner-up-left" name="direction" />
              <MapStageBtn icon="tabler:building-store" name="store" />
              <MapStageBtn icon="tabler:map-pin-2" name="map_type" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MapOverlay;
