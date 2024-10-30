'use client'
import * as React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import FolderIcon from '@mui/icons-material/Folder'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useRouter } from 'next/navigation'
import { Box } from '@mui/material'
import IconifyIcon from '../../icon'
import { CircleLoader } from '../../cards/loader'
import { useStoreData } from '@/app/hooks/useData'

const OnlyContents = ({ each, path }) => {
  const onSubList = !path.sublist ? '' : `/${path.sublist}`
  const listPath = `/dashboard/store/${path.sidebar}${each.path}`
  return (
    <BottomNavigationAction
      label={each.name}
      value={listPath}
      icon={<LocationOnIcon />}
    />
  )
}

export default function BottomBar({ path, InnerList }) {
  const onSubList = !path.sublist ? '' : `/${path.sublist}`
  const [value, setValue] = React.useState('recents')
  const router = useRouter()
  const {
    staffInfo: { permissions },
  } = useStoreData()
  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue)
    router.push(newValue)
  }

  return (
    <BottomNavigation
      className="w-full border-t"
      value={value}
      onChange={handleChange}
    >
      {InnerList?.content?.map((each, index) => {
        const listPath = `/dashboard/store/${path.sidebar}${each.path}`
        return permissions ? (
          each.short !== 'escape' && permissions[each.permission] !== false && (
            <BottomNavigationAction
              key={index}
              label={<h5 className="text-[10px]">{each.short}</h5>}
              value={listPath}
              icon={<IconifyIcon icon={each.icon} />}
              className={`!px-0 w-auto !min-w-5 ${
                onSubList === each.path && '!text-blue-800'
              }`}
            />
          )
        ) : (
          <BottomNavigationAction
            key={index}
            label=""
            value={listPath}
            icon={<CircleLoader />}
            className={`!px-0 w-auto !min-w-5 ${
              onSubList === each.path && '!text-blue-800'
            }`}
          />
        )
      })}
    </BottomNavigation>
  )
}
