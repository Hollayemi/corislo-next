'use client'

import { SecurityTypeCard } from '@/app/components/cards/homeCards'
import IconifyIcon from '@/app/components/icon'
import HomeWrapper from '@/app/components/view/home'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'

import { faqData } from '@/app/data/home/faq'
import { useState } from 'react'

const SupportPage = () => {
  const [showing, setShowing] = useState(
    faqData[0]?.subtitles[0]?.discussion || ''
  )
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
  })

  const handleChange = (prop) => (event) => {
    setValues((prev) => {
      return { ...prev, [prop]: event.target.value }
    })
  }

  const IconText = ({ icon, text }) => {
    return (
      <Box className="flex items-center !mb-3">
        <IconifyIcon icon={icon} className="text-[#2C337C] text-sm" />
        <Typography variant="caption" className="!ml-2">
          {text}
        </Typography>
      </Box>
    )
  }

  return (
    <HomeWrapper customersReview={false}>
      <Box className="flex justify-center !mt-16 mb-10">
        <Box className="px-2 md:w-3/5 flex flex-col items-center">
          <Typography variant="body2" className="!font-black !text-3xl !mb-4">
            Help Centre
          </Typography>
          <Typography variant="caption" className="!text-[13px] text-center">
            Our support team is committed to making your Corisio experience
            smooth and hassle-free. Whether you're a buyer looking for a
            specific product or a seller aiming to optimize your storefront,
            we've got your back. Here's how we can assist you:
          </Typography>
        </Box>
      </Box>

      <Box className="flex justify-center px-2 w-full">
        <Box className="flex flex-col md:flex-row">
          <Box className="flex items-center w-full">
            <TextField
              placeholder="Type Keyword"
              sx={{ border: 0 }}
              onChange={() => {}}
              size="small"
              className="bg-gray-200 w-8/12 md:w-60 outline-0"
            />
            <Select
              className="px-1 md:px-3 rounded-md bg-gray-200 !mx-1 md:!mx-3 border-1 !w-4/12 !h-10"
              style={{ height: 55 }}
              onChange={() => {}}
              data-placeholder="Size"
            >
              <MenuItem value="Account & Registration">
                Account & Registration
              </MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Agent">Agent</MenuItem>
              <MenuItem value="Store">Store Owner</MenuItem>
            </Select>
          </Box>
          <Button
            variant="contained"
            className="!text-[10px] h-10  !mt-3 md:!mt-0 md:w-36 !shadow-none"
          >
            Find Query
          </Button>
        </Box>
      </Box>

      <Box className="flex flex-col md:flex-row justify-center items-center">
        <SecurityTypeCard
          title="Fraud and Protection"
          image="fingerprint"
          caption="We are commited to ensuring the security and integrity of our website and protecting our users."
        />
        <SecurityTypeCard
          title="Managing my Account"
          image="lock"
          caption="Protecting your privacy and ensuring the security of your personal information is of utmost importance to us."
        />
        <SecurityTypeCard
          title="Fraud and Protection"
          image="safe"
          caption="We are here to provide you with the  information and assistance you need to effectively manage your account."
        />
      </Box>

      <Box className="flex flex-col md:flex-row justify-center mt-10">
        <Box className=" px-3 md:w-10/12 flex flex-col md:flex-row items-start">
          <Box className=" w-full md:w-60 !pr-3">
            {faqData.map((item, i) => {
              return (
                <Accordion
                  defaultExpanded
                  key={i}
                  className="!bg-transparent !shadow-none"
                >
                  <AccordionSummary
                    className="!border-none !outline-none !h-8 !p-0 !min-h-10"
                    expandIcon={
                      <IconifyIcon
                        fontSize="1.25rem"
                        icon="tabler:chevron-down"
                      />
                    }
                  >
                    <Typography className="!text-[13px]">
                      {item.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="!min-h-14 !pb-0">
                    {item.subtitles.map((each, i) => (
                      <Box key={i} onClick={() => setShowing(each.discussion)}>
                        <Typography className="!text-[12px] h-6 cursor-pointer">
                          {each.topic}
                        </Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )
            })}
          </Box>
          <Box className="w-full md:w-3/5 px-6">{showing}</Box>
        </Box>
      </Box>
      <br />
      <br />
      <br />
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          md={6}
          className="flex justify-center md:justify-start"
        >
          <Box className="!mb-6">
            <Typography
              variant="body1"
              className="text-[#2C337C] !text-2xl md:!text-[30px] !font-bold"
            >
              Contact Us
            </Typography>
            <Typography
              variant="body1"
              className="!font-bold !mt-2 !text-xl md:!text-[35px]"
            >
              How can we help you?
            </Typography>
            <Typography variant="caption" className="!mt:4 !text-[13px]">
              Please Kindly Fill the form or drop an email
            </Typography>

            <Box className="mt-6 md:pl-4">
              <IconText icon="tabler:phone" text="+1 719-377-2610" />
              <IconText icon="tabler:mail" text="support@corislo.com" />
              <IconText
                icon="tabler:map-2"
                text="Block 416, flat 23, Jakande estate, Isolo, Lagos State"
              />

              <Box className="w-80 h-40 bg-gray-300 rounded-xl"></Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className="flex justify-center">
          <Box className="!w-[400px] p-8 rounded-md md:float-right">
            <input
              size="small"
              value={values.name}
              placeholder="Full Name"
              className="!mb-4 w-full px-3 h-10 rounded-md focus:outline-none focus:ring focus:ring-[#2C337C] !bg-white"
              onChange={handleChange('name')}
              fullWidth
            />
            <input
              size="small"
              value={values.email}
              placeholder="Email Address"
              className="!mb-4 w-full px-3 h-10 rounded-md focus:outline-none focus:ring focus:ring-[#2C337C] !bg-white"
              fullWidth
              onChange={handleChange('email')}
            />
            <input
              size="small"
              value={values.subject}
              placeholder="Subject"
              className="!mb-4 w-full px-3 h-10 rounded-md focus:outline-none focus:ring focus:ring-[#2C337C] !bg-white"
              fullWidth
              onChange={handleChange('subject')}
            />
            <textarea
              size="small"
              placeholder="Message"
              multiline
              onChange={handleChange('message')}
              rows={5}
              className="!mb-4 w-full px-3 py-2 h-28 rounded-md focus:outline-none focus:ring focus:ring-[#2C337C] !bg-white"
              fullWidth
            ></textarea>
            <Button
              variant="contained"
              className="!rounded-full !h-12"
              fullWidth
              onClick={() => {}}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </HomeWrapper>
  )
}

export default SupportPage
