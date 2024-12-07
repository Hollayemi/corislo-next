"use client"
const { Box, Typography } = require('@mui/material')

export const GridLayout = ({ title, subtitle, comp, className="md:mb-8", alignStart }) => {
  return (
    <Box className={`flex flex-col md:flex-row items-start mb-1 ${className}`}>
      <Box className="w-1/5 min-w-60">
        <Typography variant="body2" className={`!text-[14px] !font-bold ${ !alignStart && "!mt-3"}`}>
          {title}
        </Typography>
        {subtitle && <Typography variant="caption" className="!text-[12px] !pb-3 md:!mb-0">
          {subtitle}
        </Typography>}
      </Box>
      <Box className=" w-full md:w-3/5 md:pl-5">{comp}</Box>
    </Box>
  )
}
