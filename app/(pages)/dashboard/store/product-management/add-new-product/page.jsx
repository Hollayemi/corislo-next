/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { prodInnerList } from '@/app/data/store/innerList'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  MenuItem,
  Autocomplete,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  SimpleDropDown,
  SizeComponent,
  QuantityComponent,
  ColorComponent,
} from './components'
import FileUploader from './dropZone'
import useSWR from 'swr'
import { removeOrAddToArray } from '@/app/utils/arrayFunctions'
import { createProductHandler } from '@/app/redux/state/slices/shop/products/productSlice'
import { useDispatch } from 'react-redux'
import { productBreadCrumb } from '../components'
import { editProductHandler } from '@/app/redux/state/slices/shop/products/updateProduct'
import IconifyIcon from '@/app/components/icon'
// import QuillTextEditor from '@/app/components/text-editor/quill'
const QuillTextEditor = dynamic(
  () => import('@/app/components/text-editor/quill'),
  {
    ssr: false,
  }
)
import Image from 'next/image'
import { generateDescApiHandler } from '@/app/redux/state/slices/shop/products/generateDesc'
import { useStoreData } from '@/app/hooks/useData'
// no allow (),+,
const AddNewProduct = ({ params }) => {
  const theme = useTheme()
  const { showSnackbar } = useStoreData()
  const searchParams = useSearchParams()
  const editID = searchParams.get('edit')
  const brk = theme.breakpoints.down
  const [selectedSizes, setSelectedSizes] = useState([])
  const [newSpec, setNewSpec] = useState('')
  const [specValue, setSpecValue] = useState('')
  const [specInfo, setProdSpecs] = useState('')
  const [productGroups, setGroups] = useState([])
  const [files, setFiles] = useState([])
  const [localFiles, setLocalFiles] = useState([])
  const [delivery, selectDelivery] = useState(['pickup'])
  const { data: getData } = useSWR('/corisio/category/thread')
  const { data: toEdit } = useSWR(editID && `/products?productId=${editID}`)
  const categories = getData ? getData?.data : [{}]
  const prodToEdit = toEdit ? toEdit.data?.result : []
  const specWithSize = ['cloth_spec', 'shoe_spec']
  const [genPayload, getGenPayload] = useState(null)
  const [genDesc, setGeneratedDesc] = useState()
  const reduxFuntion = editID ? editProductHandler : createProductHandler
  const [formData, setFormData] = useState({
    prodName: '',
    prodPrice: '',
    prodKey: '',
    prodInfo: '',
    specifications: { sizes: selectedSizes },
    images: [],
    totInStock: '',
    // collectionId: '',
    // subCollection: '',
    subCollectionName: '',
    collectionName: '',
    category: '',
    subcategory: '',
    productGroup: '',
    delivery,
  })
  let fromCollection = categories.filter((x) => x._id === formData.category)[0]

  useEffect(() => {
    if (toEdit) {
      const toEditData = prodToEdit[0] || {}
      setFormData(() => {
        return {
          prodName: toEditData.prodName,
          prodPrice: toEditData.prodPrice,
          video: toEditData.video,
          prodKey: toEditData.prodKey,
          prodInfo: toEditData.prodInfo,
          images: toEditData.images,
          totInStock: toEditData.totInStock,
          collectionId: toEditData.collectionId,
          subCollection: toEditData.subCollection,
          subCollectionName: toEditData.subCollectionName,
          collectionName: toEditData.collectionName,
          subcategory: toEditData.subcategory,
          productGroup: toEditData.productGroup,
          delivery: toEditData.delivery,
          specifications: toEditData.specifications?.variations || {},
          category: toEditData.categoryId,
          _id: toEditData._id,
        }
      })
      selectDelivery(toEditData.delivery)
      fromCollection = categories.filter(
        (x) => x.category === toEditData.category
      )[0]
    }
  }, [toEdit])

  const dispatch = useDispatch()

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event?.target?.value || '' })
  }

  const deliveryHandler = (value) => {
    removeOrAddToArray(value, delivery, selectDelivery)
  }

  const path = {
    ...params,
    sidebar: 'product-management',
    sublist: 'add-new-product',
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
    getGenPayload((prev) => ({
      ...prev,
      category: collectionName,
      subcategory: others.label,
    }))
    setFormData({
      ...formData,
      subcategory: _id,
      subCollectionName: others.label,
    })

    setGroups(groups)
  }

  const handleProductGroupSelection = (event) => {
    const { spec, _id } = event.target.value
    setFormData({
      ...formData,
      productGroup: _id,
    })
    setProdSpecs(spec)
  }

  console.log(formData, categories)
  return (
    <StoreLeftSideBar
      path={path}
      subListBar={true}
      InnerList={prodInnerList}
      crumb={[
        ...productBreadCrumb,
        {
          text: editID ? 'Edit Product' : 'Add Product',
          link: 'add-new-product',
        },
      ]}
    >
      <Box className="bg-white rounded-md md:px-5 pt-6 pb-8 !text-[13px]">
        <Grid container spacing={4} className="!px-3">
          <Grid item xs={12} md={5}>
            <Typography sx={{ fontWeight: 'bold', mb: 2.5 }}>
              Description
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk('md') && '0.5', mb: 0.5 }}>
              <Typography variant="caption" className="!mb-1">
                Product Name
              </Typography>

              <TextField
                className="!mt-1 !mb-3"
                fullWidth
                size="small"
                value={formData.prodName}
                id="outlined-basic"
                onChange={handleChange('prodName')}
                // label="Product Name"
              />
            </Box>

            <Typography sx={{ fontWeight: 'bold', my: 2.5 }}>
              Category
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk('md') && '0.5', mb: 1.5 }}>
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
                  productGroups.filter((x) => x._id == formData.productGroup)[0]
                }
                onChange={handleProductGroupSelection}
                label="Product Class"
                sx={{ mb: 2 }}
              />
            </Box>

            <Typography sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Pricing
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk('md') && '0.5', mb: 2.5 }}>
              <TextField
                sx={{ mb: 0.5 }}
                onChange={handleChange('prodPrice')}
                type="number"
                value={formData.prodPrice}
                fullWidth
                size="small"
                id="outlined-basic"
                // label="Product Price"
              />
            </Box>

            <Typography sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Total In Stock
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk('md') && '0.5', mb: 2.5 }}>
              <TextField
                sx={{ mb: 0.5 }}
                onChange={handleChange('totInStock')}
                type="number"
                fullWidth
                value={formData.totInStock}
                size="small"
                id="outlined-basic"
                // label="Total in stock"
              />
            </Box>

            <Typography sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Product Preference
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk('md') && '0.5' }}>
              <FormControlLabel
                value="Physical Pick-Up"
                control={
                  <Checkbox
                    checked={delivery?.includes('pickup')}
                    onChange={() => deliveryHandler('pickup')}
                    disabled={false}
                    name="pickup-checked"
                  />
                }
                label="Physical Pick-Up"
                labelPlacement="end"
              />
              <br />
              <FormControlLabel
                value="waybilling"
                control={
                  <Checkbox
                    checked={delivery?.includes('waybilling')}
                    onChange={() => deliveryHandler('waybilling')}
                    disabled={false}
                    name="waybilling-checked"
                  />
                }
                label="Waybilling"
                labelPlacement="end"
              />
              <br />
              <FormControlLabel
                value="Courier Service"
                control={
                  <Checkbox
                    checked={delivery?.includes('courier')}
                    onChange={() => deliveryHandler('courier')}
                    disabled={true}
                    name="courier-checked"
                  />
                }
                label="Courier Service"
                labelPlacement="end"
              />
            </Box>
          </Grid>
          {/* 




*/}
          <Grid item xs={12} md={7}>
            <Typography sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Product Media
            </Typography>
            <Box className="pl-2 md:pl-4 mb-5">
              {formData.video && (
                <Box className="flex flex-col md:flex-row items-start mb-5 p-3 bg-gray-50 border rounded">
                  <video className=" w-full md:w-52 md:h-40 relative" controls>
                    <source
                      // src="https://www.w3schools.com/html/mov_bbb.mp4"
                      src={formData.video}
                      type="video/mp4"
                    />
                    <div
                      onClick={() => {}}
                      className="text-[6px] flex items-center z-50 justify-center text-white absolute -mt-2 -mr-2 top-0 right-0 w-4 h-4 rounded-full bg-red-500"
                    >
                      <IconifyIcon icon="tabler:trash" fontSize={16} />
                    </div>
                  </video>

                  <Box className="flex items-center flex-wrap">
                    {formData.images.map((each, i) => (
                      <Box className="relative w-16 h-16 m-3" key={i}>
                        <Image
                          className="w-full h-full rounded-md"
                          alt={each.name}
                          src={each.image}
                          width={400}
                          height={400}
                        />
                        <div
                          onClick={() => {}}
                          className="text-[6px] flex items-center justify-center text-white absolute -mt-2 -mr-2 top-0 right-0 w-4 h-4 rounded-full bg-red-500"
                        >
                          <IconifyIcon icon="tabler:trash" fontSize={12} />
                        </div>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
              <FileUploader
                files={files}
                setFiles={setFiles}
                localFiles={localFiles}
                setLocalFiles={setLocalFiles}
              />
              <Box className="flex items-center justify-between">
                <Typography variant="caption" className="!mt-2">
                  Supported formats: JPG, PNG, MP3
                </Typography>
                <Typography variant="caption" className="!mt-2">
                  Maximum length of video is 30 secs
                </Typography>
              </Box>
            </Box>

            {specWithSize?.includes(specInfo?.label) ? (
              <>
                {selectedSizes.length ? (
                  <Typography className="font-black mb-5">
                    Select Size
                  </Typography>
                ) : null}
                <Box className="pl-2 md:pl-4 mb-4">
                  <SizeComponent
                    selectedSizes={selectedSizes}
                    setSelectedSizes={setSelectedSizes}
                  />
                </Box>

                {selectedSizes.length > 0 && (
                  <Typography className="font-black mb-5">
                    Select Quantity
                  </Typography>
                )}
                <Box className="pl-2 md:pl-4 mb-4">
                  <QuantityComponent
                    selectedSizes={selectedSizes}
                    setSelectedSizes={setSelectedSizes}
                  />
                </Box>

                {selectedSizes.length > 0 && (
                  <Typography className="font-black mb-5">
                    Select Color
                  </Typography>
                )}
                <Box className="pl-2 md:pl-4 mb-4">
                  <ColorComponent
                    selectedSizes={selectedSizes}
                    setSelectedSizes={setSelectedSizes}
                  />
                </Box>
              </>
            ) : null}
            {specInfo && (
              <Box className="mt-4">
                <Box className="flex justify-center px-2 !mt-3 w-full">
                  <Box className="flex flex-col w-full">
                    <Autocomplete
                      options={Object.keys(specInfo?.spec).map((x) =>
                        x?.replaceAll('_', ' ')
                      )}
                      onChange={(e, newValue) => setNewSpec(newValue)}
                      value={newSpec}
                      onInputChange={(e, newValue) =>
                        newValue && setNewSpec(newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select / Add Variation"
                          sx={{ border: 0 }}
                          value={newSpec}
                          onChange={() => {}}
                          size="small"
                          fullWidth
                          className="!w-full outline-0 !mb-4"
                        />
                      )}
                    />
                    <Box className="flex items-center w-full">
                      <Autocomplete
                        options={
                          specInfo.spec[newSpec?.replaceAll(' ', '_')] || []
                        }
                        className="!w-8/12 mr-3 mt-1 md:mt-0 outline-0 !mb-2"
                        value={specValue}
                        onChange={(e, newValue) => setSpecValue(newValue)}
                        onInputChange={(e, newValue) =>
                          newValue && setSpecValue(newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select / Add Value"
                            sx={{ border: 0 }}
                            value={specValue}
                            onChange={() => {}}
                            size="small"
                            fullWidth
                            className="!w-full mr-3 outline-0"
                          />
                        )}
                      />
                      <Button
                        variant="contained"
                        className="!text-[12px] h-10  w-4/12 !shadow-none"
                        onClick={() => {
                          if (newSpec && specValue) {
                            setFormData({
                              ...formData,
                              specifications: {
                                ...formData.specifications,
                                [newSpec.replaceAll(' ', '_')]: specValue,
                              },
                            })
                            setNewSpec('')
                            setSpecValue('')
                          }
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box className="px-4 !mb-14">
                  {Object.keys(formData.specifications).map((val, i) => {
                    return (
                      <Box key={i}>
                        {val.replace('_', ' ')} : {formData.specifications[val]}{' '}
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            )}
            <Box className="flex justify-between items-center">
              <Typography variant="caption" className="!mb-1">
                Product Description
              </Typography>
              {/* <IconifyIcon
                  icon="tabler:grain"
                  className="text-[14px]"
                  title="s"
                /> */}
              <Box
                className="flex items-center cursor-pointer hover:bg-gray-50 p-0.5 px-2 rounded"
                onClick={() =>
                  generateDescApiHandler(
                    {
                      ...genPayload,
                      prodPrice: formData.prodPrice,
                      specification: formData.specifications,
                      deliveryMethod: formData.delivery,
                    },
                    dispatch,
                    showSnackbar,
                    (e) => setFormData((prev) => ({ ...prev, prodInfo: e }))
                  )
                }
              >
                <Typography variant="caption" className="!mr-1">
                  Generate with AI
                </Typography>
                <span className="relative" data-animate="false">
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 14 15"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -ml-0.5 -mt-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 0.714966C6.57172 0.714966 6.19841 1.00644 6.09453 1.42193C5.64458 3.22175 5.11525 4.31311 4.3567 5.07167C3.59815 5.83022 2.50678 6.35955 0.706966 6.8095C0.291477 6.91337 -3.32794e-07 7.28669 -3.32794e-07 7.71497C-3.32794e-07 8.14324 0.291477 8.51656 0.706966 8.62043C2.50678 9.07039 3.59815 9.59971 4.3567 10.3583C5.11525 11.1168 5.64458 12.2082 6.09453 14.008C6.19841 14.4235 6.57172 14.715 7 14.715C7.42828 14.715 7.80159 14.4235 7.90547 14.008C8.35542 12.2082 8.88475 11.1168 9.6433 10.3583C10.4019 9.59971 11.4932 9.07039 13.293 8.62043C13.7085 8.51656 14 8.14324 14 7.71497C14 7.28669 13.7085 6.91337 13.293 6.8095C11.4932 6.35955 10.4019 5.83022 9.6433 5.07167C8.88475 4.31311 8.35542 3.22175 7.90547 1.42193C7.80159 1.00644 7.42828 0.714966 7 0.714966Z"
                    ></path>
                  </svg>
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className=""
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 0.714966C6.57172 0.714966 6.19841 1.00644 6.09453 1.42193C5.64458 3.22175 5.11525 4.31311 4.3567 5.07167C3.59815 5.83022 2.50678 6.35955 0.706966 6.8095C0.291477 6.91337 -3.32794e-07 7.28669 -3.32794e-07 7.71497C-3.32794e-07 8.14324 0.291477 8.51656 0.706966 8.62043C2.50678 9.07039 3.59815 9.59971 4.3567 10.3583C5.11525 11.1168 5.64458 12.2082 6.09453 14.008C6.19841 14.4235 6.57172 14.715 7 14.715C7.42828 14.715 7.80159 14.4235 7.90547 14.008C8.35542 12.2082 8.88475 11.1168 9.6433 10.3583C10.4019 9.59971 11.4932 9.07039 13.293 8.62043C13.7085 8.51656 14 8.14324 14 7.71497C14 7.28669 13.7085 6.91337 13.293 6.8095C11.4932 6.35955 10.4019 5.83022 9.6433 5.07167C8.88475 4.31311 8.35542 3.22175 7.90547 1.42193C7.80159 1.00644 7.42828 0.714966 7 0.714966Z"
                    ></path>
                  </svg>
                  <span className=""></span>
                </span>
              </Box>
            </Box>
            {/* <TextField
                sx={{ mb: 0.5 }}
                fullWidth
                multiline
                id="textarea-outlined"
                onChange={handleChange('prodInfo')}
                maxRows={7}
                value={formData.prodInfo}
                // placeholder="Product Description"
                minRows={6}
                // label="Product Description"
              /> */}
            <QuillTextEditor
              value={formData.prodInfo}
              className="h-52 mt-1 mb-10"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, prodInfo: e }))
              }
            />
          </Grid>
          {/* 



*/}
        </Grid>
        <Box className="flex items-center justify-center mt-6 px-3">
          <Button
            variant="contained"
            className="bg-blue-900 text-xs md:px-6 !py-2 !w-3/5 md:!w-48 !h-10"
            onClick={() =>
              reduxFuntion(
                {
                  ...formData,
                  delivery,
                  specifications: {
                    sizes: selectedSizes,
                    variations: formData.specifications,
                  },
                  newImages: files,
                },
                dispatch
              )
            }
          >
            {editID ? 'Update ' : 'Add '} Product
          </Button>
          {!editID && (
            <>
              {' '}
              <Button
                variant="contained"
                className="bg-blue-900 !mx-1 !w-1/5 !md:w-32 !py-2 md:px-6 !h-10"
              >
                Save
              </Button>
              <Button
                variant="contained"
                className="bg-blue-900 !w-1/5 !md:w-32 !py-2 md:px-6 !h-10"
              >
                Discard
              </Button>
            </>
          )}
        </Box>
      </Box>
    </StoreLeftSideBar>
  )
}

export default AddNewProduct
