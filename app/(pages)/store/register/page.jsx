"use client";

import StoreAuthLayout from "@/app/components/layouts/StoreAuthLayout";
import React, { useEffect, useState } from "react";
import PersonalProfile from "./personal";
import BusinessProfile from "./business";
import Verification from "./verification";
import { useSearchParams } from "next/navigation";
import Pricing from "./pricing";
import validationRegisterSchema from "../../auth/register/validation";
import validationStoreSchema from "./storeValidation";

const RegisterStore = () => {
  const [stage, setStage] = useState(1);
  const [readyToNext, showAllError] = useState(false);
    const searchParams = useSearchParams();
    const referrer = searchParams.get("ref");

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    state: "",
    phoneNumber: "",
    businessEmail: "",
    businessName: "",
    businessRegNum: "",
    businessType: "",
    about_store: "",
    city: "",
    address: "",
    state: "",
    category: "",
    about: "",
  });

  const [storeValues, setStoreValues] = useState({
    businessEmail: "",
    businessName: "",
    businessRegNum: "",
    businessType: "",
    about_store: "",
    city: "",
    address: "",
    state: "",
    category: "",
    referrer,
  });
  const handleStoreChange = (prop) => (event) => {
    setStoreValues({ ...storeValues, [prop]: event.target.value });
  };
  const [userValues, setUserValues] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    state: "",
    phoneNumber: "",
  });
  const [confPass, setConfPass] = useState("");

  const handleUserChange = (prop) => (event) => {
    setUserValues({ ...userValues, [prop]: event.target.value });
  };

  useEffect(() => {
    validationRegisterSchema
      .validate(userValues, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch((validationErrors) => {
        const newErrors = validationErrors.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(newErrors);
      });
  }, [userValues]);

  // console.log(validationStoreSchema.validate(storeValues))
  useEffect(() => {
    validationStoreSchema
      .validate(storeValues, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch((validationErrors) => {
        const newErrors = validationErrors.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(newErrors);
      });
  }, [storeValues]);

  const pages = {
    0: (
      <PersonalProfile
        errors={errors}
        handleUserChange={handleUserChange}
        values={userValues}
        confPas={confPass}
        setConfPass={setConfPass}
        readyToNext={readyToNext}
      />
    ),
    1: (
      <BusinessProfile
        errors={errors}
        handleStoreChange={handleStoreChange}
        values={storeValues}
      />
    ),
    2: <Verification />,
    3: <Pricing />,
  };
  console.log(readyToNext)
  return (
    <StoreAuthLayout
      title="Create Seller Account"
      stage={stage}
      setStage={setStage}
      showAllError={showAllError}
      errors={errors}
      userValues={userValues}
      storeValues={storeValues}
    >
      {pages[stage]}
    </StoreAuthLayout>
  );
};

export default RegisterStore;
