"use client";

import StoreAuthLayout from '@/app/components/layouts/StoreAuthLayout'
import React, { useState } from 'react'
import PersonalProfile from './personal';
import BusinessProfile from './business';
import Verification from './verification';
import Pricing from './pricing';

const RegisterStore = () => {
    const [stage, setStage] = useState(3)
    const pages = {
      0: <PersonalProfile />,
      1: <BusinessProfile />,
      2: <Verification />,
      3: <Pricing />,
    };
  return (
    <StoreAuthLayout
      title="Create Seller Account"
      stage={stage}
      setStage={setStage}
    >
      {pages[stage]}
    </StoreAuthLayout>
  );
}

export default RegisterStore