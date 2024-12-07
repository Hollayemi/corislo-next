'use client'
import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/navigation'

export default function MyPagination({
  totalNumber,
  currentPage,
  searchParams,
  limit = 20,
  query,
}) {
  const router = useRouter()
  const currentSearchParams = new URLSearchParams(router.asPath)
  const newPage = (_, page) => {
    for (const para of Object.keys(searchParams)) {
      const value = searchParams[para]
      currentSearchParams.set(para, value)
    }
    currentSearchParams.set(query, page)
    // const updatedUrl = `${
    //   window.location.pathname
    // }?${currentSearchParams.toString()}`;

    router.push(`?${currentSearchParams.toString()}`)
  }
  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(totalNumber / limit)}
        color="primary"
        variant="outlined"
        defaultPage={parseInt(currentPage)}
        onChange={newPage}
        shape="rounded"
      />
    </Stack>
  )
}
