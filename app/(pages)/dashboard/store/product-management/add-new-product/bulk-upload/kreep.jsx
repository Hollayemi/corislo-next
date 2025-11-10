import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BulkProductUpload = () => {
  // State for form data
  const [formData, setFormData] = useState({
    storeId: '',
    category: '',
    subcategory: '',
    productGroup: '',
    collectionId: '',
    subCollection: '',
    collectionName: '',
    subCollectionName: '',
    store: '',
    branch: '',
  })

  // State for dropdown options
  const [dropdownOptions, setDropdownOptions] = useState({
    stores: [],
    categories: [],
    subcategories: [],
    productGroups: [],
    collections: [],
  })

  // State for file upload
  const [file, setFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState('')
  const [uploadResults, setUploadResults] = useState(null)

  // Fetch dropdown options on component mount
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const [storesRes, categoriesRes] = await Promise.all([
          axios.get('/api/stores'),
          axios.get('/api/categories'),
        ])

        setDropdownOptions((prev) => ({
          ...prev,
          stores: storesRes.data,
          categories: categoriesRes.data,
        }))
      } catch (error) {
        console.error('Error fetching dropdown options:', error)
      }
    }

    fetchDropdownOptions()
  }, [])

  // Fetch subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      axios
        .get(`/api/subcategories?category=${formData.category}`)
        .then((res) => {
          setDropdownOptions((prev) => ({
            ...prev,
            subcategories: res.data,
          }))
        })
        .catch((error) => {
          console.error('Error fetching subcategories:', error)
        })
    }
  }, [formData.category])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      alert('Please select an Excel file to upload')
      return
    }

    const formDataToSend = new FormData()
    formDataToSend.append('file', file)

    // Append all form data to the FormData object
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value)
    })

    try {
      setUploadStatus('uploading')
      setUploadProgress(0)

      const response = await axios.post(
        '/api/products/bulk-upload',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            setUploadProgress(percentCompleted)
          },
        }
      )

      setUploadStatus('success')
      setUploadResults(response.data.results)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('error')
      setUploadResults(error.response?.data || { message: error.message })
    }
  }

  // Download template
  const downloadTemplate = async () => {
    try {
      const response = await axios.get('/api/products/template', {
        responseType: 'blob',
      })

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

  return (
    <div className="container mx-auto !px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Bulk Product Upload
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Upload Products
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Store Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store
              </label>
              <select
                name="storeId"
                value={formData.storeId}
                onChange={handleInputChange}
                className="w-full !px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Store</option>
                {dropdownOptions.stores.map((store) => (
                  <option key={store._id} value={store._id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full !px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Category</option>
                {dropdownOptions.categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subcategory
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="w-full !px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
                disabled={!formData.category}
              >
                <option value="">Select Subcategory</option>
                {dropdownOptions.subcategories.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Group Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Group (Optional)
              </label>
              <select
                name="productGroup"
                value={formData.productGroup}
                onChange={handleInputChange}
                className="w-full !px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Product Group</option>
                {dropdownOptions.productGroups.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Collection Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collection ID
              </label>
              <input
                type="text"
                name="collectionId"
                value={formData.collectionId}
                onChange={handleInputChange}
                className="w-full !px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collection Name
              </label>
              <input
                type="text"
                name="collectionName"
                value={formData.collectionName}
                onChange={handleInputChange}
                className="w-full !px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subcollection ID
              </label>
              <input
                type="text"
                name="subCollection"
                value={formData.subCollection}
                onChange={handleInputChange}
                className="w-full !px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subcollection Name
              </label>
              <input
                type="text"
                name="subCollectionName"
                value={formData.subCollectionName}
                onChange={handleInputChange}
                className="w-full !px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Store Info Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input
                type="text"
                name="store"
                value={formData.store}
                onChange={handleInputChange}
                className="w-full !px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch
              </label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="w-full !px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excel File
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".xlsx, .xls"
                className="py-2 !px-3 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <button
                type="button"
                onClick={downloadTemplate}
                className="ml-4 inline-flex items-center !px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Download Template
              </button>
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="!px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={uploadStatus === 'uploading'}
            >
              {uploadStatus === 'uploading'
                ? 'Uploading...'
                : 'Upload Products'}
            </button>
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
      {uploadResults && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Upload Results
          </h2>

          {uploadStatus === 'success' ? (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-md ${uploadResults.failed === 0
                    ? 'bg-green-50 text-green-800'
                    : 'bg-yellow-50 text-yellow-800'
                  }`}
              >
                <p className="font-medium">
                  {uploadResults.failed === 0
                    ? `All ${uploadResults.total} products uploaded successfully!`
                    : `${uploadResults.success} products uploaded successfully, ${uploadResults.failed} failed`}
                </p>
              </div>

              {uploadResults.failed > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Error Details
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="!px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Row
                          </th>
                          <th className="!px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="!px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Error
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {uploadResults.errors.map((error, index) => (
                          <tr key={index}>
                            <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {error.row}
                            </td>
                            <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {error.product}
                            </td>
                            <td className="!px-6 py-4 whitespace-nowrap text-sm text-red-500">
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
                Upload failed: {uploadResults.message}
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
  )
}

export default BulkProductUpload
