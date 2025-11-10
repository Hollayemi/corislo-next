'use client'
import { useState } from 'react'
import { CancelOutlined } from '@mui/icons-material'
import { Box, TextField, Typography } from '@mui/material'
import React from 'react'
import { searchNavigations } from '../store/screens'
import Link from 'next/link'
import IconifyIcon from '@/app/components/icon'

function deepFilter(data, searchTerm) {
  function search(nodes) {
    console.log(nodes)
    let results = []

    for (const node of nodes) {
      // Recursively search in children
      let filteredChildren = []
      if (node.children && node.children.length > 0) {
        filteredChildren = search(node.children)
      }

      // Check if the current node or any of its children match the search term
      if (
        node.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        filteredChildren.length > 0
      ) {
        // Include the current node with the filtered children
        results.push({
          ...node,
          children: filteredChildren,
        })
      }
    }

    return results
  }

  return search(data)
}

const AppSearch = ({ showOverlay }) => {
  const [search, setSearch] = useState('')
  const result = deepFilter([searchNavigations], search)
  return (
    <Box className="flex w-full !px-1 justify-center">
      <Box className="w-full md:w-[550px] h-[600px] md:h-[500px] mt-20 relative bg-white rounded-xl md:mr-10 flex flex-col">
        <Box className="flex justify-between items-center !px-4 h-14 border-b !w-full flex-shrink-0">
          <Typography variant="body2" className="!font-bold">
            Search
          </Typography>
          <Box onClick={showOverlay}>
            <CancelOutlined />
          </Box>
        </Box>
        <Box className="flex-grow-1 h-[500px] md:max-h-[450px] mt-4 w-full !overflow-auto overflowStyle">
          <Box className="w-full flex justify-center">
            <TextField
              sx={{ mb: 0.5 }}
              className="w-5/6"
              size="small"
              focused
              id="outlined-basic"
              onChange={(e) => setSearch(e.target.value)}
              inputProps={{ className: 'h-10' }}
              placeholder="Search."
            />
          </Box>
          <Box className="!px-3">
            {result.map((each, index) =>
              search ? (
                <LinkComponent
                  each={each}
                  key={index}
                  showOverlay={showOverlay}
                />
              ) : (
                <FirstBatch
                  each={each.children}
                  key={index}
                  showOverlay={showOverlay}
                />
              )
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AppSearch

const LinkComponent = ({ each, showOverlay }) => {
  return (
    each.children.length > 0 &&
    each.children.map((item, xx) => (
      <Box
        key={xx}
        className={`!pl-8 ${item.topLevel ? ' mb-6 border-b rounded-md' : 'mt-1'
          }`}
        onClick={showOverlay}
      >
        <Link
          href={`/dashboard/store${item.path}`}
          className="hover:!text-blue-400"
        >
          <Box className="flex items-center h-12 w-full">
            {!item.topLevel && (
              <IconifyIcon
                icon="tabler:arrow-badge-right-filled"
                className="mr-3"
              />
            )}
            <Box
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: 'inherit',
                fontSize: '2px',
              }}
            >
              {item.icon}
            </Box>

            <Typography variant="h5" className="" style={{ fontSize: '13px' }}>
              {item.name}
            </Typography>
          </Box>
        </Link>
        <LinkComponent each={item} />
      </Box>
    ))
  )
}

const FirstBatch = ({ each, showOverlay }) => {
  return (
    <Box className="flex justify-center flex-wrap">
      {each.map((item, xx) => {
        return (
          <Link
            href={`/dashboard/store${item.path}`}
            className="w-5/12 !px-2 md:w-3/12 border border-gray-400 rounded-md m-2  hover:!text-blue-700 hover:border-blue-600 transition-all duration-300 "
            key={xx}
            onClick={showOverlay}
          >
            <Box className=" h-32 flex flex-col items-center p-3 justify-center">
              {item.icon}
              <Typography
                variant="body2"
                className="!font-bold !text-center !mt-2"
              >
                {item.name}
              </Typography>
            </Box>
          </Link>
        )
      })}
      ;
    </Box>
  )
}
