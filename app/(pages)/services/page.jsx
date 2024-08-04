"use client";
import HomeWrapper from "@/app/components/view/home";
import { Box, MenuItem, Typography } from "@mui/material";
import { ServiceListing, ShopImage, StatusView } from "./components";
import { IconImage } from "@/app/components/view/home/header";
import { useState } from "react";
import { MyTextField } from "../user/components";
import { SimpleDropDown } from "../store/dashboard/product-management/add-new-product/components";
import ReactSlickSlider from "@/app/components/wrapper/react-slick";
import IconifyIcon from "@/app/components/icon";
import DialogPop, { BasicModal } from "@/app/components/cards/popup";

const filter = {
  category: ["All", "Gym", "Kitchen", "Spa", "Couture"],
  rating: ["Any", "1 Star", "2 Star", "3 Star", "4 Star", "5 Star"],
  distance: [
    "Nearby",
    "Within your street",
    "Within your city",
    "Within your state",
    "Nationwide",
  ],
  experience: ["Level 1", "Level 2", "Level 3", "Level 4"],
};

const ServicePage = () => {
  const [search, setSearch] = useState("");
  const [showFilter, setFilter] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    rating: "",
    distance: "",
    experience: "",
  });
  const [openModal, setOpenModal] = useState();

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event?.target?.value || "" });
  };
  return (
    <HomeWrapper
      popup={
        <BasicModal
          openModal={openModal}
          toggleModal={() => setOpenModal(false)}
          content={<StatusView close={() => setOpenModal(false)} />}
        />
      }
    >
      <Box className="flex px-1 md:px-10">
        <Box className="hidden md:block w-3/12 p-2 sticky top-0">
          <FilterComp
            filter={filter}
            formData={formData}
            handleChange={handleChange}
          />
        </Box>
        <Box className="w-full md:w-9/12 p-1">
          <Box className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between relative">
            <Typography
              variant="body2"
              className="!text-black !font-bold !text-[15px]"
            >
              Professional Services
            </Typography>
            <IconifyIcon
              icon={showFilter ? "tabler:x" : "tabler:filter-search"}
              className="md:hidden"
              onClick={() => setFilter(!showFilter)}
            />
            <Box
              className={` ${
                !showFilter && "hidden"
              } absolute top-12 mr-4 border rounded-lg shadow-lg bg-white z-50`}
            >
              <FilterComp
                filter={filter}
                formData={formData}
                handleChange={handleChange}
              />
            </Box>
          </Box>
          <Box
            className="bg-white rounded-lg p-2 md:p-4"
            onClick={() => setFilter(false)}
          >
            <ServicesSlider setOpenModal={setOpenModal} />

            <Box className="flex items-center justify-between mt-8 md:px-10 mb-5">
              <Typography
                variant="body2"
                className="hidden md:block !text-black !font-bold !text-[13px] md:!text-[20px]"
              >
                List of Services
              </Typography>

              <Box className="relative md:mr-4 w-full md:w-80 px-2 md:px-0">
                <input
                  type="text"
                  placeholder="Search for professional services"
                  value={search}
                  className="w-full pr-8 md:pr-12 text-[13px] pl-3 md:pl-5 h-9 md:h-11 border border-black rounded-full transition-all outline-none"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <IconImage
                  image="search"
                  className="w-4 md:w-6 absolute top-3 -mt-0.5 right-2 mr-3 cursor-pointer"
                />
              </Box>
            </Box>

            <Box className="flex flex-wrap justify-center">
              <ServiceListing
                image="/images/more/service1.png"
                icon="/images/misc/shop/1.png"
                name="Mamafeeds International"
                brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
                onClick={() =>
                  setOpenModal((prev) => {
                    return { ...prev, open: true };
                  })
                }
              />
              <ServiceListing
                image="/images/more/service1.png"
                icon="/images/misc/shop/1.png"
                name="Mamafeeds International"
                brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
              />
              <ServiceListing
                image="/images/more/service1.png"
                icon="/images/misc/shop/1.png"
                name="Mamafeeds International"
                brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
              />
              <ServiceListing
                image="/images/more/service1.png"
                icon="/images/misc/shop/1.png"
                name="Mamafeeds International"
                brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
              />
              <ServiceListing
                image="/images/more/service1.png"
                icon="/images/misc/shop/1.png"
                name="Mamafeeds International"
                brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
              />
              <ServiceListing
                image="/images/more/service1.png"
                icon="/images/misc/shop/1.png"
                name="Mamafeeds International"
                brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
              />
              <ServiceListing
                image="/images/more/service1.png"
                icon="/images/misc/shop/1.png"
                name="Mamafeeds International"
                brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
              />
              <ServiceListing
                image="/images/more/service1.png"
                icon="/images/misc/shop/1.png"
                name="Mamafeeds International"
                brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
              />
              <ServiceListing
                image="/images/more/service1.png"
                icon="/images/misc/shop/1.png"
                name="Mamafeeds International"
                brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default ServicePage;

const FilterComp = ({ filter, formData, handleChange }) => (
  <Box className="bg-white rounded-lg w-full h-[400px] p-4">
    <Typography
      variant="body2"
      className="!text-black !font-bold !text-[15px] !mb-4"
    >
      Filter
    </Typography>
    <SimpleDropDown
      render={filter.category.map((res, i) => (
        <MenuItem key={i} value={res}>
          {res}
        </MenuItem>
      ))}
      defaultValue={formData.category || filter.category[0]}
      onChange={handleChange("category")}
      label="Search by Category"
      sx={{ mb: 2 }}
    />
    <SimpleDropDown
      render={filter.rating.map((res, i) => (
        <MenuItem key={i} value={res}>
          {res}
        </MenuItem>
      ))}
      defaultValue={formData.rating || filter.rating[0]}
      onChange={handleChange("rating")}
      label="Rating"
      sx={{ mb: 2 }}
    />
    <SimpleDropDown
      render={filter.distance.map((res, i) => (
        <MenuItem key={i} value={res}>
          {res}
        </MenuItem>
      ))}
      defaultValue={formData.distance || filter.distance[0]}
      onChange={handleChange("distance")}
      label="Search by Distance"
      sx={{ mb: 2 }}
    />
    <SimpleDropDown
      render={filter.experience.map((res, i) => (
        <MenuItem key={i} value={res}>
          {res}
        </MenuItem>
      ))}
      defaultValue={formData.experience || filter.experience[0]}
      onChange={handleChange("experience")}
      label="Search by Experience"
      sx={{ mb: 2 }}
    />
  </Box>
);

export const ServicesSlider = ({ setOpenModal }) => {
  return (
    <Box className="flex items-center overflow-hidden">
      <ReactSlickSlider>
        <ShopImage
          image="/images/more/service1.png"
          icon="/images/misc/shop/1.png"
          name="Mamafeeds International"
          brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
          onClick={() => setOpenModal(true)}
        />
        <ShopImage
          image="/images/more/service2.png"
          icon="/images/misc/shop/2.png"
          name="Corisio_NG"
          brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
          onClick={() => setOpenModal(true)}
        />
        <ShopImage
          image="/images/more/service3.png"
          icon="/images/misc/shop/3.png"
          name="Kemon-Market"
          brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
          onClick={() => setOpenModal(true)}
        />
        <ShopImage
          image="/images/more/service4.png"
          icon="/images/misc/shop/4.png"
          name="Aaua Gym"
          brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
          onClick={() => setOpenModal(true)}
        />
        <ShopImage
          image="/images/more/service1.png"
          icon="/images/misc/shop/1.png"
          name="Novajii Introserve"
          brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
          onClick={() => setOpenModal(true)}
        />
        <ShopImage
          image="/images/more/service2.png"
          icon="/images/misc/shop/2.png"
          name="Wiretooth Technology"
          brief="Mamafeeds International is a premier destination that combines luxury
          spa services with high-end fashion. Catering to clients who seek
          relaxa....."
          onClick={() => setOpenModal(true)}
        />
      </ReactSlickSlider>
    </Box>
  );
};
