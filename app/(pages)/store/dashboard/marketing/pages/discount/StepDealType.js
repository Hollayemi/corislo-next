// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { 
  Box,
Grid,
MenuItem,
TextField,
InputLabel,
FormControl,
OutlinedInput,
FormHelperText,
Select,
 } from '@mui/material'

import { styled, useTheme } from '@mui/material/styles'
// ** Custom Components Imports
import CustomChip from '@/app/components/chip'
import CustomRadioIcons from '@/app/components/cards/radioPick'

const data = [
  {
    isSelected: true,
    value: "discount",
    title: "Discount",
    content:
      "Create a discoun which offer uses some % off (i.e 5% OFF) on total.",
  },
  {
    value: "flash-sale",
    title: "Flash Sale",
    content:
      "Create a flash sale which offer big % $ off (i.e $5 OFF) for a stipulated time.",
  },
];
const regionArray = ['Nigeria',]

const ImgWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 4, 0, 4)
  },
  [theme.breakpoints.up('sm')]: {
    height: 250,
    padding: theme.spacing(5, 5, 0, 5)
  },
  '& img': {
    height: 'auto',
    maxWidth: '100%'
  }
}))

const StepDealType = ({ campaignData, setCampaignData, formHandler }) => {
  const initialIconSelected = data.filter((item) => item.isSelected)[
    data.filter((item) => item.isSelected).length - 1
  ].value;

  // ** Hook
  const theme = useTheme();

  const icons = [
    {
      icon: "tabler:discount-2",
      iconProps: {
        fontSize: "2rem",
        style: { marginBottom: 4 },
        color: theme.palette.text.secondary,
      },
    },
    {
      icon: "tabler:jetpack",
      iconProps: {
        fontSize: "2rem",
        style: { marginBottom: 4 },
        color: theme.palette.text.secondary,
      },
    },
    {
      icon: "tabler:diamond",
      iconProps: {
        fontSize: "2rem",
        style: { marginBottom: 4 },
        color: theme.palette.text.secondary,
      },
    },
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    
    setCampaignData((prev) => {
      return {
        ...prev,
        region: typeof value === "string" ? value.split(",") : value,
      };
    });
  };

  const handleRadioChange = (prop) => {
    console.log(prop);
    if (typeof prop === "string") {
      setCampaignData((prev) => {
        return { ...prev, campaignType: prop };
      });
    } else {
      setCampaignData((prev) => {
        return { ...prev, campaignType: "" };
      });
    }
  };

  return (
    <Grid container spacing={3} className="">
      {/* <Grid item xs={12}>
        <ImgWrapper>
          <img
            width={400}
            alt="illustration"
            src={`/images/misc/discount.png`}
          />
        </ImgWrapper>
      </Grid> */}
      <Box className="flex justify-between md:justify-evenly my-2">
        {data.map((item, index) => (
          <CustomRadioIcons
            key={index}
            data={data[index]}
            icon={icons[index].icon}
            selected={campaignData.campaignType}
            name="custom-radios-deal"
            gridProps={{ sm: 4, xs: 12 }}
            handleChange={handleRadioChange}
            iconProps={icons[index].iconProps}
          />
        ))}
      </Box>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <TextField
            type="number"
            value={campaignData.discount}
            label="Discount"
            placeholder="25"
            onChange={formHandler("discount")}
          />
          <FormHelperText>
            Enter the discount percentage. 10 = 10%
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="select-region">Region</InputLabel>
          <Select
            multiple
            value={campaignData.region}
            labelId="select-region"
            onChange={handleChange}
            input={<OutlinedInput label="Region" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {selected.map((value) => (
                  <CustomChip rounded key={value} label={value} skin="light" />
                ))}
              </Box>
            )}
          >
            {regionArray.map((reg) => (
              <MenuItem key={reg} value={reg}>
                {reg}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            Select applicable regions for the deal.
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default StepDealType
