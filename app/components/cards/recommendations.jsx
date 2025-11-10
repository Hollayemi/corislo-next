'use client'
import {
  Box,
  ClickAwayListener,
  styled,
  Tooltip,
  Typography,
} from '@mui/material'
import IconifyIcon from '../icon'
import { useState } from 'react'

export const Promoted = () => {
  const [open, setOpen] = useState(false)
  const handleTooltipClose = () => {
    setOpen(false)
  }
  const WhiteTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .MuiTooltip-tooltip`]: {
      backgroundColor: 'white',
      color: 'black',
      border: '1px solid #ccc',
      boxShadow: '0px 12px 22px rgba(0, 0, 0, 0.1)',
    },
    '& .MuiTooltip-arrow': {
      color: 'white',
    },
  })
  const message = (
    <Box className="bg-white relative">
      <IconifyIcon
        icon="tabler:x"
        onClick={() => setOpen(false)}
        className="absolute mt-1 right-2 !text-[15px] cursor-pointer hover:text-red-500"
      />
      <Typography
        variant="body2"
        className="!text-gray-900 !font-bold !text-[13px] !leading-6 !mb-1.5"
      >
        Promoted
      </Typography>
      <Typography
        variant="body2"
        className="!text-gray-700 !text-[12px] !leading-5 !mr-1"
      >
        This partner's profile ranks higher in search results because they have
        purchased an additional paid service from Corisio to assist in acquiring
        new clients.
      </Typography>
    </Box>
  )
  return (
    <WhiteTooltip
      open={open}
      arrow
      disableFocusListener
      disableHoverListener
      disableTouchListener
      PopperProps={{
        disablePortal: true,
      }}
      onClose={handleTooltipClose}
      title={message}
    >
      <Box
        className="flex items-center pr-3 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Typography
          variant="body2"
          className="!text-gray-700 !text-[12px] !leading- !mr-1"
        >
          Promoted
        </Typography>
        <IconifyIcon icon="tabler:info-circle" className="!text-[12px]" />
      </Box>
    </WhiteTooltip>
  )
}

export const Recommend = () => {
  const [open, setOpen] = useState(false)
  const handleTooltipClose = () => {
    setOpen(false)
  }
  const WhiteTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .MuiTooltip-tooltip`]: {
      backgroundColor: 'white',
      color: 'black',
      border: '1px solid #ccc',
      boxShadow: '0px 12px 22px rgba(0, 0, 0, 0.1)',
    },
    '& .MuiTooltip-arrow': {
      color: 'white',
    },
  })
  const message = (
    <Box className="bg-white relative">
      <IconifyIcon
        icon="tabler:x"
        onClick={() => setOpen(false)}
        className="absolute mt-1 right-2 !text-[15px] cursor-pointer hover:text-red-500"
      />
      <Typography
        variant="body2"
        className="!text-gray-900 !font-bold !text-[13px] !leading-6 !mb-1.5"
      >
        Corisio Recommended
      </Typography>
      <Typography
        variant="body2"
        className="!text-gray-700 !text-[12px] !leading-5 !mr-1"
      >
        The Corisio Recommended badge is available to partners who have:
        <p className='!-mt-4'>
          <br />i. purchased an additional paid service from Corisio to assist in
        </p>
        acquiring new clients.
        <p className='!-mt-4'><br />ii. met certain requirements such as having a high average rating.</p>
      </Typography>
    </Box>
  )
  return (
    <WhiteTooltip
      open={open}
      arrow
      disableFocusListener
      disableHoverListener
      disableTouchListener
      PopperProps={{
        disablePortal: true,
      }}
      onClose={handleTooltipClose}
      title={message}
    >
      <Box
        className="flex items-center pr-3 cursor-pointer w-fit"
        onClick={() => setOpen(true)}
      >
        <Box className="flex items-center mr-1 !px-2 py-0.5 border-2 rounded-full">
          <IconifyIcon
            icon="tabler:thumb-up-filled"
            className="text-[15px] mr-3"
          />
          <Typography
            variant="body2"
            className="!text-gray-700 !text-[12px] !leading- !mr-1 !font-bold"
          >
            Corisio Recommended
          </Typography>
        </Box>
        <IconifyIcon icon="tabler:info-circle" className="!text-[12px]" />
      </Box>
    </WhiteTooltip>
  )
}
