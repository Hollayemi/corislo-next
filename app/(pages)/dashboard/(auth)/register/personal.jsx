'use client'
import React from 'react'
import { CustomInput } from '@/app/components/cards/auth/components'
import { Box, Button, Grid } from '@mui/material'
import { createStoreHandler } from '@/app/redux/state/slices/shop/addShop'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { SpinLoader } from '@/app/components/cards/loader'
const PersonalProfile = ({
  handleUserChange,
  handleStoreChange,
  setStoreValues,
  errors,
  values,
  storeValues,
  confPas,
  setConfPass,
  readyToNext,
  setStage,
  setUserValues,
}) => {
  const propStore = storeValues.businessName.split(' ')[0]?.toLowerCase()
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  return (
    <Box className="px-2">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Full Name i.e Staff Name"
            id="fullname"
            error={
              readyToNext ? errors.fullname : values.fullname && errors.fullname
            }
            name="fullname"
            hideCheck={!values.fullname}
            onChange={handleUserChange('fullname')}
            onCancel={() =>
              setUserValues((prev) => ({ ...prev, ['fullname']: '' }))
            }
            inputProps={{
              value: values.fullname || '',
              type: 'text',
              placeholder: 'Enter your staff name',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Username"
            error={
              readyToNext ? errors.username : values.username && errors.username
            }
            onChange={handleUserChange('username')}
            onCancel={() =>
              setUserValues((prev) => ({ ...prev, ['username']: '' }))
            }
            id="username"
            hideCheck={!values.username}
            name="username"
            inputProps={{
              value: values.username || '',
              type: 'text',
              placeholder: 'Enter your username',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Business Name"
            onChange={handleStoreChange('businessName')}
            onCancel={() =>
              setStoreValues((prev) => ({ ...prev, ['businessName']: '' }))
            }
            error={storeValues.businessName && errors.businessName}
            hideCheck={!storeValues.businessName}
            id="bussname"
            inputProps={{
              value: storeValues?.businessName || '',
              type: 'text',
              onBlur: () =>
                setStoreValues((storeValues) => ({
                  ...storeValues,
                  store: propStore,
                })),
              placeholder: `Enter your business name`,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Store"
            onChange={handleStoreChange('store')}
            onCancel={() =>
              setStoreValues((prev) => ({ ...prev, ['store']: '' }))
            }
            error={storeValues.store && errors.store}
            hideCheck={!storeValues.store}
            id="store"
            inputProps={{
              value: storeValues?.store,
              type: 'text',
              placeholder: `Set your store a name e.g ${propStore}`,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            title="Email Address"
            error={readyToNext ? errors.email : values.email && errors.email}
            onChange={handleUserChange('email')}
            onCancel={() =>
              setUserValues((prev) => ({ ...prev, ['email']: '' }))
            }
            id="email"
            name="email"
            hideCheck={!values.email}
            inputProps={{
              value: values.email || '',
              type: 'email',
              placeholder: 'Enter staff email address',
            }}
          />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <CustomInput
            title="Phone Number"
            onChange={handleUserChange('phoneNumber')}
            onCancel={() =>
              setUserValues((prev) => ({ ...prev, ['phoneNumber']: '' }))
            }
            id="phoneNumber"
            name="phoneNumber"
            hideCheck={!values.phoneNumber}
            error={
              readyToNext
                ? errors.phoneNumber
                : values.phoneNumber && errors.phoneNumber
            }
            inputProps={{
              value: values.phoneNumber || '',
              type: 'number',
              placeholder: 'Enter your phone number',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="State"
            id="state"
            name="state"
            hideCheck={!values.state}
            onChange={handleUserChange('state')}
            onCancel={() =>
              setUserValues((prev) => ({ ...prev, ['state']: '' }))
            }
            inputProps={{
              value: values.state,
              type: 'text',
              placeholder: 'Enter your state',
            }}
          />
        </Grid> */}
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Password"
            onChange={handleUserChange('password')}
            onCancel={() =>
              setUserValues((prev) => ({ ...prev, ['password']: '' }))
            }
            error={
              readyToNext ? errors.password : values.password && errors.password
            }
            id="password"
            hideCheck={!values.password}
            name="password"
            inputProps={{
              value: values.password || '',
              type: 'password',
              placeholder: '.......',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Confirm Password"
            id="confPass"
            error={values.password !== confPas ? 'Password not match' : false}
            name="confPass"
            onChange={(e) => setConfPass(e.target.value)}
            onCancel={() => setConfPass('')}
            hideCheck={!confPas}
            inputProps={{
              value: confPas || '',
              type: 'password',
              placeholder: '.......',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            title="About"
            onChange={handleStoreChange('about_store')}
            onCancel={() =>
              setStoreValues((prev) => ({ ...prev, ['about_store']: '' }))
            }
            error={storeValues.about_store && errors.about_store}
            hideCheck={!storeValues.about_store}
            id="state"
            multiline
            inputProps={{
              value: storeValues?.about_store || '',
              type: 'text',
              placeholder: 'About your business',
            }}
          />
        </Grid>
      </Grid>
      <Box className="w-full  !b-10 mb-10 md:mb-0 pt-8">
        <Button
          variant="contained"
          disabled={confPas !== values.password || !values.password}
          className="w-full !h-12 !rounded-full !text-gray-100 !text-[17px] !mt-3 !mb-10 !shadow-none"
          onClick={() =>
            createStoreHandler(
              { user: values, store: storeValues },
              dispatch,
              setStage,
              setLoading
            )
          }
        >
          Next
        </Button>
      </Box>
      {loading && (
        <Box className="w-full h-full absolute top-0 left-0 bg-black opacity-40  flex items-center justify-center">
          <SpinLoader />
        </Box>
      )}
    </Box>
  )
}

export default PersonalProfile
