'use client'

import StoreAuthLayout from '@/app/components/layouts/StoreAuthLayout'
import React, { useEffect, useState } from 'react'
import PersonalProfile from './personal'
import StoreProfile from './store/business'
import Verification from './store/verification'
import { useSearchParams } from 'next/navigation'
import Pricing from './store/pricing'
import validationRegisterSchema from '../../../auth/register/validation'
import validationStoreSchema from './storeValidation'
import BusinessType from './businessType'
import Sevices from './services/upload'
import useGeolocation from '@/app/hooks/useGeolocation'
import OtpVerification from '@/app/(pages)/auth/otp-verification/page'
import { SetLocation } from '@/app/(pages)/dashboard/services/setup/component'
import { Box } from '@mui/material'
import MapSelection from './store/map'

export const StoreRegistrationForm = ({
  searchParams,
  page,
  referrer,
  stage,
  setStage,
}) => {
  const { coordinates } = useGeolocation()
  console.log(coordinates)
  const [readyToNext, showAllError] = useState(false)

  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    state: '',
    phoneNumber: '',
    businessEmail: '',
    businessName: '',
    businessType: '',
    about_store: '',
    city: '',
    address: '',
    state: '',
    category: '',
    about: '',
  })

  const [storeValues, setStoreValues] = useState({
    businessEmail: '',
    businessName: '',
    businessType: '',
    about_store: '',
    city: '',
    address: '',
    state: '',
    category: '',
    coordinates: {
      type: 'Point',
      coordinates: [coordinates.latitude || 0, coordinates.longitude || 0],
    },
    referrer,
  })

  const BusinessProfile =
    storeValues.businessType === 'services' ? Sevices : StoreProfile

  const handleStoreChange = (prop) => (event) => {
    console.log(event, event?.target?.value)
    setStoreValues({ ...storeValues, [prop]: event?.target?.value })
  }
  const [userValues, setUserValues] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    state: '',
    phoneNumber: '',
  })
  const [confPass, setConfPass] = useState('')

  const handleUserChange = (prop) => (event) => {
    setUserValues({ ...userValues, [prop]: event.target.value })
  }

  useEffect(() => {
    validationRegisterSchema
      .validate(userValues, { abortEarly: false })
      .then(() => {
        setErrors({})
      })
      .catch((validationErrors) => {
        const newErrors = validationErrors.inner.reduce((acc, error) => {
          acc[error.path] = error.message
          return acc
        }, {})
        setErrors(newErrors)
      })
  }, [userValues])

  // console.log(validationStoreSchema.validate(storeValues))
  useEffect(() => {
    validationStoreSchema
      .validate(storeValues, { abortEarly: false })
      .then(() => {
        setErrors({})
      })
      .catch((validationErrors) => {
        const newErrors = validationErrors.inner.reduce((acc, error) => {
          acc[error.path] = error.message
          return acc
        }, {})
        setErrors(newErrors)
      })
  }, [storeValues])

  const pages = {
    0: (
      <PersonalProfile
        errors={errors}
        handleUserChange={handleUserChange}
        setStage={setStage}
        values={userValues}
        setUserValues={setUserValues}
        confPas={confPass}
        setConfPass={setConfPass}
        readyToNext={readyToNext}
        handleStoreChange={handleStoreChange}
        setStoreValues={setStoreValues}
        storeValues={storeValues}
      />
    ),
    // type: (
    //   <BusinessType
    //     setStage={setStage}
    //     values={storeValues}
    //     setStoreValues={setStoreValues}
    //   />
    // ),
    // 10: (
    //   <BusinessProfile
    //     errors={errors}
    //     setStage={setStage}
    //     handleStoreChange={handleStoreChange}
    //     values={storeValues}
    //     userValues={userValues}
    //     setStoreValues={setStoreValues}
    //   />
    // ),
    1: (
      <OtpVerification
        setStage={setStage}
        email={userValues.email}
        account="business"
        callback={(done) => setStage(done ? 2 : 0)}
      />
    ),
    2: (
      // <Pricing
      //   setStage={setStage}
      //   userValues={userValues}
      //   storeValues={storeValues}
      // />
      <MapSelection
        setStage={setStage}
        userValues={userValues}
        storeValues={storeValues}
      />
    ),
  }
  console.log(readyToNext)
  return pages[stage]
   
}

const RegisterStore = () => {
    const searchParams = useSearchParams()
    const referrer = searchParams.get('ref')
    const page = searchParams.get('p')
    const [stage, setStage] = useState(parseInt(page) || 0)
  return (
    <StoreAuthLayout
      title="Create Business Account"
      stage={stage}
      setStage={setStage}
      noNote
    >
      <StoreRegistrationForm
        stage={stage}
        setStage={setStage}
        page={page}
        referrer={referrer}
      />
    </StoreAuthLayout>
  )
}

export default RegisterStore
