import React from 'react'
import { motion } from 'framer-motion'
import IconifyIcon from '@/app/components/icon'



const RemoveFromCartModal= ({
  isOpen,
  onClose,
  onSaveForLater,
  onRemove,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Remove from cart</h2>
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
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onSaveForLater}
            className="flex items-center justify-center gap-2 border-2 border-blue-800 text-blue-800 py-2 px-4 rounded-lg w-full hover:bg-blue-50 transition"
          >
            <IconifyIcon icon="tabler:heart" /> Save for later
          </button>
          <button
            onClick={onRemove}
            className="flex items-center justify-center gap-2 bg-blue-800 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition"
          >
            <IconifyIcon icon="tabler:trash" /> Remove Item
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default RemoveFromCartModal
