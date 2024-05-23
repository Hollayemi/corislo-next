"use client";
// ** React Imports
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
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
import Announcements from "./announcements";
import NewAnnouncement from "./newAnnouncement";

// ** Util Import
import { hexToRGBA } from "@/app/utils/hex-to-rgba";

const steps = [
  {
    title: "New Announcement",
    icon: "tabler:speakerphone",
    subtitle: "Choose type of campaign",
  },
  {
    icon: "tabler:id",
    title: "Announcements",
    subtitle: "Provide campaign details",
  }
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

const AnnouncementWizard = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    brief: "",
    notification: "push-notification",
    url: "",
    startDate: null,
    endDate: null,
    status: "",
  });

  console.log(formData);

  const formHandler =
    (prop) =>
    ({ target }) => {
      setFormData((prev) => {
        return { ...prev, [prop]: target.value };
      });
    };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <NewAnnouncement
            setFormData={setFormData}
            formHandler={formHandler}
            formData={formData}
          />
        );
      case 1:
        return (
          <Announcements
            setFormData={setFormData}
            formHandler={formHandler}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    return getStepContent(activeStep);
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
      </CardContent>
    </Box>
  );
};

export default AnnouncementWizard;
