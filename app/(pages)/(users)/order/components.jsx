import React from 'react'
import { motion } from 'framer-motion'
import IconifyIcon from '@/app/components/icon'
import { OrderActionBtn, statusActionName } from './[detail]/components'



const OrderActionConfirmation = ({
  isOpen,
  onClose,
  data,
  refetchOrder
}) => {
  console.log({ data })
  if (!isOpen) return null
  const { name, to } = statusActionName[data?.to?.toLowerCase()] || {};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 z-50"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold capitalize">{name} order</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Message */}
        <p className="text-gray-700 mb-6">
          Do you really want to remove this item from cart?
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="!rounded-full !text-[14px] border !w-32 !min-w-32 !shadow-none !mt-1"
          >
            Close
          </button>
          <OrderActionBtn
            action={data?.status?.toLowerCase()}
            orderId={data.orderId}
            variant="contained"
            mutate={() => { refetchOrder(); onClose(); }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default OrderActionConfirmation
