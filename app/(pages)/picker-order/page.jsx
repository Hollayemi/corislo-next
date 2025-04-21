import { Box } from '@mui/material'
import React from 'react'
import OrderDetails from '../order/[detail]/page'

const PickerOrder = ({ searchParams }) => {
  return <OrderDetails params={{ detail: searchParams.order }} forPicker />
}

export default PickerOrder
