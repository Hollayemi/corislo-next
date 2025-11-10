/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)
import { settingsInnerList } from '@/app/data/store/innerList'
import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { InputBoxWithSideLabel } from '../../stores/component'
import { useStoreData } from '@/app/hooks/useData'
import { settingsBreadCrumb } from '../components'
import IconifyIcon from '@/app/components/icon'
import { TitleSubtitle } from '@/app/(pages)/(users)/user/components'

const VoucherPage = ({ params }) => {
  const path = {
    ...params,
    sidebar: 'settings',
    sublist: 'voucher',
  }
  const {
    showSnackbar,
    staffInfo: { permissions, profile },
  } = useStoreData()
  const [dialogInfo, updateDialogInfo] = useState({
    open: false,
    title: 'Add Employee',
    acceptFunctionText: 'Go ahead, create',
    acceptFunction: () => {
      //   addStaff(newVoucher, dispatch, showSnackbar)
    },
  })
  const [newVoucher, setNewVoucher] = useState({
    fullname: '',
    phoneNumber: '',
    email: '',
    username: '',
  })
  useEffect(() => {
    updateDialogInfo((prevDialogInfo) => ({
      ...prevDialogInfo,
      acceptFunction: () => {
        // addStaff(newVoucher, dispatch, showSnackbar)
      },
    }))
  }, [newVoucher, showSnackbar])
  const handleVoucherChange = (prop) => (event) => {
    setNewVoucher((prevValues) => ({
      ...prevValues,
      [prop]: event.target.value,
    }))
  }
  const VoucherCard = () => {
    return <Box></Box>
  }
  return (
    <StoreLeftSideBar
      path={path}
      permission="view_staff"
      subListBar={false}
      InnerList={settingsInnerList}
      crumb={[...settingsBreadCrumb, { text: 'Voucher', link: 'voucher' }]}
      dialogInfo={dialogInfo}
      updateDialogInfo={updateDialogInfo}
      dialogComponent={
        <NewVoucher
          newVoucher={newVoucher}
          handleVoucherChange={handleVoucherChange}
        />
      }
    >
      <Box className="h-ful w-full bg-white !px-1 md:!px-5 py-8 rounded-md">
        <Box className="flex items-start justify-between w-full">
          <TitleSubtitle
            title="Vouchers"
            titleClass="!text-[18px]"
            subtitle="View and upgrade plans for your Corisio Store"
            subtitleClass="!text-[13px] !mt-2"
            className=""
          />
          {profile?.branchName !== 'HQ' && (
            <Button
              variant="contained"
              className="!text-[13px] !w-auto !h-10 !rounded-md !shadow-none"
              onClick={() => router.push('/dashboard/store/stores/sub-store')}
              startIcon={<IconifyIcon icon="tabler:plus" />}
            >
              <span className="hidden md:block mr-1">Create New</span> Voucher
            </Button>
          )}
        </Box>
        <Box></Box>
      </Box>
    </StoreLeftSideBar>
  )
}

export default VoucherPage

const NewVoucher = ({ newVoucher, handleVoucherChange }) => (
  <Box>
    <InputBoxWithSideLabel
      value={newVoucher.fullname}
      onChange={handleVoucherChange('fullname', newVoucher)}
      label="Fullname"
    />
    <InputBoxWithSideLabel
      value={newVoucher.username}
      onChange={handleVoucherChange('username', newVoucher)}
      label="Username"
    />
    <InputBoxWithSideLabel
      value={newVoucher.email}
      onChange={handleVoucherChange('email', newVoucher)}
      label="Email"
    />
    <InputBoxWithSideLabel
      value={newVoucher.phoneNumber}
      onChange={handleVoucherChange('phoneNumber', newVoucher)}
      label="Phone Number"
    />
  </Box>
)
