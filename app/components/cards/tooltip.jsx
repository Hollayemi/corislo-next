'use client'
import { Box, styled, Tooltip, Typography } from '@mui/material'
import IconifyIcon from '../icon'
import { useState } from 'react'

export const MyTooltip = ({ message, children, placement="right-start" }) => {
 
  const WhiteTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .MuiTooltip-tooltip`]: {
      backgroundColor: '#2C337C',
      color: 'white',
      border: '1px solid #ccc',
      boxShadow: '0px 12px 22px rgba(0, 0, 0, 0.1)',
      //   position: "absolute",
      zIndex: 50000000,
    },
    '& .MuiTooltip-arrow': {
      color: '#2C337C',
    },
  })
  return (
    <WhiteTooltip
      placement={placement}
      arrow
      disableFocusListener
      //   disableHoverListener
      disableTouchListener
      PopperProps={{
        // disablePortal: true,
      }}
      title={message}
    >
      {children}
    </WhiteTooltip>
  )
}
