"use client";
import { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  InputAdornment,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Switch,
} from "@mui/material";
import Link from "next/link";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import Image from "next/image";
import themeConfig from "@/app/configs/themeConfig";

import {
  InputBoxWithSideLabel,
  StoreBreadCrumb,
  BreadcrumbRightEle,
  FileUploader,
  OpeningHours,
  SocialMediaConponent,
} from "../component";
import Icon from "@/app/components/icon";
import { storeBottomBar, storeInnerList } from "@/app/data/store/innerList";
import { useStoreData } from "@/app/hooks/useData";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { updateStoreProfile } from "@/app/redux/state/slices/shop/settings/editShop";

const StorePage = ({ params }) => {
  const {
    storeInfo: { profile, data: branchData },
  } = useStoreData();
  const { data } = useSWR("/branch/all?sidelist=true");
  const InnerList = data?.data ? data.data : [];

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    pickup: profile?.pickup || false,
    waybill: {
      isset: profile?.waybill?.isset || false,
      waybill_fee_paid_seperately:
        profile?.waybill?.waybill_fee_paid_seperately || false,
      minimum_amount: profile?.waybill?.minimum_amount || "0",
      delivery_hour_diff_opening_hours:
        profile?.waybill?.delivery_hour_diff_opening_hours || false,
    },
    payment_settings: {
      account_name: profile?.payment_settings?.account_name || "",
      account_number: profile?.payment_settings?.account_number || "",
      bank: profile?.payment_settings?.bank || "",
    },
    refund_policies: {
      isset: profile?.refund_policies?.isset || false,
      refund_policy: profile?.refund_policies?.refund_policy || "",
      refund_option: profile?.refund_policies?.refund_option || [],
      repayment_method: profile?.refund_policies?.repayment_method || [],
    },
    allow_preorder: profile?.allow_preorder || false,
    notifications: {
      isset: profile?.notifications?.isset || false,
      low_stock: profile?.notifications?.low_stock || 0,
      isset_low_stock: profile?.notifications?.isset_low_stock || false,
      out_of_stock: profile?.notifications?.out_of_stock || false,
      restock_reminder: profile?.notifications?.restock_reminder || false,
    },
    email_notification: {
      isset: profile?.email_notification?.isset || false,
      order_confirmation:
        profile?.email_notification?.order_confirmation || false,
      shipping_updates: profile?.email_notification?.shipping_updates || false,
      account_activity: profile?.email_notification?.account_activity || false,
      customer_inquires:
        profile?.email_notification?.customer_inquires || false,
    },
  });

  console.log(profile, formData);

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };
  let newValue = {};
  const updateFormData = (newVal, variable, object) => {
    variable === "pickup" && (newValue = { pickup: newVal });
    variable === "allow_preorder" && (newValue = { allow_preorder: newVal });
    object === "waybill" &&
      (newValue = { waybill: { ...formData.waybill, [variable]: newVal } });

    object === "payment_settings" &&
      (newValue = {
        payment_settings: { ...formData.payment_settings, [variable]: newVal },
      });

    object === "refund_policies" &&
      (newValue = {
        refund_policies: { ...formData.refund_policies, [variable]: newVal },
      });

    object === "notifications" &&
      (newValue = {
        notifications: { ...formData.notifications, [variable]: newVal },
      });

    object === "email_notification" &&
      (newValue = {
        email_notification: {
          ...formData.email_notification,
          [variable]: newVal,
        },
      });

    setFormData({
      ...formData,
      ...newValue,
    });
  };
  const path = { ...params, sidebar: "stores" };

  const disableEmail =
    !formData.email_notification.isset || !formData.notifications.isset;
  const disableNotif = !formData.notifications.isset;
  const disableWaybill = !formData.waybill.isset;
  const disableRefund = !formData.refund_policies.isset;

  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      InnerList={{ title: "Store List", content: InnerList }}
      BottomList={storeBottomBar}
      breadCrumbRIghtChildren={<BreadcrumbRightEle />}
      crumb={[
        ...StoreBreadCrumb,
        {
          text: branchData?.branchName,
          link: `stores/${branchData?.branchName}`,
        },
        { text: "Settings", link: "" },
      ]}
    >
      <Box className="px-10 !hidden sm:!flex z-50 -mt-4">
        <Link href="/store/dashboard/stores">
          <Typography className="pb-1 border-b-2 cursor-pointer !text-[13px] !w-24 text-center border-transparent">
            Store Profile
          </Typography>
        </Link>
        <Typography className="pb-1 border-b-2 cursor-pointer !text-[13px] !w-28 !ml-6 text-center border-blue-900">
          Store Settings
        </Typography>
      </Box>
      <Box className="w-full bg-white !rounded-md !px-4 !mt-4 !md:px-5 !pb-8">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7}>
            <Box>
              <Typography className="!font-bold text-sm">
                Delivery Option
              </Typography>

              <Typography variant="caption">
                Choose the options of your delivery
              </Typography>
            </Box>

            <Box>
              <Typography className="!font-semibold text-sm !mt-6">
                Pickup
              </Typography>
              <Box className="!flex !justify-between !items-center">
                <Typography variant="caption" className="!text-[11px] ">
                  Client has to come pick up the orders by themselves.
                </Typography>
                <Switch
                  edge="end"
                  checked={formData.pickup}
                  className="!md:mr-2"
                  onChange={(e) => updateFormData(!formData.pickup, "pickup")}
                />
              </Box>

              <Box className="!border-b pb-5">
                <Box className="flex items-center justify-between mt-5">
                  <Typography className="!font-semibold !text-sm">
                    Waybill
                  </Typography>
                  <Switch
                    edge="end"
                    checked={formData.waybill.isset}
                    className="!md:mr-2"
                    onChange={(e) =>
                      updateFormData(
                        !formData.waybill.isset,
                        "isset",
                        "waybill"
                      )
                    }
                  />
                </Box>
                <FormGroup row>
                  <FormControlLabel
                    className="!mt-2"
                    onChange={(e) =>
                      updateFormData(
                        !formData.waybill.waybill_fee_paid_seperately,
                        "waybill_fee_paid_seperately",
                        "waybill"
                      )
                    }
                    label={
                      <Box>
                        <Typography variant="caption" className="">
                          Waybill Fees will be paid by customer seperately
                        </Typography>
                      </Box>
                    }
                    control={
                      <Checkbox
                        defaultChecked
                        disabled={disableWaybill}
                        name="basic-checked"
                      />
                    }
                  />
                  <Box className="flex items-center justify-between">
                    <FormControlLabel
                      className="!mt-2"
                      label={
                        <Box>
                          {/* <Typography variant="body2" className="!text-[11px] !font-semibold">
                            Minimum amount value
                          </Typography> */}
                          <Typography
                            variant="caption"
                            className=" text-[11px]"
                          >
                            Minimum amount of goods that must be bought for the
                            waybill option
                          </Typography>
                        </Box>
                      }
                      control={
                        <Checkbox
                          disabled={disableWaybill}
                          name="basic-unchecked"
                        />
                      }
                    />
                    <TextField
                      id="icons-start-adornment"
                      size="small"
                      defaultValue={formData.waybill.minimum_amount}
                      disabled={disableWaybill}
                      className="shrink-0 !w-28 !p-0"
                      onChange={(e) =>
                        updateFormData(
                          e.target.value,
                          "minimum_amount",
                          "waybill"
                        )
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon
                              icon="tabler:currency-naira"
                              className="!px-0"
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <FormControlLabel
                    className="!mt-2"
                    onChange={(e) =>
                      updateFormData(
                        !formData.waybill.delivery_hour_diff_opening_hours,
                        "delivery_hour_diff_opening_hours",
                        "waybill"
                      )
                    }
                    label={
                      <Box>
                        <Typography variant="caption" className="">
                          Delivery hours are different from opening hours.
                        </Typography>
                      </Box>
                    }
                    control={
                      <Checkbox
                        defaultChecked
                        disabled={disableWaybill}
                        name="basic-disabled-checked"
                      />
                    }
                  />
                </FormGroup>
              </Box>
            </Box>

            <Box className="mt-5 pb-8 border-b">
              <Typography className="!font-semibold !text-sm">
                Payment settings
              </Typography>
              <Typography variant="caption" className="text-[11px] ">
                This is the account with which the payment for the purchase is
                paid into.
              </Typography>
              <br />
              <br />

              <InputBoxWithSideLabel
                value={formData.payment_settings.bank}
                label="Bank Name"
                onChange={(e) =>
                  updateFormData(e.target.value, "bank", "payment_settings")
                }
              />
              <InputBoxWithSideLabel
                value={formData.payment_settings.account_name}
                label="Account Name"
                onChange={(e) =>
                  updateFormData(
                    e.target.value,
                    "account_name",
                    "payment_settings"
                  )
                }
              />
              <InputBoxWithSideLabel
                value={formData.payment_settings.account_number}
                label="Account Number"
                onChange={(e) =>
                  updateFormData(
                    e.target.value,
                    "account_number",
                    "payment_settings"
                  )
                }
              />
            </Box>

            <Box className="mt-5 pb-8 border-b">
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography className="!font-semibold text-sm">
                    Store Policies
                  </Typography>
                  <Typography variant="caption" className="">
                    input some policies for your store
                  </Typography>
                </Box>
                <Switch
                  edge="end"
                  checked={formData.refund_policies.isset}
                  className="!md:mr-2"
                  onChange={(e) =>
                    updateFormData(
                      !formData.refund_policies.isset,
                      "isset",
                      "refund_policies"
                    )
                  }
                />
              </Box>
              <br />

              <Box className="flex items-center justify-between pl-2 md:pl-5">
                <Typography variant="caption" className="">
                  Refund and Returns
                </Typography>

                <Select
                  label="6 days after delivery"
                  defaultValue="6 days after delivery"
                  id="demo-simple-select-outlined"
                  size="small"
                  className="w-32 md:40"
                  disabled={disableRefund}
                  labelId="demo-simple-select-outlined-label"
                  onChange={(e) =>
                    updateFormData(
                      e.target.value,
                      "refund_policy",
                      "refund_policies"
                    )
                  }
                >
                  <MenuItem value="2 days after delivery">
                    2 days after delivery
                  </MenuItem>
                  <MenuItem value="4 days after delivery">
                    4 days after delivery
                  </MenuItem>
                  <MenuItem value="6 days after delivery">
                    6 days after delivery
                  </MenuItem>
                  <MenuItem value="8 days after delivery">
                    8 days after delivery
                  </MenuItem>
                </Select>
              </Box>
              <Box className="flex items-center justify-between pl-2 md:pl-5 !mt-3">
                <Typography variant="caption" className="">
                  Refund and Returns option
                </Typography>

                <Select
                  label="Drop at the store"
                  defaultValue="rop at the store"
                  id="demo-simple-select-outlined"
                  size="small"
                  disabled={disableRefund}
                  multiple
                  onChange={(e) =>
                    updateFormData(
                      e.target.value,
                      "refund_option",
                      "refund_policies"
                    )
                  }
                  value={formData.refund_policies.refund_option}
                  className="w-32 md:40"
                >
                  <MenuItem value="Drop at the store">
                    Drop at the store
                  </MenuItem>
                  <MenuItem value="Drop at the store">
                    Drop at the store
                  </MenuItem>
                </Select>
              </Box>

              <Box className="flex items-center justify-between pl-2 md:pl-5 !mt-3">
                <Typography variant="caption" className="">
                  Repayment method
                </Typography>

                <Select
                  label="Repayment method"
                  defaultValue="Pick same value product"
                  multiple
                  disabled={disableRefund}
                  value={formData.refund_policies.repayment_method}
                  id="demo-simple-select-outlined"
                  size="small"
                  className="w-32 md:40"
                  onChange={(e) =>
                    updateFormData(
                      e.target.value,
                      "repayment_method",
                      "refund_policies"
                    )
                  }
                >
                  <MenuItem value={"Pick same value product"}>
                    Pick same value product
                  </MenuItem>
                  <MenuItem value="Returns Fund">Return Fund</MenuItem>
                  <MenuItem value="Pick any product">Pick any product</MenuItem>
                </Select>
              </Box>

              <FormControlLabel
                className="!mt-6"
                onChange={() =>
                  updateFormData(!formData.allow_preorder, "allow_preorder")
                }
                label={
                  <Box>
                    <Typography variant="body2" className="!font-semibold">
                      Pre - Order option
                    </Typography>
                    <Typography
                      variant="caption"
                      className="text-[11px] leading-3"
                    >
                      Allows stores to give room to customers to pre-order by
                      messaging directly about the product to be pre-ordered.
                    </Typography>
                  </Box>
                }
                control={
                  <Checkbox
                    name="basic-unchecked"
                    checked={formData.allow_preorder}
                  />
                }
              />
            </Box>

            <Box className="mt-5 pb-8 border-b">
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography className="!font-semibold text-sm">
                    Notification and Alerts
                  </Typography>
                  <Typography variant="caption" className="!text-[11px] ">
                    This includes receiving notification for low stock
                  </Typography>
                </Box>
                <Switch
                  edge="end"
                  checked={formData.notifications.isset}
                  className="!md:mr-2"
                  onChange={(e) =>
                    updateFormData(
                      !formData.notifications.isset,
                      "isset",
                      "notifications"
                    )
                  }
                />
              </Box>
              <br />

              <Box className="flex items-center justify-between">
                <FormControlLabel
                  className="!mt-2"
                  onChange={(e) =>
                    updateFormData(
                      !formData.notifications.isset_low_stock,
                      "isset_low_stock",
                      "notifications"
                    )
                  }
                  label={
                    <Box>
                      <Typography variant="body2" className="!text-[12px]">
                        Low Stock
                      </Typography>
                      <Typography variant="caption" className="!text-[11px]">
                        The minimum amount of goods left
                      </Typography>
                    </Box>
                  }
                  control={
                    <Checkbox
                      name="basic-unchecked"
                      disabled={disableNotif}
                      checked={formData.notifications.isset_low_stock}
                    />
                  }
                />
                <TextField
                  id="icons-start-adornment"
                  size="small"
                  disabled={disableNotif}
                  defaultValue={formData.notifications.low_stock || 0}
                  className="shrink-0 !w-28 !p-0"
                  type="number"
                  onChange={(e) =>
                    updateFormData(e.target.value, "low_stock", "notifications")
                  }
                />
              </Box>

              <FormControlLabel
                className="!mt-2"
                onChange={(e) =>
                  updateFormData(
                    !formData.notifications.out_of_stock,
                    "out_of_stock",
                    "notifications"
                  )
                }
                label={
                  <Box>
                    <Typography variant="caption" className="">
                      Out of stock
                    </Typography>
                  </Box>
                }
                control={
                  <Checkbox
                    disabled={disableNotif}
                    checked={formData.notifications.out_of_stock}
                    name="basic-disabled-checked"
                  />
                }
              />
              <br />
              <FormControlLabel
                className="!mt-2"
                onChange={(e) =>
                  updateFormData(
                    !formData.notifications.restock_reminder,
                    "restock_reminder",
                    "notifications"
                  )
                }
                label={
                  <Box>
                    <Typography variant="caption" className="">
                      Restock Reminder
                    </Typography>
                  </Box>
                }
                control={
                  <Checkbox
                    disabled={disableNotif}
                    checked={formData.notifications.restock_reminder}
                    name="basic-disabled-checked"
                  />
                }
              />
              <br />
              <FormControlLabel
                className="!mt-2"
                onChange={(e) =>
                  updateFormData(
                    !formData.email_notification.isset,
                    "isset",
                    "email_notification"
                  )
                }
                label={
                  <Box>
                    <Typography variant="caption" className="">
                      Email Notification
                    </Typography>
                  </Box>
                }
                control={
                  <Checkbox
                    disabled={disableNotif}
                    checked={formData.email_notification.isset}
                    name="basic-disabled-checked"
                  />
                }
              />
              <br />
              <FormControlLabel
                className="!mt-4 !pl-6"
                onChange={(e) =>
                  updateFormData(
                    !formData.email_notification.order_confirmation,
                    "order_confirmation",
                    "email_notification"
                  )
                }
                label={
                  <Box>
                    <Typography variant="body2" className="!text-[11px] !font-semibold">
                      Order Confirmations
                    </Typography>
                    <Typography variant="caption" className="!text-[11px]">
                      When an order is placed on any product
                    </Typography>
                  </Box>
                }
                control={
                  <Checkbox
                    disabled={disableEmail}
                    checked={formData.email_notification.order_confirmation}
                    name="basic-unchecked"
                  />
                }
              />

              <FormControlLabel
                className="!mt-4 !pl-6"
                onChange={(e) =>
                  updateFormData(
                    !formData.email_notification.shipping_updates,
                    "shipping_updates",
                    "email_notification"
                  )
                }
                label={
                  <Box>
                    <Typography variant="body2" className="!text-[11px] !font-semibold">
                      Shipping Updates
                    </Typography>
                    <Typography variant="caption" className="!text-[11px] !leading-3">
                      When there is update or changes to the order status, such
                      as waybilling and more.
                    </Typography>
                  </Box>
                }
                control={
                  <Checkbox
                    disabled={disableEmail}
                    checked={formData.email_notification.shipping_updates}
                    name="basic-unchecked"
                  />
                }
              />

              <FormControlLabel
                className="!mt-4 !pl-6"
                onChange={(e) =>
                  updateFormData(
                    !formData.email_notification.account_activity,
                    "account_activity",
                    "email_notification"
                  )
                }
                label={
                  <Box>
                    <Typography variant="body2" className="!text-[11px] !font-semibold">
                      Account Activity
                    </Typography>
                    <Typography variant="caption" className="!text-[11px]">
                      When there is account-related activities, such as password
                      changes, login attempts, or account settings modifications
                    </Typography>
                  </Box>
                }
                control={
                  <Checkbox
                    disabled={disableEmail}
                    checked={formData.email_notification.account_activity}
                    name="basic-unchecked"
                  />
                }
              />

              <FormControlLabel
                className="!mt-4 !pl-6"
                onChange={(e) =>
                  updateFormData(
                    !formData.email_notification.customer_inquires,
                    "customer_inquires",
                    "email_notification"
                  )
                }
                label={
                  <Box>
                    <Typography variant="body2" className="!text-[11px] !font-semibold">
                      Customer Inquiries
                    </Typography>
                    <Typography variant="caption" className="!text-[11px]">
                      When there is any enquiry from the customer.
                    </Typography>
                  </Box>
                }
                control={
                  <Checkbox
                    disabled={disableEmail}
                    checked={formData.email_notification.customer_inquires}
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
            <Box className="!hidden md:!flex justify-end mb-32">
              <Button
                variant="contained"
                className="mr-4 bg-blue-900"
                startIcon={<Icon icon="tabler:plus" />}
              >
                Add Store
              </Button>
            </Box>
            <Box className="h-[500px] bg-gray-50 ">
              <h3 className="text-center py-10"> Map here</h3>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </StoreLeftSideBar>
  );
};

export default StorePage;
