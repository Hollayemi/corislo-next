'use client'
import React, { useEffect, useState } from 'react'
import { CustomInput } from '@/app/components/cards/auth/components'
import { Box, Button, Typography, TextField } from '@mui/material'
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
import { Search, ChevronDown, ChevronRight, X, Check, Filter, Tag } from 'lucide-react';
import { useGetFeaturedCategoriesQuery } from '@/app/redux/business/slices/growthSlice'

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
    <Box className="!px-1 md:!px-2 w-full">
      <Box className="w-full grid md:grid-cols-2 gap-4 gap-x-2 md:gap-x-4">
        <Box>
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
        </Box>
        <Box>
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
        </Box>
        <Box>
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
        </Box>
        <Box>
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
        </Box>
        <Box className='col-span-2'>
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
        </Box>
        <Box>
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
        </Box>
        <Box>
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
        </Box>
        <Box className='col-span-2'>
          <Button
            variant="contained"
            className="w-full !h-12 !rounded-md !bg-white !text-blue-500 !text-[17px] !mb-2 !shadow-none"
            onClick={() => setModalOpen(true)}
          >
            {storeValues.categories?.main ? `Update Selection (${storeValues.categories?.groups?.length} Selected)` : "Select Category"}
          </Button>
        </Box>
        <Box className='col-span-2'>
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
        </Box>
      </Box>

      <Box className="w-full z-50 !b-10 mb-10 md:mb-0 pt-8">
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
        <Box className="w-full h-full z-50 absolute top-0 left-0 bg-black opacity-40  flex items-center justify-center">
          <SpinLoader />
        </Box>
      )}
      <BasicModal
        openModal={Boolean(modalOpen)}
        toggleModal={() => setModalOpen(!modalOpen)}
        content={
          <EnhancedCategorySelector
            closeModal={() => setModalOpen(false)}
            preferredCategories={storeValues.categories}
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

export const EnhancedCategorySelector2 = ({
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

export const EnhancedCategorySelector = ({
  setPreferedCategories,
  closeModal,
  preferredCategories = {},
  for_store,
}) => {
  const { data, isLoading } = useGetFeaturedCategoriesQuery(for_store)
  const categoryTree = data ? data?.data : []
  const [selectedCategories, setSelectedCategories] = useState(preferredCategories?.main || []);
  const [selectedSubCategories, setSelectedSubCategories] = useState(preferredCategories.subCategories || []);
  const [selectedGroups, setSelectedGroups] = useState(preferredCategories.groups || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [expandedSubCategories, setExpandedSubCategories] = useState([]);
  const [viewMode, setViewMode] = useState('selected'); // 'hierarchy' or 'selected'

  useEffect(() => {
    setPreferedCategories({
      main: selectedCategories || [],
      subCategories: selectedSubCategories || [],
      groups: selectedGroups || [],
    });
  }, [selectedCategories, selectedSubCategories, selectedGroups]);

  const filteredCategories = searchTerm
    ? categoryTree.filter(category =>
      category.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.sub_category.some(sub =>
        sub.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.groups.some(group =>
          group.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    )
    : categoryTree;

  const toggleCategory = (categoryId) => {
    const category = categoryTree.find(c => c._id === categoryId);
    if (!category) return;

    if (selectedCategories.includes(categoryId)) {
      // Deselect category and all children
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
      const subIds = category.sub_category.map(sub => sub._id);
      setSelectedSubCategories(prev => prev.filter(id => !subIds.includes(id)));
      const groupIds = category.sub_category.flatMap(sub => sub.groups.map(g => g._id));
      setSelectedGroups(prev => prev.filter(id => !groupIds.includes(id)));
    } else {
      // Select category and all children
      setSelectedCategories(prev => [...prev, categoryId]);
      const subIds = category.sub_category.map(sub => sub._id);
      setSelectedSubCategories(prev => [...new Set([...prev, ...subIds])]);
      const groupIds = category.sub_category.flatMap(sub => sub.groups.map(g => g._id));
      setSelectedGroups(prev => [...new Set([...prev, ...groupIds])]);
    }
  };

  const toggleSubCategory = (categoryId, subcategoryId) => {
    const category = categoryTree.find(c => c._id === categoryId);
    const subcategory = category?.sub_category.find(s => s._id === subcategoryId);
    if (!subcategory) return;

    if (selectedSubCategories.includes(subcategoryId)) {
      // Deselect subcategory and all groups
      setSelectedSubCategories(prev => prev.filter(id => id !== subcategoryId));
      setSelectedGroups(prev => prev.filter(id => !subcategory.groups.map(g => g._id).includes(id)));
    } else {
      // Select subcategory and all groups
      setSelectedSubCategories(prev => [...prev, subcategoryId]);
      setSelectedGroups(prev => [...new Set([...prev, ...subcategory.groups.map(g => g._id)])]);

      // Auto-select parent category if not selected
      if (!selectedCategories.includes(categoryId)) {
        setSelectedCategories(prev => [...prev, categoryId]);
      }
    }
  };

  const toggleGroup = (categoryId, subcategoryId, groupId) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(prev => prev.filter(id => id !== groupId));
    } else {
      setSelectedGroups(prev => [...prev, groupId]);

      // Auto-select parent subcategory and category if not selected
      if (!selectedSubCategories.includes(subcategoryId)) {
        setSelectedSubCategories(prev => [...prev, subcategoryId]);
      }
      if (!selectedCategories.includes(categoryId)) {
        setSelectedCategories(prev => [...prev, categoryId]);
      }
    }
  };

  const getCategorySelectionState = (categoryId) => {
    const category = categoryTree.find(c => c._id === categoryId);
    if (!category) return 'none';

    const allGroupIds = category.sub_category.flatMap(sub => sub.groups.map(g => g._id));
    const selectedCount = allGroupIds.filter(id => selectedGroups.includes(id)).length;

    if (selectedCount === 0) return 'none';
    if (selectedCount === allGroupIds.length) return 'all';
    return 'partial';
  };

  const getSubCategorySelectionState = (subcategoryId) => {
    const category = categoryTree.find(c => c.sub_category.some(s => s._id === subcategoryId));
    const subcategory = category?.sub_category.find(s => s._id === subcategoryId);
    if (!subcategory) return 'none';

    const selectedCount = subcategory.groups.filter(g => selectedGroups.includes(g._id)).length;

    if (selectedCount === 0) return 'none';
    if (selectedCount === subcategory.groups.length) return 'all';
    return 'partial';
  };

  const clearAllSelections = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedGroups([]);
  };

  const getTotalSelections = () => {
    return selectedGroups.length;
  };

  const getSelectedItemsPreview = () => {
    const items = [];
    categoryTree.forEach(category => {
      category.sub_category.forEach(sub => {
        sub.groups.forEach(group => {
          if (selectedGroups.includes(group._id)) {
            items.push({
              categoryName: category.category,
              subName: sub.label,
              groupName: group.label,
              groupId: group._id
            });
          }
        });
      });
    });
    return items.slice(0, 10);
  };

  return (
    <div className="w-full max-w-4xl md:my-10 mx-auto bg-white md:rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 md:px-6 py-4 border-b border-b-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <img src="/images/logo/icon/not_found.png" className="w-5 h-5 hidden md:block" />
              Select Your Categories
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Choose categories that match your interests
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="bg-white px-3 w-28 min-w-fit py-1 rounded-full border">
              <span onClick={closeModal} className="text-sm font-medium cursor-pointer text-gray-700">
                {getTotalSelections()} selected
              </span>
            </div>
            {getTotalSelections() > 0 && (
              <button
                onClick={clearAllSelections}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex h-[80vh] md:h-96">
        {/* Main Selection Area */}
        <div className="flex-1 p-6">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search categories, subcategories, or items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setViewMode('hierarchy')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === 'hierarchy'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setViewMode('selected')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === 'selected'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              Selected ({getTotalSelections()})
            </button>
          </div>

          {/* Categories List */}
          <div className="space-y-2 h-[75%] md:max-h-72 overflow-y-auto pr-2">
            {viewMode === 'hierarchy' ? (
              filteredCategories.map((category) => {
                const selectionState = getCategorySelectionState(category._id);
                const isExpanded = expandedCategories.includes(category._id);

                return (
                  <div key={category._id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Category Header */}
                    <div className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <button
                        onClick={() => setExpandedCategories(prev =>
                          isExpanded ? prev.filter(id => id !== category._id) : [...prev, category._id]
                        )}
                        className="flex items-center gap-2 flex-1 text-left"
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        <span className="font-medium text-gray-800">{category.category}</span>
                        <span className="text-sm text-gray-500">
                          ({category.sub_category.reduce((acc, sub) => acc + sub.groups.length, 0)} items)
                        </span>
                      </button>
                      <div className="flex items-center gap-2">
                        {selectionState === 'partial' && (
                          <div className="w-3 h-3 bg-blue-200 border-2 border-blue-500 rounded"></div>
                        )}
                        <button
                          onClick={() => toggleCategory(category._id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selectionState === 'all'
                              ? 'bg-blue-500 border-blue-500 text-white'
                              : 'border-gray-300 hover:border-blue-400'
                            }`}
                        >
                          {selectionState === 'all' && <Check className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>

                    {/* Subcategories */}
                    {isExpanded && (
                      <div className="border-t border-gray-200">
                        {category.sub_category.map((sub) => {
                          const subSelectionState = getSubCategorySelectionState(sub._id);
                          const isSubExpanded = expandedSubCategories.includes(sub._id);

                          return (
                            <div key={sub._id} className="border-b border-gray-100 last:border-b-0">
                              {/* Subcategory Header */}
                              <div className="flex items-center p-3 pl-8 bg-white hover:bg-gray-50 transition-colors">
                                <button
                                  onClick={() => setExpandedSubCategories(prev =>
                                    isSubExpanded ? prev.filter(id => id !== sub._id) : [...prev, sub._id]
                                  )}
                                  className="flex items-center gap-2 flex-1 text-left"
                                >
                                  {isSubExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                  <span className="text-sm font-medium text-gray-700">{sub.label}</span>
                                  <span className="text-xs text-gray-500">({sub.groups.length} items)</span>
                                </button>
                                <div className="flex items-center gap-2">
                                  {subSelectionState === 'partial' && (
                                    <div className="w-2 h-2 bg-blue-200 border border-blue-500 rounded"></div>
                                  )}
                                  <button
                                    onClick={() => toggleSubCategory(category._id, sub._id)}
                                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${subSelectionState === 'all'
                                        ? 'bg-blue-500 border-blue-500 text-white'
                                        : 'border-gray-300 hover:border-blue-400'
                                      }`}
                                  >
                                    {subSelectionState === 'all' && <Check className="w-2 h-2" />}
                                  </button>
                                </div>
                              </div>

                              {/* Groups */}
                              {isSubExpanded && (
                                <div className="pl-12 pb-2">
                                  <div className="flex flex-wrap gap-2">
                                    {sub.groups.map((group) => (
                                      <button
                                        key={group._id}
                                        onClick={() => toggleGroup(category._id, sub._id, group._id)}
                                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${selectedGroups.includes(group._id)
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-blue-400'
                                          }`}
                                      >
                                        {group.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              /* Selected Items View */
              <div className="space-y-2">
                {getSelectedItemsPreview().map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{item.groupName}</div>
                      <div className="text-xs text-gray-600">
                        {item.categoryName} → {item.subName}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedGroups(prev => prev.filter(id => id !== item.groupId))}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {getTotalSelections() > 10 && (
                  <div className="text-center text-sm text-gray-500 py-2">
                    ... and {getTotalSelections() - 10} more items
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Selected Summary Sidebar */}
        <div className=" hidden md:block w-80 bg-gray-50 border-l-gray-200 border-l p-6">
          <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Selection Summary
          </h3>

          {getTotalSelections() === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Tag className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm">No categories selected yet</p>
              <p className="text-xs mt-1">Start by expanding and selecting categories</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-lg font-semibold text-blue-600">{selectedCategories.length}</div>
                  <div className="text-xs text-gray-600">Categories</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-lg font-semibold text-green-600">{selectedSubCategories.length}</div>
                  <div className="text-xs text-gray-600">Subcategories</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-lg font-semibold text-purple-600">{selectedGroups.length}</div>
                  <div className="text-xs text-gray-600">Items</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 max-h-40 overflow-y-auto">
                <div className="text-xs font-medium text-gray-600 mb-2">Recent Selections:</div>
                <div className="space-y-1">
                  {getSelectedItemsPreview().slice(0, 5).map((item, index) => (
                    <div key={index} className="text-xs text-gray-700 p-1 bg-gray-50 rounded">
                      {item.groupName}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
