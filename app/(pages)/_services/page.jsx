'use client'
// import UserWrapper from '@/app/components/view/user'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import { ServiceListing, ServiceListing2, ShopImage, StatusView } from './components'
import { IconImage } from '@/app/components/view/home/header'
import { useEffect, useState } from 'react'
import { SimpleDropDown } from '../dashboard/store/product-management/add-new-product/components'
import ReactSlickSlider from '@/app/components/wrapper/react-slick'
import IconifyIcon from '@/app/components/icon'
import { BasicModal } from '@/app/components/cards/popup'
import MyAutocomplete from '@/app/components/myAutoComplete'
import useSWR from 'swr'
import { htmlToText } from 'html-to-text'
import MyPagination from '@/app/components/templates/pagination'

const filter = {
  category: ['All', 'Gym', 'Kitchen', 'Spa', 'Couture'],
  rating: ['Any', '1 Star', '2 Star', '3 Star', '4 Star', '5 Star'],
  distance: [
    'Nearby',
    'Within your street',
    'Within your city',
    'Within your state',
    'Nationwide',
  ],
  experience: ['Level 1', 'Level 2', 'Level 3', 'Level 4'],
}

const ServicePage = ({ searchParams }) => {
  const [search, setSearch] = useState('')
  const [showFilter, setFilter] = useState(false)
  const [filtered, setFiltered] = useState(false)

  const [openModal, setOpenModal] = useState()

  const { data, isLoading } = useSWR('/services')
  const services = data?.data || []

  const handleFilter = (input) => {
    setSearch(input)
    if (services.length) {
      const searchFilterFunction = (serv) =>
        serv.provider.store.toLowerCase().includes(input.toLowerCase()) ||
        serv.service_name.toLowerCase().includes(input.toLowerCase()) ||
        serv.collectionName.toLowerCase().includes(input.toLowerCase()) ||
        serv.subcategory.toLowerCase().includes(input.toLowerCase())

      const filteredArr = services.filter(searchFilterFunction)
      setFiltered(filteredArr)
    }
  }
  const showServices = filtered ? filtered : services
  return (
    <Box
      popup={
        <BasicModal
          openModal={openModal}
          toggleModal={() => setOpenModal(false)}
          content={<StatusView close={() => setOpenModal(false)} />}
        />
      }
    >
      <Box className="flex !px-1 md:!px-10 relative">
        <Box className="hidden md:block w-3/12 p-2 sticky h-80 top-0">
          <FilterComp
            filter={filter}
            services={services}
            setFiltered={setFiltered}
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
              icon={showFilter ? 'tabler:x' : 'tabler:filter-search'}
              className="md:hidden"
              onClick={() => setFilter(!showFilter)}
            />
            <Box
              className={` ${!showFilter && 'hidden'
                } absolute top-12 mr-4 border rounded-lg shadow-lg bg-white z-50`}
            >
              <FilterComp
                filter={filter}
                services={services}
                setFiltered={setFiltered}
              />
            </Box>
          </Box>
          <Box
            className="bg-white rounded-lg p-2 md:p-4"
            onClick={() => setFilter(false)}
          >
            <ServicesSlider setOpenModal={setOpenModal} />

            <Box className="flex items-center justify-between mt-8 md:!px-10 mb-5">
              <Typography
                variant="body2"
                className="hidden md:block !text-black !font-bold !text-[13px] md:!text-[20px]"
              >
                List of Services
              </Typography>

              <Box className="relative md:mr-4 w-full md:w-80 !px-2 md:!px-0">
                <input
                  type="text"
                  placeholder="Search for professional services"
                  value={search}
                  className="w-full pr-8 md:pr-12 text-[13px] pl-3 md:pl-5 h-9 md:h-11 border border-black rounded-full transition-all outline-none"
                  onChange={(e) => handleFilter(e.target.value)}
                />
                <IconImage
                  image="search"
                  className="w-4 md:w-6 absolute top-3 -mt-0.5 right-2 mr-3 cursor-pointer"
                />
              </Box>
            </Box>

            <Box className="flex flex-wrap justify-center">
              {showServices.length ? (
                showServices.map(({ provider, ...others }, i) => (
                  <ServiceListing2
                    key={i}
                    image="/images/more/service1.png"
                    icon={others.images[0] || '/images/misc/no-image.png'}
                    others={others}
                    state={provider.state}
                    city={provider.city}
                    brief={htmlToText(others.description)}
                    provider={provider.store}
                  />
                ))
              ) : (
                <Box className="flex justify-center items-center h-60">
                  <IconifyIcon icon="tabler:history" />
                  <Typography
                    variant="body2"
                    className="hidden md:block !text-black !text-[13px] !ml-4"
                  >
                    No record found
                  </Typography>
                </Box>
              )}
            </Box>
            <Box className="flex justify-center mt-6">
              <MyPagination
                searchParams={searchParams}
                currentPage={searchParams?.page || 1}
                totalNumber={0}
                limit={8}
                query="page"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ServicePage

const FilterComp = ({ filter, setFiltered, services }) => {
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    rating: '',
    distance: '',
  })
  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event?.target?.value || '' })
  }

  console.log(formData)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const searchTerm = search.toLowerCase()

  const { data: cats, error } = useSWR('/corisio/service-categories')
  const servCats = cats?.data || []

  const filteredCate = servCats.filter(
    (x) =>
      x.label.toLowerCase().includes(searchTerm) ||
      x.sub_categories.some((item) => item.toLowerCase().includes(searchTerm))
  )
  const subCategories = servCats.filter((x) => x._id === formData.category)

  const handleFilter = () => {
    if (services.length) {
      const searchFilterFunction = (each) => {
        console.log(each)
        return each.category._id === formData.category || formData.subcategory
          ? each.subcategory
            .toLowerCase()
            .includes(formData.subcategory.toLowerCase())
          : false
      }

      const filteredArr = services.filter(searchFilterFunction)
      console.log(filteredArr)
      setFiltered(filteredArr)
    }
  }

  return (
    <Box className="bg-white rounded-lg w-full h-[450px] p-4">
      <Typography
        variant="body2"
        className="!text-black !font-bold !text-[15px] !mb-4"
      >
        Filter
      </Typography>
      <MyAutocomplete
        searchComponents={
          <TextField
            sx={{ mb: 1.5 }}
            className="w-5/6"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onFocus={() => setOpen(true)}
            autoComplete={false}
            fullWidth
            id="outlined-basic"
            inputProps={{ className: '!h-2', autoComplete: 'off' }}
            placeholder="Search category"
          />
        }
        label="Filter by category"
        closeFunc={() => setOpen(false)}
        options={filteredCate}
        viewOption={(e) => e.label}
        open={open}
        onClick={(value) => {
          setFormData((prev) => ({
            ...prev,
            category: value._id,
            subcategory: '',
          }))
          handleFilter()
          setSearch(value.label)
        }}
      />
      <SimpleDropDown
        render={subCategories[0]?.sub_categories?.map((res, i) => (
          <MenuItem key={i} value={res}>
            {res}
          </MenuItem>
        ))}
        sx={{ mb: 2 }}
        defaultValue={formData.subcategory}
        onChange={handleChange('subcategory')}
        label="Filter by sub-category"
      />
      <SimpleDropDown
        render={filter.rating.map((res, i) => (
          <MenuItem key={i} value={res}>
            {res}
          </MenuItem>
        ))}
        defaultValue={formData.rating || filter.rating[0]}
        onChange={handleChange('rating')}
        label="Filter Rating"
        sx={{ mb: 2 }}
      />
      <SimpleDropDown
        render={filter.distance.map((res, i) => (
          <MenuItem key={i} value={res}>
            {res}
          </MenuItem>
        ))}
        defaultValue={formData.distance || filter.distance[0]}
        onChange={handleChange('distance')}
        label="Filter by distance"
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        fullWidth
        onClick={handleFilter}
        className="!mt-4 !shadow-none  !text-[13px]"
      >
        Filter
      </Button>
    </Box>
  )
}

export const ServicesSlider = ({ setOpenModal, noPopup }) => {
  const { data: renders, error } = useSWR('/spb/services-renders')
  const spbs = renders?.data || []

  return (
    <Box className="flex items-center overflow-hidden">
      <ReactSlickSlider>
        {spbs.map(({ details }, i) => (
          <ShopImage
            key={i}
            image={details.gallery[1] || '/images/more/service1.png'}
            icon={details?.profile_image || '/images/misc/shop/1.png'}
            name={details.businessName || 'Mamafeeds International'}
            brief={details.about_store}
            onClick={() => !noPopup && setOpenModal(true)}
          />
        ))}
        {spbs.map(({ details }, i) => (
          <ShopImage
            key={i}
            image={details.gallery[1] || '/images/more/service1.png'}
            icon={details?.profile_image || '/images/misc/shop/1.png'}
            name={details.businessName || 'Mamafeeds International'}
            brief={details.about_store}
            onClick={() => !noPopup && setOpenModal(true)}
          />
        ))}
        {/* <ShopImage
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
        /> */}
      </ReactSlickSlider>
    </Box>
  )
}
