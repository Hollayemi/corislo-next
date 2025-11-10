'use client'
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { MyTextField, TitleSubtitle } from './components'
import { Add, Remove } from '@mui/icons-material'
import useSWR from 'swr'
import Image from 'next/image'
import { mySubstring } from '@/app/utils/format'
import IconifyIcon from '@/app/components/icon'
import { useDispatch } from 'react-redux'
import { useUserData } from '@/app/hooks/useData'
import { addPickupPerson } from '@/app/redux/state/slices/users/pickup'

const Pickers = () => {
  const { userInfo } = useUserData()
  const { data: agents } = useSWR('/user/pickers')
  const pickers = agents?.data || []
  const [open, openNewPicker] = useState(false)
  const [selected, select] = useState(1)

  const [pickerPayload, setPickerData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
  })

  const dispatch = useDispatch()
  const handlePickerData =
    (prop) =>
      ({ target }) => {
        setPickerData((data) => {
          return { ...data, [prop]: target.value }
        })
      }

  const AddBtn = ({ btnText, click }) => (
    <Button
      variant="text"
      className="!text-black !w-36 !h-7 !shadow-none !bg-gray-200 !text-[12px] !my-4"
      startIcon={btnText === 'Close' ? <Remove /> : <Add />}
      onClick={() => click((prev) => !Boolean(prev))}
    >
      {btnText}
    </Button>
  )

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TitleSubtitle
            title="My Pickers"
            subtitle="Give access to my people I know to pick my orders"
          />
          <AddBtn
            btnText={open ? 'Close' : 'Add New Picker'}
            click={openNewPicker}
          />

          {open && (
            <Box className="lg:pr-10">
              <Box className="flex items-center justify-between flex-wrap w-full">
                <MyTextField
                  title="Fullname"
                  value={pickerPayload.name}
                  onChange={handlePickerData('name')}
                  PClassName="w-full sm:w-1/2 !px-1 !tracking-wider"
                />
                <MyTextField
                  title="Phone"
                  value={pickerPayload.phone}
                  placeholder=""
                  type="number"
                  onChange={handlePickerData('phone')}
                  PClassName="w-full sm:w-1/2 !px-1 !tracking-wider"
                />
              </Box>
              <Box className="flex items-center justify-between flex-wrap w-full">
                <MyTextField
                  title="Email"
                  value={pickerPayload.email}
                  type="email"
                  onChange={handlePickerData('email')}
                  PClassName="w-full sm:w-1/2 !px-1 !tracking-wider"
                />
                <MyTextField
                  title="Relationship"
                  value={pickerPayload.relationship}
                  type="text"
                  placeholder=""
                  onChange={handlePickerData('relationship')}
                  PClassName="w-full sm:w-1/2 !px-1 !tracking-wider"
                />
              </Box>
              <Button
                onClick={() => addPickupPerson(pickerPayload, dispatch)}
                fullWidth
                variant="contained"
                className="!h-10 !w-full"
              >
                Save Picker
              </Button>
              <br />
            </Box>
          )}
          <Typography
            variant="body2"
            className="!font-bold !text-black !text-[13px] !mt-8"
          >
            Added Pickers
          </Typography>

          <Box className="mt-4 w-full">
            {pickers.map((each, i) => (
              <Person
                key={i}
                sn={i + 1}
                name={each.name}
                relationship={each.relationship}
                selected={selected}
                onClick={() => select(i + 1)}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className="!mt-10 md:!mt-0">
          <TitleSubtitle
            title="Picker's Details"
            subtitle="Information about the picker and the products picked"
          />

          {false && <Box className="lg:pr-10"></Box>}
          <br />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Pickers

const Person = ({ sn, name, relationship, selected, onClick }) => (
  <Box
    className={`flex items-center justify-between mt-2 cursor-pointer ${sn === selected && 'text-blue-600'
      }`}
    onClick={onClick}
  >
    <Box className="flex items-center">
      {sn === selected ? (
        <IconifyIcon
          icon="tabler:chevron-right"
          className="mr-2 !text-[16px]"
        />
      ) : (
        <Box className="w-6"></Box>
      )}
      <Typography
        variant="body2"
        className="!font- !text-inherit !text-[13px] !mr-4"
      >
        {sn}
      </Typography>
      <Typography variant="body2" className="!font- !text-inherit !text-[13px]">
        {name}
      </Typography>
    </Box>
    <Typography variant="body2" className="!font- !text-inherit !text-[13px]">
      ({relationship})
    </Typography>
  </Box>
)
