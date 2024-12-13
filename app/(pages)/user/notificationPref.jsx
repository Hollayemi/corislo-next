import { Box, Switch } from "@mui/material";
import React, { useState } from "react";
import { MyCheckBox, TitleSubtitle } from "./components";
import { useUserData } from "@/app/hooks/useData";
import { updateUserAccount } from "@/app/redux/state/slices/users/updateAccount";
import { useDispatch } from "react-redux";

const NotificationPref = () => {
  const { userInfo } = useUserData()
  const dispatch = useDispatch()
  const userPref = userInfo.notification_pref;
  const [formData, setFormData] = useState({
    order_updates: userPref.order_updates,
    promotion_discounts: userPref.promotion_discounts,
    new_messages: userPref.new_messages,
    product_restock: userPref.product_restock,
    sales_events: userPref.sales_events,
    account_activities: userPref.account_activities,
    push_notification: userPref.push_notification,
    email_notification: userPref.email_notification,
    sms_notification: userPref.sms_notification,
  });
  console.log(formData);

  const updateFormData = (prop) => {
    console.log(prop);
    const update = { ...formData, [prop]: !formData[prop] };
    updateUserAccount({ notification_pref: update }, dispatch);
    setFormData((prev) => {
      return { ...prev, [prop]: !prev[prop] };
    });
  };
  return (
    <Box>
      <TitleSubtitle title="Notifications" />
      <Box className="flex flex-col mt-5">
        <TitleSubtitle title="Notify me for..." titleClass="!text-[14px]" />
        <MyCheckBox
          label="Order Updates"
          checked={formData?.order_updates}
          onChange={() => updateFormData("order_updates")}
        />
        <MyCheckBox
          label="Promotions and Discounts"
          checked={formData?.promotion_discounts}
          onChange={() => updateFormData("promotion_discounts")}
        />
        <MyCheckBox
          label="New Messages"
          checked={formData?.new_messages}
          onChange={() => updateFormData("new_messages")}
        />
        <MyCheckBox
          label="Product Restocks"
          checked={formData?.product_restock}
          onChange={() => updateFormData("product_restock")}
        />
        <MyCheckBox
          label="Sales and Events"
          checked={formData?.sales_events}
          onChange={() => updateFormData("sales_events")}
        />
        <MyCheckBox
          label="Account Activities"
          checked={formData?.account_activities}
          onChange={() => updateFormData("account_activities")}
        />
      </Box>

      <Box>
        <Box className="relative mt-6 w-full md:w-10/12">
          <TitleSubtitle
            title="Push Notifications"
            subtitle="Enable or disable push notifications to receive alerts and updates directly to your device."
            titleClass="!text-[14px]"
            subtitleClass="!text-[13px] !mt-2"
            className="w-5/6 md:w-10/12"
          />
          <Switch
            edge="end"
            checked={formData?.push_notification}
            className="!absolute !right-0 !top-4"
            onChange={() => updateFormData("push_notification")}
          />
        </Box>
        <Box className="relative mt-6 w-full md:w-10/12">
          <TitleSubtitle
            title="Email Notifications"
            subtitle="Choose to receive notifications via email for important updates and promotions."
            titleClass="!text-[14px]"
            subtitleClass="!text-[13px] !mt-2"
            className="w-5/6 md:w-10/12"
          />
          <Switch
            edge="end"
            checked={formData?.email_notification}
            className="!absolute !right-0 !top-4"
            onChange={() => updateFormData("email_notification")}
          />
        </Box>
        <Box className="relative mt-6 w-full md:w-10/12">
          <TitleSubtitle
            title="SMS Notifications:"
            subtitle="Opt to receive notifications via text messages for urgent alerts."
            titleClass="!text-[14px]"
            subtitleClass="!text-[13px] !mt-2"
            className="w-5/6 md:w-10/12"
          />
          <Switch
            edge="end"
            checked={formData?.sms_notification}
            className="!absolute !right-0 !top-4"
            onChange={(e) => updateFormData("sms_notification")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationPref;
