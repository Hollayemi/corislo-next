import { reshapePrice } from '@/app/(pages)/dashboard/store/marketing/components'
import { CustomizeStatus } from '@/app/(pages)/dashboard/store/order-management/review/components'
import IconifyIcon from '@/app/components/icon'
import OptionsMenu from '@/app/components/option-menu'
import { useStoreData } from '@/app/hooks/useData'
import { updateStaff } from '@/app/redux/state/slices/shop/branches/staffs'
import { Colors } from '@/app/utils/Colors'
import { formatDate, formatSegmentation } from '@/app/utils/format'
import { hexToRGBA } from '@/app/utils/hex-to-rgba'
import { rgbaToHex } from '@/app/utils/rgba-to-hex'
import { Box, Button, Divider, Typography } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export const UserCard = (props) => {
  const { showSnackbar } = useStoreData()
  const dispatch = useDispatch()

  const FlexContent = ({ tag, info }) => (
    <Box className="flex items-center justify-betwen py-1">
      <Typography variant="body2" className="w-3/6 !text-[12px]">
        {tag}
      </Typography>
      <Typography variant="body2" className="!text-[12px] !text-center">
        {info}
      </Typography>
    </Box>
  )

  const IconBtn = ({ icon, middle }) => {
    const randomIndex = Math.floor(Math.random() * Colors.length)
    let bgColor = rgbaToHex(hexToRGBA(Colors[randomIndex], 0.1))
    return (
      <Box
        className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 hover:-mt-3"
        bgcolor={middle && bgColor}
      >
        <IconifyIcon icon={icon} className="text-[17px]" />
      </Box>
    )
  }
  return (
    <Box className="w-full py-2 ">
      <Box className="flex justify-between items-center">
        <Box
          className="flex items-center w-fit cursor-pointer mb-2 px-4"
          onClick={props.setRightOpen}
        >
          <IconifyIcon icon="tabler:arrow-left" className="mr-3" />
          <Typography variant="caption" className="">
            Back
          </Typography>
        </Box>
      </Box>
      <Box className="w-full relative border-t">
        <Box className="absolute top-0 right-0 mr-2 mt-2">
          <OptionsMenu
            icon={<IconifyIcon icon="tabler:dots" className="!text-[17px]" />}
            options={[
              'Edit info',
              { text: 'Revoke Access', rest: 'deactivated' },
              { text: 'Give Access', rest: 'activated' },
            ]}
            setOption={(e) =>
              updateStaff(
                dispatch,
                { staffId: id, staffStatus: e },
                showSnackbar
              )
            }
            iconButtonProps={{
              size: 'small',
              sx: { color: 'text.disabled', cursor: 'pointer' },
            }}
          />
        </Box>
        <Box className="mt-5 mb-2 px-4">
          <img
            src={props.picture || '/images/misc/no-profile.png'}
            alt="img"
            width={100}
            height={100}
            className="w-20 h-20 rounded-full !mb-2 p-1 bg-white"
          />
          <Box className="flex items-center mb-3">
            <Box>
              <Typography
                variant="body2"
                className="!font-bold !text-[16px] !mx-1 mr-1"
              >
                {props.fullname}
              </Typography>
              <Typography
                variant="body2"
                className="!text-[11px] !text-gray-400 !mx-1"
              >
                {props.email}
              </Typography>
            </Box>
            <CustomizeStatus text={props.isActive ? 'Active' : 'Inactive'} />
          </Box>
          {/* <IconBtn icon="tabler:phone" /> */}
          <Box className="flex items-center mb-3">
            <Box className="flex items-center jusify-ceter bg-gray-100 w-fit py-1.5 rounded-full px-2">
              <Typography variant="body2" className="!text-[11px] !font-bold">
                {formatSegmentation(
                  props?.order?.quantity,
                  props?.order?.totalSpent,
                  props?.order?.lastDate
                )}
              </Typography>
            </Box>
            <Box className="flex items-center ml-2 jusify-ceter bg-gray-100 w-fit py-1.5 rounded-full px-2">
              <Typography variant="body2" className="!text-[11px] !font-bold">
                {formatSegmentation(
                  props?.order?.quantity,
                  props?.order?.totalSpent,
                  props?.order?.lastDate
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box className="py-2 px-4">
          <Box className="mt-3">
            <Box className="mb-2">
              <FlexContent
                tag="Joined Date"
                info={formatDate(props?.createdAt)}
              />
              <FlexContent
                tag="Total Order"
                info={props?.order?.orders?.length}
              />
              <FlexContent
                tag="Amount Spent"
                info={reshapePrice(props?.order?.totalSpent)}
              />
              <FlexContent tag="Items Bought" info={props?.order?.quantity} />
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box className="py-2 px-4">
          <Typography variant="caption" className="!font-bold">
            Activities
          </Typography>
        </Box>
      </Box>
      <Box className="absolute border-t bottom-2 w-full px-2 flex justify-center">
        <Button
          className="w-1/2 !px-0 !m-2  shadow-none !text-white !rounded-lg !text-[12px] md:!text-[13px]"
          variant="contained"
          onClick={props.setRightOpen}
        >
          {props.isActive ? 'Deactivate' : 'Activate'}
        </Button>
      </Box>
    </Box>
  )
}
