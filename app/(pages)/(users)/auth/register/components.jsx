import { useState } from 'react'

const AccountTypeSwitch = ({ onToggle }) => {
  const [isBusiness, setIsBusiness] = useState(false)

  const handleToggle = () => {
    const newValue = !isBusiness
    setIsBusiness(newValue)
    onToggle(newValue ? 'business' : 'personal')
  }

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative w-80 flex items-center">
        {/* Switch track */}
        <div
          className={`w-full h-10 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            isBusiness ? 'bg-[#2C337C]' : 'bg-gray-300'
          }`}
          onClick={handleToggle}
        >
          {/* Switch thumb */}
          <div
            className={`bg-white h-8 w-40 rounded-full shadow-md transform transition-transform duration-300 ${
              isBusiness ? 'translate-x-[152px]' : 'translate-x-0'
            }`}
          />
        </div>

        {/* Labels - positioned absolutely over the track */}
        <span
          className={`absolute w-40 pointer-events-none text-sm text-center font-medium transition-opacity duration-300 ${
            isBusiness ? 'opacity-100 text-white' : 'opacity-100 text-gray-900'
          }`}
        >
          Personal
        </span>
        <span
          className={`absolute pointer-events-none w-40 text-center right-0 text-sm font-medium transition-opacity duration-300 ${
            isBusiness
              ? 'opacity-100 text-[#2C337C]'
              : 'opacity-50 text-gray-900'
          }`}
        >
          Business
        </span>
      </div>
    </div>
  )
}

export default AccountTypeSwitch
