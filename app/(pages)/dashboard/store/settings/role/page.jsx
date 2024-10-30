'use client'
import {
  Box,
  TextField,
} from '@mui/material'

import StoreLeftSideBar from '@/app/components/view/store/LeftSideBar'
import { settingsInnerList } from '@/app/data/store/innerList'
import { settingsBreadCrumb } from '../components'
import { useEffect, useState } from 'react'
import { defaultCol } from './role.components'
import useSWR from 'swr'
import { useDispatch } from 'react-redux'
import {
  createRole,
} from '@/app/redux/state/slices/shop/permission'
import RolesComponent from '.'

const RoleInput = ({ setRoleTitle, roleTitle }) => {
  return (
    <Box className="">
      <TextField
        placeholder="Role title"
        size="small"
        className="w-80"
        value={roleTitle}
        onChange={(e) => setRoleTitle(e.target.value)}
      />
    </Box>
  )
}

const Roles = ({ params }) => {
  const dispatch = useDispatch()
  const path = { ...params, sidebar: 'settings', sublist: 'role' }
  const { data, isLoading } = useSWR('/store/roles')
  const config = data?.data || {}

  const [roleTitle, setRoleTitle] = useState('')
  const [dialogInfo, updateDialogInfo] = useState({
    open: false,
    title: 'Create Role',
    acceptFunctionText: 'Create',
    acceptFunction: () => {
      createRole({ title: roleTitle }, dispatch)
    },
  })

  useEffect(() => {
    updateDialogInfo({
      ...dialogInfo,
      acceptFunction: () => {
        createRole({ title: roleTitle }, dispatch)
      },
    })
  }, [roleTitle])

  let roles =
    config?.roles?.map((x) => {
      return {
        id: x.toLowerCase().split(' ').join('_'),
        label: x,
        minWidth: 80,
      }
    }) || []

  roles = [...defaultCol, ...roles]

  return (
    <StoreLeftSideBar
      path={path}
      permission="view_roles"
      subListBar={false}
      InnerList={settingsInnerList}
      dialogInfo={dialogInfo}
      updateDialogInfo={updateDialogInfo}
      dialogComponent={
        <RoleInput setRoleTitle={setRoleTitle} roleTitle={roleTitle} />
      }
      crumb={[
        ...settingsBreadCrumb,
        { text: 'Role & Permission', link: 'role' },
      ]}
    >
      <RolesComponent params={params} />
    </StoreLeftSideBar>
  )
}

export default Roles
