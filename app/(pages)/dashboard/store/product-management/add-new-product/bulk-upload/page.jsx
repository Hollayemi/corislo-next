'use client'
import React, { useState, useEffect } from 'react'
import martApi from '@/app/redux/state/slices/api/baseApi'
import axios from 'axios'

import useSWR from 'swr'
import { productBreadCrumb } from '../../components'
import { SimpleDropDown } from '../components'
import { Box, MenuItem } from '@mui/material'
import dynamic from 'next/dynamic'
import { useStoreData, useUserData } from '@/app/hooks/useData'
import { useDispatch } from 'react-redux'
import { uploadBulkProductsHandler } from '@/app/redux/state/slices/shop/products/bulkUpload'

const BulkProductUpload = ({ params }) => {
  const dispatch = useDispatch()
  // State for form data
  const StoreLeftSideBar = dynamic(
    () => import('@/app/components/view/store/LeftSideBar'),
    {
      ssr: false,
    }
  )
  const { showSnackbar } = useStoreData()
  const [productGroups, setGroups] = useState([])
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    productGroup: '',
    collectionId: '',
    subCollection: '',
    collectionName: '',
    subCollectionName: '',
  })

  const { data: getData } = useSWR('/corisio/category/thread')
  const categories = getData ? getData?.data : [{}]
  const path = {
    ...params,
    sidebar: 'product-management',
    sublist: 'add-new-product',
  }

  // State for file upload
  const [file, setFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState('')
  const [uploadResults, setUploadResults] = useState({})

  // Fetch dropdown options on component mount
  let fromCollection = categories.filter((x) => x._id === formData.category)[0]
  useEffect(() => {
    fromCollection = categories.filter((x) => x.category)[0]
  }, [])

  console.log(file)
  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files)
  }

  // Replace the handleSubmit function in your React component
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      alert('Please select an Excel file to upload')
      return
    }

    // Convert file to base64
    const reader = new FileReader()
    reader.readAsDataURL(file[0])

    reader.onload = async () => {
      const base64File = reader.result.split(',')[1] // Remove the data URL prefix
      const payload = {
        file: base64File,
        ...formData, // Include all the form data
      }

      uploadBulkProductsHandler(
        payload,
        dispatch,
        setUploadProgress,
        setUploadStatus,
        setUploadResults
      )

      // try {
      //   setUploadStatus('uploading')
      //   setUploadProgress(0) // Note: Progress tracking won't work with base64

      //   const response = await martApi.post(
      //     '/store/products/bulk-upload',
      //     payload,
      //     {
      //       onUploadProgress: (progressEvent) => {
      //         // This won't be accurate for base64 but can simulate progress
      //         const percentCompleted = Math.min(
      //           99, // Never reach 100% here as we're not tracking actual upload
      //           Math.round((progressEvent.loaded * 100) / progressEvent.total)
      //         )
      //         setUploadProgress(percentCompleted)
      //       },
      //     }
      //   )

      //   setUploadStatus('success')
      //   setUploadResults(response.data.results)
      //   setUploadProgress(100)
      // } catch (error) {
      //   console.error('Upload error:', error)
      //   setUploadStatus('error')
      //   setUploadResults(error.response?.data || { message: error.message })
      // }
    }

    reader.onerror = (error) => {
      console.error('File reading error:', error)
      setUploadStatus('error')
      setUploadResults({ message: 'Failed to read file' })
    }
  }

  // Download template
  const downloadTemplate = async () => {
    try {
      const response = await martApi.get(
        '/store/products/bulk-upload-template',
        {
          responseType: 'blob',
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'product_upload_template.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error downloading template:', error)
      alert('Failed to download template')
    }
  }

  const handleChangeCategory = (event) => {
    const { category, _id } = event.target.value

    setFormData({
      ...formData,
      category: _id,
      collectionName: category,
    })
  }

  const handleSubCateSelection = (event) => {
    const { _id, collectionName, groups, ...others } = event.target.value

    setFormData({
      ...formData,
      subcategory: _id,
      subCollectionName: others.label,
    })

    setGroups(groups)
  }

  const handleProductGroupSelection = (event) => {
    const { _id } = event.target.value
    setFormData({
      ...formData,
      productGroup: _id,
    })
  }

  const { results, message, success } = uploadResults

  console.log("uploadResults", uploadResults)

  return (
    <StoreLeftSideBar
      path={path}
      subListBar={true}
      crumb={[
        ...productBreadCrumb,
        {
          text: 'Bulk Upload',
          link: 'add-new-product/bulk-upload',
        },
      ]}
    >
      <div className="mx-auto  md:px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800  ">
            Bulk Product Upload
          </h1>
          <h4
            onClick={downloadTemplate}
            className="ml-4 inline-flex items-center px-4 cursor-pointer  border border-transparent text-sm font-medium text-blue-500"
          >
            Download Template
          </h4>
        </div>

        <div className="bg-white rounded-lg shadow-md p-3 md:p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-0 md:mb-6">
              <Box sx={{ pl: 0.2, mb: 1.5 }}>
                <SimpleDropDown
                  render={categories?.map((res, i) => (
                    <MenuItem key={i} value={res}>
                      {res.category}
                    </MenuItem>
                  ))}
                  defaultValue={
                    categories.filter((x) => x._id === formData.category)[0]
                  }
                  onChange={handleChangeCategory}
                  label="Product Category"
                  sx={{ mb: 2 }}
                />
                <SimpleDropDown
                  render={fromCollection?.sub_category?.map((res, i) => (
                    <MenuItem key={i} value={res}>
                      {res.label}
                    </MenuItem>
                  ))}
                  defaultValue={
                    fromCollection?.sub_category?.filter(
                      (x) => x.label == formData.subCollectionName
                    )[0]
                  }
                  onChange={handleSubCateSelection}
                  label="Product Sub-Category"
                  sx={{ mb: 2 }}
                />
                <SimpleDropDown
                  render={productGroups?.map((res, i) => (
                    <MenuItem key={i} value={res}>
                      {res.label}
                    </MenuItem>
                  ))}
                  defaultValue={
                    productGroups.filter(
                      (x) => x._id == formData.productGroup
                    )[0]
                  }
                  onChange={handleProductGroupSelection}
                  label="Product Class"
                  sx={{ mb: 2 }}
                />
              </Box>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <div className="flex items-center ">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excel File
                </label>
                <p className="block text-sm font-medium text-blue-700 mb-1 ml-4">
                  {file ? file[0].name : ''}
                </p>
              </div>
              <div className="mt-1 flex flex-col md:flex-row items-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".xlsx, .xls"
                  className="w-full md:w-auto py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />

                {/* Upload Button */}
                <div className="flex  w-full">
                  <button
                    type="submit"
                    className="w-full md:w-auto mt-6 md:mt-0 px-6 py-2.5 ml-0 md:ml-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    disabled={uploadStatus === 'uploading'}
                  >
                    {uploadStatus === 'uploading'
                      ? 'Uploading...'
                      : 'Upload Products'}
                  </button>
                </div>
              </div>
            </div>

            {/* Upload Progress */}
            {uploadStatus === 'uploading' && (
              <div className="mt-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Uploading: {uploadProgress}%
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Upload Results */}
        {results && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Upload Results
            </h2>

            {uploadStatus === 'success' ? (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-md ${
                    results.failed === 0
                      ? 'bg-green-50 text-green-800'
                      : 'bg-yellow-50 text-yellow-800'
                  }`}
                >
                  <p className="font-medium">
                    {results.failed === 0
                      ? `All ${results.total} products uploaded successfully!`
                      : `${results.success} products uploaded successfully, ${results.failed} failed`}
                  </p>
                </div>

                {results.failed > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Error Details
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Row
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Error
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {results.errors.map((error, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {error.row}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {error.product}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                                {error.error}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-md bg-red-50 text-red-800">
                <p className="font-medium">
                  Upload failed: {message}
                </p>
                {uploadResults.errors && (
                  <ul className="mt-2 list-disc list-inside">
                    {uploadResults.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </StoreLeftSideBar>
  )
}

export default BulkProductUpload
