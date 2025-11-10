import IconifyIcon from '@/app/components/icon'
import { formatCurrency } from '@/app/utils/format'
import {
  Box,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { statusObj } from '../components'
import CustomChip from '@/app/components/chip'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export const ProductPrev = ({
  image,
  quantity,
  prodName,
  prodPrice,
  others,
}) => {
  return (
    <Box className="h-28">
      <Box className="flex items-start pb-4 py-3 w-full relative">
        <Box className={`flex items-center justify-between w-full `}>
          <Box className="flex items-start w-full">
            <img
              src={image}
              alt="prod_image"
              width={150}
              height={150}
              className="w-20 h-20 flex-shrink-0 !rounded-xl"
            />
            <Box className={`!px-3 w-3/5 md:w-10/12 min-w-40 relative`}>
              <Typography
                variant="body2"
                noWrap
                className="!font-semibold !text-[14px]"
              >
                {prodName}
              </Typography>
              <Typography
                variant="body2"
                className="!font-extrabold !text-black !text-[16px] !-mb-px !p-0"
              >
                NGN {prodPrice?.toFixed(2)?.toLocaleString()}
              </Typography>
              <Box className="mt-3 !text-left">
                {others?.discount ? (
                  <Typography
                    variant="body2"
                    className="!text-red-500 !text-left !text-[12px]"
                  >
                    {others.discount}% discount
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    className="text-left !text-[12px]"
                  >
                    No discount Applied
                  </Typography>
                )}
              </Box>
            </Box>
            <Box className="w-2/5 flex flex-col justify-end items-end mt-3 pr-1">
              <Typography
                variant="body2"
                className="!text-gray-500 !text-[12px] w-32  text-center"
              >
                Qty: {quantity}
              </Typography>
              <Typography
                variant="body2"
                className="!text-gray-500 !text-[12px] w-32"
              >
                {quantity} x {formatCurrency(prodPrice)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export const CustomizeStatus = ({
  text,
  size,
  label,
  disabled,
  onClick,
}) => {
  const status = statusObj.filter(
    (e) => e.title === text.replaceAll(' ', '_').toLowerCase()
  )[0]
  return (
    <CustomChip
      rounded
      size={size || 'small'}
      skin="light"
      color={status?.color}
      label={status?.title?.replaceAll('_', ' ')}
      sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
      className="flex-shrink-0 !rounded-sm mx-1.5"
      onClick={onClick}
    />
  )
}

export const OrderSummary = ({ title, info, price, bold }) => {
  return (
    <Box className="flex items-center justify-between">
      <Typography
        className={`${bold && '!font-bold !mt-2'} !text-[14px] !mb-2`}
      >
        {title}
      </Typography>

      <Box className="flex items-center justify-between w-1/2">
        <Typography className=" !text-[14px] !mb-2 ">{info}</Typography>
        <Typography
          className={`${bold && '!font-bold !mt-2'} !text-[14px] !mb-2`}
        >
          {formatCurrency(price)}
        </Typography>
      </Box>
    </Box>
  )
}

export const IconValue = ({ icon, value, className }) => {
  return (
    <Box className={`flex items-center text-gray-500 mb-2 ${className}`}>
      <IconifyIcon icon={icon} className="!text-inherit !mr-3" />
      <Typography className={`!text-[12px] !text-inherit`}>{value}</Typography>
    </Box>
  )
}

export const renderMenu = ({
  handleMenuItemClick,
  anchorEl,
  open,
  handleMenuClose,
}) => (
  <Menu
    anchorEl={anchorEl}
    open={open}
    className="left-0"
    onClose={handleMenuClose}
  >
    <MenuItem
      onClick={handleMenuItemClick('')}
      className="flex items-center  justify-between w-full"
    >
      Update Order Status{' '}
      <IconifyIcon
        icon="tabler:chevron-right"
        className="text-[15px] ml-5 md:ml-8"
      />
    </MenuItem>
    <MenuItem
      onClick={handleMenuItemClick('Refunded')}
      className="text-orange-500"
    >
      Refund
    </MenuItem>
    <MenuItem
      onClick={handleMenuItemClick('Cancelled')}
      className="text-red-500"
    >
      Cancel Order
    </MenuItem>
  </Menu>
)

export const renderSubMenu = ({
  anchorEl,
  openSub,
  handleMenuClose,
  handleMenuItemClick,
  row,
}) => (
  <Menu
    anchorEl={anchorEl}
    open={openSub}
    onClose={handleMenuClose}
    className={` w-full !-mr-80 py-4 !px-4`}
  >
    <MenuItem
      onClick={handleMenuItemClick('Processing')}
      className="flex items-center justify-between w-full"
    >
      Processing
    </MenuItem>
    {row?.deliveryMedium !== 'pickup' ? (
      <MenuItem onClick={handleMenuItemClick('Out for delivery')}>
        Out for Delivery
      </MenuItem>
    ) : (
      <MenuItem onClick={handleMenuItemClick('Pickable')}>Pickable</MenuItem>
    )}
    <MenuItem onClick={handleMenuItemClick('Pending')}>On Hold</MenuItem>
    <MenuItem onClick={handleMenuItemClick('Completed')}>Received</MenuItem>
  </Menu>
)

export const ConfirmPicker = ({ payload, storeUpdateOrder, setRightOpen }) => {
  const [slug, setSlug] = useState('PIK-')
  const dispatch = useDispatch()
  const npayload = { pickerSlug: slug, ...payload }
  return (
    <Box className="!px-3">
      <Typography variant="body2" className="!text-[13px] !mt-4 !mb-2">
        Confirm Picker by ID
      </Typography>
      <TextField
        onChange={(e) => setSlug(e.target.value)}
        value={slug}
        size="small"
        placeholder="************"
        className="w-full"
        startAdornment={<InputAdornment position="start">PIK-</InputAdornment>}
      />
      {
        <Button
          variant="contained"
          onClick={() => storeUpdateOrder(dispatch, npayload, setRightOpen(null))}
          className="!h-10 w-full !mt-6"
        >
          Confirm ID
        </Button>
      }
    </Box>
  )
}
