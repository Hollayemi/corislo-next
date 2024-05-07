"use client";
// ** React Imports
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { addNewCampaign } from "@/app/redux/state/slices/shop/campaign";
import { useDispatch } from "react-redux";
// ** MUI Imports
import {
  Box,
  Card,
  Avatar,
  Button,
  StepLabel,
  Typography,
  CardContent,
} from "@mui/material";

import MuiStep from "@mui/material/Step";
import MuiStepper from "@mui/material/Stepper";

// ** Icon Imports
import Icon from "@/app/components/icon";

// ** Custom Components Imports
import CustomAvatar from "@/app/components/avatar";

// ** Styled Components
import StepperWrapper from "@/app/components/stepper";

// ** Step Components
import FlashSalePicture from "./FlashSalePicture";
import StepDealType from "./StepDealType";
import StepReview from "./StepReview";
import StepProducts from "./StepProducts";
import StepDealDetails from "./StepDealDetails";

// ** Util Import
import { hexToRGBA } from "@/app/utils/hex-to-rgba";

const allSteps = [
  {
    title: "Campaign Type",
    icon: "tabler:speakerphone",
    subtitle: "Choose type of campaign",
  },
  {
    icon: "tabler:id",
    title: "Campaign Details",
    subtitle: "Provide campaign details",
  },
  {
    title: "Select Products",
    icon: "tabler:credit-card",
    subtitle: "Search for product",
  },
  {
    title: "Flyer",
    icon: "tabler:credit-card",
    subtitle: "Flash sale flyer",
  },
  {
    icon: "tabler:checkbox",
    subtitle: "Launch a campaign",
    title: "Review & Complete",
  },
];

const Stepper = styled(MuiStepper)(({ theme }) => ({
  height: "100%",
  minWidth: "15rem",
  "& .MuiStep-root:not(:last-of-type) .MuiStepLabel-root": {
    paddingBottom: theme.spacing(5),
  },
  [theme.breakpoints.down("md")]: {
    minWidth: 0,
  },
}));

const StepperHeaderContainer = styled(CardContent)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("md")]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const Step = styled(MuiStep)(({ theme }) => ({
  "& .MuiStepLabel-root": {
    paddingTop: 0,
  },
  "&:not(:last-of-type) .MuiStepLabel-root": {
    paddingBottom: theme.spacing(6),
  },
  "&:last-of-type .MuiStepLabel-root": {
    paddingBottom: 0,
  },
  "& .MuiStepLabel-iconContainer": {
    display: "none",
  },
  "& .step-subtitle": {
    color: `${theme.palette.text.disabled} !important`,
  },
  "& + svg": {
    color: theme.palette.text.disabled,
  },
  "&.Mui-completed .step-title": {
    color: theme.palette.text.disabled,
  },
  "& .MuiStepLabel-label": {
    cursor: "pointer",
  },
}));

const DiscountWizard = () => {
  // ** States
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [campaignData, setCampaignData] = useState({
    campaignType: "discount",
    discount: 0,
    region: [],
    products: [],
    title: "",
    code: "",
    notification: "push-notification",
    description: "",
    startDate: null,
    endDate: null,
    usageLimit: "",
    status: "",
    minimumOrder: 1,
  });

  console.log(campaignData);

  const steps =
    campaignData.campaignType === "discount"
      ? allSteps.filter((x) => x.title !== "Flyer")
      : allSteps;
  const formHandler =
    (prop) =>
    ({ target }) => {
      setCampaignData((prev) => {
        return { ...prev, [prop]: target.value };
      });
    };
  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <StepDealType
            setCampaignData={setCampaignData}
            formHandler={formHandler}
            campaignData={campaignData}
          />
        );
      case 1:
        return (
          <StepDealDetails
            setCampaignData={setCampaignData}
            formHandler={formHandler}
            campaignData={campaignData}
          />
        );
      case 2:
        return (
          <StepProducts
            setCampaignData={setCampaignData}
            formHandler={formHandler}
            campaignData={campaignData}
          />
        );

      case 3:
        return campaignData.campaignType === "discount" ? (
          <StepReview campaignData={campaignData} />
        ) : (
          <FlashSalePicture setCampaignData={setCampaignData} />
        );
      case 4:
        return <StepReview campaignData={campaignData} />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    return getStepContent(activeStep);
  };

  const renderFooter = () => {
    const stepCondition = activeStep === steps.length - 1;

    return (
      <Box sx={{ mt: 6, display: "flex", justifyContent: "space-between" }}>
        <Button
          color="secondary"
          variant="outlined"
          onClick={handlePrev}
          disabled={activeStep === 0}
          startIcon={<Icon icon="tabler:chevron-left" />}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color={stepCondition ? "success" : "primary"}
          {...(!stepCondition
            ? { endIcon: <Icon icon="tabler:chevron-right" /> }
            : {})}
          onClick={() =>
            stepCondition
              ? addNewCampaign(campaignData, dispatch)
              : handleNext()
          }
        >
          {stepCondition ? "Submit" : "Next"}
        </Button>
      </Box>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
      <StepperHeaderContainer>
        <StepperWrapper sx={{ height: "100%" }}>
          <Stepper
            connector={<></>}
            orientation="vertical"
            activeStep={activeStep}
            sx={{ height: "100%", minWidth: "15rem" }}
          >
            {steps.map((step, index) => {
              const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar;

              return (
                <Step
                  key={index}
                  onClick={() => setActiveStep(index)}
                  sx={{ "&.Mui-completed + svg": { color: "primary.main" } }}
                >
                  <StepLabel>
                    <div className="step-label">
                      <RenderAvatar
                        variant="rounded"
                        {...(activeStep >= index && { skin: "light" })}
                        {...(activeStep === index && { skin: "filled" })}
                        {...(activeStep >= index && { color: "primary" })}
                        sx={{
                          ...(activeStep === index && {
                            boxShadow: (theme) => theme.shadows[3],
                          }),
                          ...(activeStep > index && {
                            color: (theme) =>
                              hexToRGBA(theme.palette.primary.main, 0.4),
                          }),
                        }}
                      >
                        <Icon icon={step.icon} />
                      </RenderAvatar>
                      <div>
                        <Typography className="step-title">
                          {step.title}
                        </Typography>
                        <Typography className="step-subtitle">
                          {step.subtitle}
                        </Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </StepperWrapper>
      </StepperHeaderContainer>
      <CardContent
        sx={{ pt: (theme) => `${theme.spacing(6)} !important` }}
        className="!w-full"
      >
        {renderContent()}
        {renderFooter()}
      </CardContent>
    </Box>
  );
};

export default DiscountWizard;
