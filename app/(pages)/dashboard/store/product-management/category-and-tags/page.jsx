/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react'
import { prodInnerList } from '@/app/data/store/innerList'
import OverViewCard from '../overview'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)
import { Box, Typography, Grid, Button } from '@mui/material'
import {
  categoriesBriefData,
  categoryDataExpand,
} from '@/app/data/store/productData'
import CardStatsHorizontal from '@/app/components/cards/iconHorizontal'
import Icon from '@/app/components/icon'
import TreeItem from '@mui/lab/TreeItem'
import { alpha, styled } from '@mui/material/styles'
import MuiTreeView from '@mui/lab/TreeView'
import tokens from '@/app/configs/tokens'
import useSWR from 'swr'
import { productBreadCrumb } from '../components'
import { Add } from '@mui/icons-material'
import { useStoreData } from '@/app/hooks/useData'

const CategoryAndTags = ({ params }) => {
  const path = {
    ...params,
    sidebar: 'product-management',
    sublist: 'category-and-tags',
  }
  const [selectedCate, setSelectedCate] = useState(null)
  const isSelected = Boolean(selectedCate)
  return (
    <StoreLeftSideBar
      path={path}
      subListBar={true}
      InnerList={prodInnerList}
      breadCrumbRIghtChildren={<BreadcrumbRightEle />}
      crumb={[
        ...productBreadCrumb,
        {
          text: 'Category And Tags',
          link: '/category-and-tags',
        },
      ]}
    >
      {!isSelected && (
        <Box className="bg-white rounded-md !px-3 py-6 mb-4">
          <OverViewCard />
        </Box>
      )}
      <Box className="bg-white rounded-md !px-3 pt-6 pb-8 w-full grow">
        {isSelected ? (
          <TreeViewSelected />
        ) : (
          <BriefCategories
            selectedCate={selectedCate}
            setSelectedCate={setSelectedCate}
          />
        )}
      </Box>
    </StoreLeftSideBar>
  )
}

const BriefCategories = ({ selectedCate, setSelectedCate }) => {
  const { data, error, isLoading } = useSWR('/store/brief-categories')
  const allCategories =
    !error && !isLoading
      ? data.data.map((item, i) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <CardStatsHorizontal
              category={item.category}
              id={item.id || '0980978978607860'}
              subCateNum={item.sub_categories}
              prodNumb={item.products}
              icon="tabler:currency-dollar"
              selectedCate={selectedCate}
              setSelectedCate={setSelectedCate}
            />
          </Grid>
        )
      })
      : null
  return (
    <Box>
      <Box className="flex justify-between items-center">
        <Typography className="!font-bold">Categories</Typography>
      </Box>
      <Typography
        className="!text-xs !mt-3 !mb-5 !leading-5"
        variant="body1"
        color=""
      >
        This section is dedicated to efficiently managing your product
        categories across all store branches.
        {/* As the administrator, you have full control over every aspect  */}
        {/* of your product categories, ensuring seamless organization and a delightful shopping experience for your customers. */}
      </Typography>
      <Grid container spacing={2}>
        {allCategories}
      </Grid>
    </Box>
  )
}

export default CategoryAndTags

const TreeView = styled(MuiTreeView)(({ theme }) => ({
  minHeight: 264,
  '& .MuiTreeItem-iconContainer .close': {
    opacity: 0.3,
  },
  '& .MuiTreeItem-group': {
    marginLeft: 15,
    paddingLeft: 18,
    paddingTop: 10,
    paddingBottom: 10,
    borderLeft: '1px dashed black',
  },
  [theme.breakpoints.up('sm')]: {
    '& .MuiTreeItem-group': {
      marginLeft: 15,
      paddingLeft: 38,
      paddingTop: 10,
      paddingBottom: 10,
      borderLeft: '1px dashed black',
    },
  },
}))

const ProductDisplay = ({ image, price, name, quantity = 0 }) => {
  return (
    <Box className="flex items-center gap-2 my-4">
      <Box className="!flex !items-center !w-3/5 shrink-0">
        <img
          src={image}
          alt={name}
          className="!w-8 !md:w-12 shrink-0 !h-12 !md:h-12 my-3 rounded-md mr-4"
        />
        <Typography className="">{name}</Typography>
      </Box>
      <Typography className="w-1/5">{price}</Typography>
      <Typography className="w-1/5">{quantity}</Typography>
    </Box>
  )
}

const TreeViewSelected = () => {
  const viewResult = categoryDataExpand.brands.map((brand, brandId) => {
    return (
      <TreeItem
        nodeId={brandId}
        key={brandId}
        label={`${brand.name} (${brand.groups.length})`}
      >
        {brand.groups.map((group, groupId) => {
          return (
            <TreeItem
              key={groupId}
              nodeId={`${group._id.group}-${groupId}`}
              label={`${group._id.group} (${group.products.length})`}
            >
              {group.products.map((product, productId) => {
                console.log(product)
                return (
                  <ProductDisplay
                    key={productId}
                    image={product.images.image}
                    name={product.prodName}
                    price={product.price}
                    quantity={0}
                  />
                  // </TreeItem>
                )
              })}
            </TreeItem>
          )
        })}
      </TreeItem>
    )
  })

  return (
    <TreeView
      defaultExpanded={['167', 0, 1, 2, 3]}
      defaultExpandIcon={<Icon icon="tabler:square-plus" />}
      defaultCollapseIcon={<Icon icon="tabler:square-minus" />}
      defaultEndIcon={<Icon icon="tabler:square-x" className="close" />}
    >
      <TreeItem nodeId="167" label={categoryDataExpand.category}>
        {viewResult}

        {/* <TreeItem nodeId='2' label='Hello' />
          <TreeItem nodeId='3' label='Subtree with children'>
            <TreeItem nodeId='6' label='Hello' />
            <TreeItem nodeId='7' label='Sub-subtree with children'>
              <TreeItem nodeId='9' label='Child 1' />
              <TreeItem nodeId='10' label='Child 2' />
              <TreeItem nodeId='11' label='Child 3' />
            </TreeItem>
            <TreeItem nodeId='8' label='Hello' />
          </TreeItem>
          <TreeItem nodeId='4' label='World' />
          <TreeItem nodeId='15' label='Something something' /> */}
      </TreeItem>
    </TreeView>
  )
}

const BreadcrumbRightEle = () => {
  const { showOverlay } = useStoreData()
  return (
    <Box className="flex items-center -mr-6 md:mr-0">
      <Button
        variant="contained"
        className="!mr-4 !bg-blue-900 !shadow-none !text-[12px] !rounded-full"
        startIcon={<Icon icon="tabler:plus" />}
        onClick={() => showOverlay('newCollection')}
      >
        <span className="hidden md:block">Add New </span> Collection
      </Button>
    </Box>
  )
}
