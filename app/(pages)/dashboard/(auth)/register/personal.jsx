'use client'
import React, { useEffect, useState } from 'react'
import { CustomInput } from '@/app/components/cards/auth/components'
import { Box, Button, Grid, Typography, TextField } from '@mui/material'
import { createStoreHandler } from '@/app/redux/state/slices/shop/addShop'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { SpinLoader } from '@/app/components/cards/loader'
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view'
import { Checkbox, FormControlLabel } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SearchIcon from '@mui/icons-material/Search'
import { BasicModal } from '@/app/components/cards/popup'
import useSWR from 'swr'

const PersonalProfile = ({
  handleUserChange,
  handleStoreChange,
  setStoreValues,
  errors,
  values,
  storeValues,
  confPas,
  setConfPass,
  readyToNext,
  setStage,
  setUserValues,
}) => {
  const propStore = storeValues.businessName.split(' ')[0]?.toLowerCase()
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Box className="px-2">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Full Name i.e Staff Name"
            id="fullname"
            error={
              readyToNext ? errors.fullname : values.fullname && errors.fullname
            }
            name="fullname"
            hideCheck={!values.fullname}
            onChange={handleUserChange('fullname')}
            onCancel={() =>
              setUserValues((prev) => ({ ...prev, ['fullname']: '' }))
            }
            inputProps={{
              value: values.fullname || '',
              type: 'text',
              placeholder: 'Enter your staff name',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Username"
            error={
              readyToNext ? errors.username : values.username && errors.username
            }
            onChange={handleUserChange('username')}
            onCancel={() =>
              setUserValues((prev) => ({ ...prev, ['username']: '' }))
            }
            id="username"
            hideCheck={!values.username}
            name="username"
            inputProps={{
              value: values.username || '',
              type: 'text',
              placeholder: 'Enter your username',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Business Name"
            onChange={handleStoreChange('businessName')}
            onCancel={() =>
              setStoreValues((prev) => ({ ...prev, ['businessName']: '' }))
            }
            error={storeValues.businessName && errors.businessName}
            hideCheck={!storeValues.businessName}
            id="bussname"
            inputProps={{
              value: storeValues?.businessName || '',
              type: 'text',
              onBlur: () =>
                setStoreValues((storeValues) => ({
                  ...storeValues,
                  store: propStore,
                })),
              placeholder: `Enter your business name`,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Store"
            onChange={handleStoreChange('store')}
            onCancel={() =>
              setStoreValues((prev) => ({ ...prev, ['store']: '' }))
            }
            error={storeValues.store && errors.store}
            hideCheck={!storeValues.store}
            id="store"
            inputProps={{
              value: storeValues?.store,
              type: 'text',
              placeholder: `Set your store a name e.g ${propStore}`,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            title="Email Address"
            error={readyToNext ? errors.email : values.email && errors.email}
            onChange={handleUserChange('email')}
            onCancel={() =>
              setUserValues((prev) => ({ ...prev, ['email']: '' }))
            }
            id="email"
            name="email"
            hideCheck={!values.email}
            inputProps={{
              value: values.email || '',
              type: 'email',
              placeholder: 'Enter staff email address',
            }}
          />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <CustomInput
            title="Phone Number"
            onChange={handleUserChange('phoneNumber')}
            onCancel={() =>
              setUserValues((prev) => ({ ...prev, ['phoneNumber']: '' }))
            }
            id="phoneNumber"
            name="phoneNumber"
            hideCheck={!values.phoneNumber}
            error={
              readyToNext
                ? errors.phoneNumber
                : values.phoneNumber && errors.phoneNumber
            }
            inputProps={{
              value: values.phoneNumber || '',
              type: 'number',
              placeholder: 'Enter your phone number',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="State"
            id="state"
            name="state"
            hideCheck={!values.state}
            onChange={handleUserChange('state')}
            onCancel={() =>
              setUserValues((prev) => ({ ...prev, ['state']: '' }))
            }
            inputProps={{
              value: values.state,
              type: 'text',
              placeholder: 'Enter your state',
            }}
          />
        </Grid> */}
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Password"
            onChange={handleUserChange('password')}
            onCancel={() =>
              setUserValues((prev) => ({ ...prev, ['password']: '' }))
            }
            error={
              readyToNext ? errors.password : values.password && errors.password
            }
            id="password"
            hideCheck={!values.password}
            name="password"
            inputProps={{
              value: values.password || '',
              type: 'password',
              placeholder: '.......',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomInput
            title="Confirm Password"
            id="confPass"
            error={values.password !== confPas ? 'Password not match' : false}
            name="confPass"
            onChange={(e) => setConfPass(e.target.value)}
            onCancel={() => setConfPass('')}
            hideCheck={!confPas}
            inputProps={{
              value: confPas || '',
              type: 'password',
              placeholder: '.......',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            className="w-full !h-12 !rounded-md !bg-white !text-blue-500 !text-[17px] !mt-2 !mb-2 !shadow-none"
            onClick={() => setModalOpen(true)}
          >
            Select Category
          </Button>
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            title="About"
            onChange={handleStoreChange('about_store')}
            onCancel={() =>
              setStoreValues((prev) => ({ ...prev, ['about_store']: '' }))
            }
            error={storeValues.about_store && errors.about_store}
            hideCheck={!storeValues.about_store}
            id="state"
            multiline
            inputProps={{
              value: storeValues?.about_store || '',
              type: 'text',
              placeholder: 'About your business',
            }}
          />
        </Grid>
      </Grid>
      <Box className="w-full  !b-10 mb-10 md:mb-0 pt-8">
        <Button
          variant="contained"
          disabled={confPas !== values.password || !values.password}
          className="w-full !h-12 !rounded-full !text-gray-100 !text-[17px] !mt-3 !mb-10 !shadow-none"
          onClick={() =>
            createStoreHandler(
              { user: values, store: storeValues },
              dispatch,
              setStage,
              setLoading
            )
          }
        >
          Next
        </Button>
      </Box>
      {loading && (
        <Box className="w-full h-full absolute top-0 left-0 bg-black opacity-40  flex items-center justify-center">
          <SpinLoader />
        </Box>
      )}
      <BasicModal
        openModal={Boolean(modalOpen)}
        toggleModal={() => setModalOpen(!modalOpen)}
        content={
          <EnhancedCategorySelector
            closeModal={() => setModalOpen(false)}
            setPreferedCategories={(e) =>
              setStoreValues((prev) => ({
                ...prev,
                categories: e,
              }))
            }
          />
        }
      />
    </Box>
  )
}

export default PersonalProfile

export const EnhancedCategorySelector = ({
  setPreferedCategories,
  preferredCategories = {},
  for_store,
}) => {
  const { data, isLoading } = useSWR(
    `/corisio/category/thread?for_store=${for_store ? 'true' : 'false'}`
  )
  console.log(preferredCategories)
  const categoryTree = data ? data?.data : []
  const [selectedCategories, setSelectedCategories] = useState(
    preferredCategories?.main || []
  )
  const [selectedSubCategories, setSelectedSubCategories] = useState(
    preferredCategories.subCategories || []
  )
  const [selectedGroups, setSelectedGroups] = useState(
    preferredCategories.groups || []
  )

  useEffect(() => {
    setPreferedCategories({
      main: selectedCategories || [],
      subCategories: selectedSubCategories || [],
      groups: selectedGroups || [],
    })
  }, [selectedCategories, selectedSubCategories, selectedGroups])

  const [searchTerm, setSearchTerm] = useState('')
  const [expandedItems, setExpandedItems] = useState([])

  const filteredThread = searchTerm
    ? categoryTree.filter(
        (category) =>
          category.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.sub_category.some(
            (sub) =>
              sub.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
              sub.groups.some((group) =>
                group.label.toLowerCase().includes(searchTerm.toLowerCase())
              )
          )
      )
    : categoryTree

  // Category toggle
  const toggleCategory = (categoryId) => {
    const category = categoryTree.find((c) => c._id === categoryId)
    if (!category) return

    if (selectedCategories.includes(categoryId)) {
      // Deselect category and all its subcategories and groups
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId))

      const subIds = category.sub_category.map((sub) => sub._id)
      setSelectedSubCategories((prev) =>
        prev.filter((id) => !subIds.includes(id))
      )

      const groupIds = category.sub_category.flatMap((sub) =>
        sub.groups.map((g) => g._id)
      )
      setSelectedGroups((prev) => prev.filter((id) => !groupIds.includes(id)))
    } else {
      // Select category and all its subcategories and groups
      setSelectedCategories((prev) => [...prev, categoryId])

      const subIds = category.sub_category.map((sub) => sub._id)
      setSelectedSubCategories((prev) => [...new Set([...prev, ...subIds])])

      const groupIds = category.sub_category.flatMap((sub) =>
        sub.groups.map((g) => g._id)
      )
      setSelectedGroups((prev) => [...new Set([...prev, ...groupIds])])
    }
  }

  // Subcategory toggle
  const toggleSubCategory = (categoryId, subcategoryId) => {
    const category = categoryTree.find((c) => c._id === categoryId)
    const subcategory = category?.sub_category.find(
      (s) => s._id === subcategoryId
    )
    if (!subcategory) return

    if (selectedSubCategories.includes(subcategoryId)) {
      // Deselect subcategory and all its groups
      setSelectedSubCategories((prev) =>
        prev.filter((id) => id !== subcategoryId)
      )
      setSelectedGroups((prev) =>
        prev.filter((id) => !subcategory.groups.map((g) => g._id).includes(id))
      )

      // Check if we need to deselect parent category
      const otherSubsSelected = category.sub_category
        .filter((s) => s._id !== subcategoryId)
        .some((s) => selectedSubCategories.includes(s._id))

      if (!otherSubsSelected && selectedCategories.includes(categoryId)) {
        setSelectedCategories((prev) => prev.filter((id) => id !== categoryId))
      }
    } else {
      setSelectedCategories((prev) => [...prev, categoryId])
      // Select subcategory and all its groups
      setSelectedSubCategories((prev) => [...prev, subcategoryId])
      setSelectedGroups((prev) => [
        ...new Set([...prev, ...subcategory.groups.map((g) => g._id)]),
      ])

      // Check if we need to select parent category
      const allSubsSelected = category.sub_category.every(
        (s) => selectedSubCategories.includes(s._id) || s._id === subcategoryId
      )

      if (allSubsSelected && !selectedCategories.includes(categoryId)) {
        setSelectedCategories((prev) => [...prev, categoryId])
      }
    }
  }

  // Group toggle
  const toggleGroupCategory = (categoryId, subcategoryId, groupId) => {
    if (selectedGroups.includes(groupId)) {
      // Deselect group
      setSelectedGroups((prev) => prev.filter((id) => id !== groupId))

      // Check if we need to deselect parent subcategory
      const subcategory = categoryTree
        .find((c) => c._id === categoryId)
        ?.sub_category.find((s) => s._id === subcategoryId)

      if (!subcategory) return

      const otherGroupsSelected = subcategory.groups
        .filter((g) => g._id !== groupId)
        .some((g) => selectedGroups.includes(g._id))

      if (
        !otherGroupsSelected &&
        selectedSubCategories.includes(subcategoryId)
      ) {
        setSelectedSubCategories((prev) =>
          prev.filter((id) => id !== subcategoryId)
        )

        // Check if we need to deselect parent category
        const category = categoryTree.find((c) => c._id === categoryId)
        if (!category) return

        const hasOtherSelectedSubs = category.sub_category
          .filter((s) => s._id !== subcategoryId)
          .some((s) => selectedSubCategories.includes(s._id))

        const hasOtherSelectedGroups = category.sub_category
          .filter((s) => s._id !== subcategoryId)
          .flatMap((s) => s.groups)
          .some((g) => selectedGroups.includes(g._id))

        if (
          !hasOtherSelectedSubs &&
          !hasOtherSelectedGroups &&
          selectedCategories.includes(categoryId)
        ) {
          setSelectedCategories((prev) =>
            prev.filter((id) => id !== categoryId)
          )
        }
      }
    } else {
      // Select group
      setSelectedGroups((prev) => [...prev, groupId])

      // Check if we need to select parent subcategory
      if (!selectedSubCategories.includes(subcategoryId)) {
        setSelectedSubCategories((prev) => [...prev, subcategoryId])
      }

      // Check if we need to select parent category
      if (!selectedCategories.includes(categoryId)) {
        setSelectedCategories((prev) => [...prev, categoryId])
      }
    }
  }

  // Check if category is fully selected
  const isCategoryChecked = (categoryId, subcategoryLength) => {
    const category = categoryTree.find((c) => c._id === categoryId)
    if (!category) return false
    if (!selectedCategories?.includes(categoryId) && !subcategoryLength)
      return false

    return category.sub_category.every(
      (sub) =>
        selectedSubCategories.includes(sub._id) &&
        sub.groups.every((group) => selectedGroups.includes(group._id))
    )
  }

  // Check if category is partially selected
  const isCategoryIndeterminate = (categoryId) => {
    const category = categoryTree.find((c) => c._id === categoryId)
    if (!category) return false

    const hasSomeSelected = category.sub_category.some(
      (sub) =>
        selectedSubCategories.includes(sub._id) ||
        sub.groups.some((group) => selectedGroups.includes(group._id))
    )

    const allFullySelected = category.sub_category.every(
      (sub) =>
        selectedSubCategories.includes(sub._id) &&
        sub.groups.every((group) => selectedGroups.includes(group._id))
    )

    return hasSomeSelected && !allFullySelected
  }

  // Check if subcategory is fully selected
  const isSubChecked = (categoryId, subcategoryId, groupLength) => {
    const category = categoryTree.find((c) => c._id === categoryId)
    const subcategory = category?.sub_category.find(
      (s) => s._id === subcategoryId
    )
    if (!subcategory) return false
    if (!selectedSubCategories.includes(subcategoryId) && !groupLength)
      return false

    return subcategory.groups.every((group) =>
      selectedGroups.includes(group._id)
    )
  }

  // Check if subcategory is partially selected
  const isSubIndeterminate = (categoryId, subcategoryId) => {
    const category = categoryTree.find((c) => c._id === categoryId)
    const subcategory = category?.sub_category.find(
      (s) => s._id === subcategoryId
    )
    if (!subcategory) return false

    const selectedCount = subcategory.groups.filter((group) =>
      selectedGroups.includes(group._id)
    ).length

    return selectedCount > 0 && selectedCount < subcategory.groups.length
  }

  // Check if group is selected
  const isGroupChecked = (groupId) => {
    return selectedGroups.includes(groupId)
  }

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term) {
      const matchedItems = []
      categoryTree.forEach((category) => {
        if (category.label.toLowerCase().includes(term)) {
          matchedItems.push(category._id)
        }

        category.sub_category.forEach((subcategory) => {
          if (subcategory.label.toLowerCase().includes(term)) {
            matchedItems.push(category._id)
            matchedItems.push(subcategory._id)
          }

          subcategory.groups.forEach((group) => {
            if (group.label.toLowerCase().includes(term)) {
              matchedItems.push(category._id)
              matchedItems.push(subcategory._id)
              matchedItems.push(group._id)
            }
          })
        })
      })
      setExpandedItems([...new Set(matchedItems)])
    } else {
      setExpandedItems([])
    }
  }

  return (
    <Box
      sx={{
        width: '95%',
        maxWidth: 800,
      }}
      className="p-7 h-[90%] bg-white rounded-lg shadow-lg mx-auto my-5 overflow-y-auto"
    >
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        className="!font-bold !text-[15px] !mb-2"
      >
        Select Your Categories
      </Typography>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
        }}
        sx={{ mb: 2 }}
      />
      {isLoading ? (
        <SpinLoader />
      ) : (
        <SimpleTreeView
          aria-label="category selector"
          slots={{
            expandIcon: ChevronRightIcon,
            collapseIcon: ExpandMoreIcon,
          }}
          expandedItems={expandedItems}
          onExpandedItemsChange={(event, itemIds) => setExpandedItems(itemIds)}
          sx={{
            '& .MuiTreeItem-content': {
              py: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            },
          }}
        >
          {filteredThread.map((category) => (
            <TreeItem
              key={category._id}
              itemId={category._id}
              label={
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isCategoryChecked(
                        category._id,
                        category.sub_category.length
                      )}
                      indeterminate={isCategoryIndeterminate(category._id)}
                      onChange={() => toggleCategory(category._id)}
                      sx={{
                        py: 0.5,
                        '&.Mui-checked': {
                          color: 'primary.main',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {category.category}
                    </Typography>
                  }
                  sx={{ ml: 0 }}
                />
              }
              sx={{
                '& .MuiTreeItem-content': {
                  pl: 2,
                },
                '& .MuiTreeItem-group': {
                  ml: 3,
                },
              }}
            >
              {category.sub_category.map((sub) => (
                <TreeItem
                  key={sub._id}
                  itemId={sub._id}
                  label={
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isSubChecked(
                            category._id,
                            sub._id,
                            sub.groups.length
                          )}
                          indeterminate={isSubIndeterminate(
                            category._id,
                            sub._id
                          )}
                          onChange={() =>
                            toggleSubCategory(category._id, sub._id)
                          }
                          size="small"
                          sx={{
                            py: 0.5,
                            '&.Mui-checked': {
                              color: 'primary.main',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2">{sub.label}</Typography>
                      }
                      sx={{ ml: 0 }}
                    />
                  }
                  sx={{
                    '& .MuiTreeItem-content': {
                      pl: 6,
                    },
                  }}
                >
                  {sub.groups.map((group) => (
                    <TreeItem
                      key={group._id}
                      itemId={group._id}
                      label={
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isGroupChecked(group._id)}
                              onChange={() =>
                                toggleGroupCategory(
                                  category._id,
                                  sub._id,
                                  group._id
                                )
                              }
                              size="small"
                              sx={{
                                py: 0.5,
                                '&.Mui-checked': {
                                  color: 'primary.main',
                                },
                              }}
                            />
                          }
                          label={
                            <Typography variant="body2">
                              {group.label}
                            </Typography>
                          }
                          sx={{ ml: 0 }}
                        />
                      }
                      sx={{
                        '& .MuiTreeItem-content': {
                          pl: 10,
                        },
                      }}
                    />
                  ))}
                </TreeItem>
              ))}
            </TreeItem>
          ))}
        </SimpleTreeView>
      )}{' '}
    </Box>
  )
}
