'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import {
  Typography,
  Box,
  Grid,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material'
import Link from 'next/link'

import {
  InputBoxWithSideLabel,
  StoreBreadCrumb,
  BreadcrumbRightEle,
  MySwitch,
} from '../../../store/stores/component'
import Icon from '@/app/components/icon'
import { storeBottomBar } from '@/app/data/store/innerList'
import { useStoreData } from '@/app/hooks/useData'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'
import { updateStoreProfile } from '@/app/redux/state/slices/shop/settings/editShop'
// import ServiceRenderWrapper from '@/app/components/view/services/header'
import { SimpleDropDown } from '@/app/(pages)/dashboard/store/product-management/add-new-product/components'
import { removeOrAddToArray } from '@/app/utils/arrayFunctions'
import { WorkshopBreadCrumb } from '../../components'

const ServiceRenderWrapper = dynamic(
  () => import('@/app/components/view/services/header'),
  {
    ssr: false,
  }
)

const StorePage = ({ params }) => {
  const {
    storeInfo: { profile, data: branchData },
  } = useStoreData()
  const { data } = useSWR('/branch/all?sidelist=true')
  const InnerList = data?.data ? data.data : []

  const [refunds, setRefunds] = useState({})

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    service_delivery_type: profile?.service_delivery_type || '',
    mobile_service: {
      isset: profile?.mobile_service?.isset || false,
      locations: profile?.mobile_service?.locations || [],
    },
    payment_settings: {
      account_name: profile?.payment_settings?.account_name || '',
      account_number: profile?.payment_settings?.account_number || '',
      bank: profile?.payment_settings?.bank || '',
    },
    sevice_policies: {
      isset: profile?.sevice_policies?.isset || false,
      service_payment_type:
        profile?.sevice_policies?.service_payment_type || '',
      cancellation_policies:
        profile?.sevice_policies?.cancellation_policies || [],
      repayment_method: profile?.sevice_policies?.repayment_method || [],
    },
    allow_preorder: profile?.allow_preorder || false,
    service_notifications: {
      isset: profile?.service_notifications?.isset || false,
      new_booking: profile?.service_notifications?.new_booking || false,
      modify_booking: profile?.service_notifications?.modify_booking || false,
      account_activities:
        profile?.service_notifications?.account_activities || false,
      customer_inquires:
        profile?.service_notifications?.customer_inquires || false,
    },
  })

  useEffect(() => {
    setFormData(() => ({
      service_delivery_type: profile?.service_delivery_type || '',
      mobile_service: {
        isset: profile?.mobile_service?.isset || false,
        locations: profile?.mobile_service?.locations || [],
      },
      payment_settings: {
        account_name: profile?.payment_settings?.account_name || '',
        account_number: profile?.payment_settings?.account_number || '',
        bank: profile?.payment_settings?.bank || '',
      },
      sevice_policies: {
        isset: profile?.sevice_policies?.isset || false,
        service_payment_type:
          profile?.sevice_policies?.service_payment_type || '',
        cancellation_policies:
          profile?.sevice_policies?.cancellation_policies || [],
        repayment_method: profile?.sevice_policies?.repayment_method || [],
      },
      allow_preorder: profile?.allow_preorder || false,
      service_notifications: {
        isset: profile?.service_notifications?.isset || false,
        new_booking: profile?.service_notifications?.new_booking || false,
        modify_booking: profile?.service_notifications?.modify_booking || false,
        account_activities: profile?.service_notifications?.activities || false,
        customer_inquires:
          profile?.service_notifications?.customer_inquires || false,
      },
    }))
  }, [profile])

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value })
  }
  let newValue = {}
  const updateFormData = (newVal, variable, object, addingToArray) => {
    // variable === 'pickup' && (newValue = { pickup: newVal })
    if (!addingToArray) {
      object &&
        (newValue = { [object]: { ...formData[object], [variable]: newVal } })
    } else {
      removeOrAddToArray(
        [newVal],
        formData[object][variable],
        (updated) =>
          Array.isArray(updated) &&
          (newValue = {
            [object]: { ...formData[object], [variable]: updated },
          }),
        true
      )
    }

    setFormData({
      ...formData,
      ...newValue,
    })
  }
  const path = { ...params, sidebar: '/business' }

  const disableNotif = !formData.service_notifications.isset

  return (
    <ServiceRenderWrapper
      path={path}
      subListBar={false}
      BottomList={storeBottomBar}
      breadCrumbRIghtChildren={<BreadcrumbRightEle />}
      crumb={[...WorkshopBreadCrumb, { text: 'Settings', link: '' }]}
    >
      <Box className="px-10 !hidden sm:!flex z-50 ">
        <Link href="/dashboard/services/business">
          <Typography className="pb-1 border-b-2 cursor-pointer !text-[13px] !w-24 text-center border-transparent">
            Business Profile
          </Typography>
        </Link>
        <Typography className="pb-1 border-b-2 cursor-pointer !text-[13px] !w-32 !ml-6 text-center border-blue-900">
          Business Preference
        </Typography>
      </Box>
      <Box className="w-full bg-white !rounded-md !px-4  md:!p-8 !pb-8">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7}>
            <Box>
              <Typography className="!font-bold !text-gray-800 text-sm">
                Service Delivery Preferences
              </Typography>

              <Typography
                variant="caption"
                className="!text-[12px] !text-gray-600"
              >
                Choose how your business offers its services to clients. These
                preferences can vary depending on the nature of the service.
              </Typography>
            </Box>

            <Box>
              <Typography className="!font-semibold !text-gray-800 !text-[13px] !mt-6">
                Client Location Visits
              </Typography>
              <Box className="!flex !justify-between !items-center">
                <Typography
                  variant="caption"
                  className="!text-[12px] !text-gray-500 w-4/6"
                >
                  Indicate whether you are willing to visit the customer’s
                  location or require the customer to visit your office/shop.
                </Typography>

                <SimpleDropDown
                  render={['Client Visiting', 'Visiting Client', 'Both'].map(
                    (res, i) => (
                      <MenuItem key={i} value={res}>
                        {res}
                      </MenuItem>
                    )
                  )}
                  defaultValue={formData.service_delivery_type}
                  onChange={handleChange('service_delivery_type')}
                  sx={{ mb: 2, width: 150 }}
                />
              </Box>

              <Box className="!border-b pb-5">
                <Box className="flex items-center justify-between mt-5">
                  <Typography className="!font-semibold !text-gray-800 !text-[13px]">
                    Mobile Service Area:
                  </Typography>
                  <MySwitch
                    edge="end"
                    checked={formData.mobile_service.isset}
                    className="!md:mr-2"
                    onChange={() =>
                      updateFormData(
                        !formData.mobile_service.isset,
                        'isset',
                        'mobile_service'
                      )
                    }
                  />
                </Box>
                <Box className="!flex !justify-between !items-center">
                  <Typography
                    variant="caption"
                    className="!text-[12px] !text-gray-600 !mb-2"
                  >
                    Define the geographic area where mobile services are offered
                    (e.g., only within a specific city or distance from the
                    provider's base).
                  </Typography>
                </Box>
                <InputBoxWithSideLabel
                  value={formData.mobile_service.locations}
                  label="Select Locations"
                  onChange={(e) =>
                    updateFormData(
                      e.target.value,
                      'locations',
                      'mobile_service'
                    )
                  }
                />
              </Box>
            </Box>

            <Box className="mt-5 pb-8 border-b">
              <Typography className="!font-semibold !text-gray-800 !text-sm">
                Payment settings
              </Typography>
              <Typography
                variant="caption"
                className="!text-[13px] !text-gray-700"
              >
                This is the account with which the payment for the services is
                paid into.
              </Typography>
              <br />
              <br />

              <InputBoxWithSideLabel
                value={formData.payment_settings.bank}
                label="Bank Name"
                onChange={(e) =>
                  updateFormData(e.target.value, 'bank', 'payment_settings')
                }
              />
              <InputBoxWithSideLabel
                value={formData.payment_settings.account_name}
                label="Account Name"
                onChange={(e) =>
                  updateFormData(
                    e.target.value,
                    'account_name',
                    'payment_settings'
                  )
                }
              />
              <InputBoxWithSideLabel
                value={formData.payment_settings.account_number}
                label="Account Number"
                onChange={(e) =>
                  updateFormData(
                    e.target.value,
                    'account_number',
                    'payment_settings'
                  )
                }
              />
            </Box>

            <Box className="mt-5 pb-8 border-b">
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography className="!font-semibold !text-gray-800 text-sm">
                    Business Policies
                  </Typography>
                  <Typography
                    variant="caption"
                    className="!text-[13px] !text-gray-700"
                  >
                    Input some policies for your services
                  </Typography>
                </Box>
                <MySwitch
                  edge="end"
                  checked={formData.sevice_policies.isset}
                  className="!md:mr-2"
                  onChange={() =>
                    updateFormData(
                      !formData.sevice_policies.isset,
                      'isset',
                      'sevice_policies'
                    )
                  }
                />
              </Box>
              <br />

              <Box className="flex items-center justify-between pl-2 md:pl-5">
                <Typography
                  variant="caption"
                  className="!text-[13px] !text-gray-700"
                >
                  Upfront Payment or After Service:
                </Typography>
                <SimpleDropDown
                  render={['Upfront Payment', 'After Service'].map((res, i) => (
                    <MenuItem key={i} value={res}>
                      {res}
                    </MenuItem>
                  ))}
                  defaultValue={formData.sevice_policies.service_payment_type}
                  onChange={(e) =>
                    updateFormData(
                      e.target.value,
                      'service_payment_type',
                      'sevice_policies'
                    )
                  }
                  sx={{ mb: 1, width: 150 }}
                />
              </Box>
              <Box className="flex items-center justify-between pl-2 md:pl-5 !mt-3">
                <Typography
                  variant="caption"
                  className="!text-[13px] !text-gray-700"
                >
                  Cancellation Policies
                </Typography>

                <SimpleDropDown
                  render={[
                    'Flexible Cancellation',
                    'Same-Day Cancellation Fee',
                    '24-Hour in Advance Cancellation Fee',
                    '48-Hour in Advance Cancellation Fee',
                  ].map((res, i) => (
                    <MenuItem key={i} value={res}>
                      <Box className="flex items-center !h-8">
                        <Checkbox
                          checked={formData.sevice_policies.cancellation_policies.includes(
                            res
                          )}
                          size="small"
                          className="!h-8"
                          name="basic-unchecked"
                        />
                        <Typography
                          variant="body2"
                          className="!text-[13px] !text-gray-700 h-"
                        >
                          {res}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                  defaultValue={'Both'}
                  onChange={(e) =>
                    updateFormData(
                      e.target.value,
                      'cancellation_policies',
                      'sevice_policies',
                      true
                    )
                  }
                  sx={{ mb: 1, width: 150 }}
                />
              </Box>

              <Box className="justify-between pl-2 md:pl-5 !mt-3">
                <Box className="flex items-center justify-between !mb-5">
                  <Typography
                    variant="body2"
                    className="!text-[13px] !text-gray-950  !font-bold"
                  >
                    Refund Policy Setup
                  </Typography>
                  {formData.sevice_policies.cancellation_policies.length >
                    0 && (
                    <Button
                      onClick={() =>
                        updateFormData(
                          [],
                          'cancellation_policies',
                          'sevice_policies'
                        )
                      }
                      className="!text-red-500"
                    >
                      Clear
                    </Button>
                  )}
                </Box>
                <Box className="justify-between pl-2 md:pl-5 !mt-3">
                  {formData.sevice_policies.cancellation_policies.map(
                    (each, i) => (
                      <InputBoxWithSideLabel
                        key={i}
                        value={refunds[each]}
                        label={each}
                        inputProps={{ type: 'number', max: 12 }}
                        shortInput
                        className="!mb-2"
                        onChange={(e) =>
                          setRefunds((prev) => ({
                            ...prev,
                            [each]: e.target.value,
                          }))
                        }
                      />
                    )
                  )}
                </Box>
              </Box>
            </Box>

            <Box className="mt-5 pb-8 border-b">
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography className="!font-semibold !text-gray-800 text-sm">
                    Notification and Alerts
                  </Typography>
                  <Typography
                    variant="caption"
                    className="!text-[13px] !text-gray-700"
                  >
                    This includes receiving notification from all the services
                    you provide
                  </Typography>
                </Box>
                <MySwitch
                  edge="end"
                  checked={formData.service_notifications.isset}
                  className="!md:mr-2"
                  onChange={() =>
                    updateFormData(
                      !formData.service_notifications.isset,
                      'isset',
                      'service_notifications'
                    )
                  }
                />
              </Box>
              <br />

              <FormControlLabel
                className="!mt-2 !pl-3"
                onChange={() =>
                  updateFormData(
                    !formData.service_notifications.new_booking,
                    'new_booking',
                    'service_notifications'
                  )
                }
                label={
                  <Box>
                    <Typography
                      variant="body2"
                      className="!text-[13px] !font-semibold !text-gray-800"
                    >
                      New Booking Notification
                    </Typography>
                    <Typography
                      variant="caption"
                      className="!text-[13px] !text-gray-700"
                    >
                      When a client books a new service.
                    </Typography>
                  </Box>
                }
                control={
                  <Checkbox
                    disabled={disableNotif}
                    checked={formData.service_notifications.new_booking}
                    name="basic-unchecked"
                  />
                }
              />

              <FormControlLabel
                className="!mt-4 !pl-3"
                onChange={() =>
                  updateFormData(
                    !formData.service_notifications.modify_booking,
                    'modify_booking',
                    'service_notifications'
                  )
                }
                label={
                  <Box>
                    <Typography
                      variant="body2"
                      className="!text-[13px] !font-semibold !text-gray-800"
                    >
                      Booking Modification
                    </Typography>
                    <Typography
                      variant="caption"
                      className="!text-[13px] !text-gray-700 !leading-3"
                    >
                      When a client reschedules or changes booking details
                      (e.g., time, service type).
                    </Typography>
                  </Box>
                }
                control={
                  <Checkbox
                    disabled={disableNotif}
                    checked={formData.service_notifications.modify_booking}
                    name="basic-unchecked"
                  />
                }
              />

              <FormControlLabel
                className="!mt-4 !pl-3"
                onChange={() =>
                  updateFormData(
                    !formData.service_notifications.account_activities,
                    'account_activities',
                    'service_notifications'
                  )
                }
                label={
                  <Box>
                    <Typography
                      variant="body2"
                      className="!text-[13px] !font-semibold !text-gray-800"
                    >
                      Account Activity
                    </Typography>
                    <Typography
                      variant="caption"
                      className="!text-[13px] !text-gray-700"
                    >
                      When there is account-related activities, such as password
                      changes, login attempts, or account settings modifications
                    </Typography>
                  </Box>
                }
                control={
                  <Checkbox
                    disabled={disableNotif}
                    checked={formData.service_notifications.account_activities}
                    name="basic-unchecked"
                  />
                }
              />

              <FormControlLabel
                className="!mt-4 !pl-3"
                onChange={() =>
                  updateFormData(
                    !formData.service_notifications.customer_inquires,
                    'customer_inquires',
                    'service_notifications'
                  )
                }
                label={
                  <Box>
                    <Typography
                      variant="body2"
                      className="!text-[13px] !font-semibold !text-gray-800"
                    >
                      Customer Inquiries
                    </Typography>
                    <Typography
                      variant="caption"
                      className="!text-[13px] !text-gray-700"
                    >
                      When there is any enquiry from the customer.
                    </Typography>
                  </Box>
                }
                control={
                  <Checkbox
                    disabled={disableNotif}
                    checked={formData.service_notifications.customer_inquires}
                    name="basic-unchecked"
                  />
                }
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="!py-2 !bg-blue-900"
              startIcon={<Icon icon="tabler:device-floppy" />}
              onClick={() => updateStoreProfile(dispatch, formData)}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box className="h-[500px] bg-gray-50 md:!mt-44">
              <h3 className="text-center py-10"> Map here</h3>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ServiceRenderWrapper>
  )
}

export default StorePage
