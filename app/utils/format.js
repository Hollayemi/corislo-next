/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */

import { Typography, Box } from "@mui/material";

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date();

  return (
    new Date(date).getDate() === today.getDate() &&
    new Date(date).getMonth() === today.getMonth() &&
    new Date(date).getFullYear() === today.getFullYear()
  );
};

export const intervals = {
  daily: {
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thur",
    5: "Fri",
    6: "Sat",
    7: "Sun",
  },
  monthly: {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  },
};

export const timeSince = (date) => {
  const currentDate = new Date();
  const timeElapsedInSeconds = Math.floor((currentDate - date) / 1000);

  if (timeElapsedInSeconds < 60) {
    return "Just now";
  } else if (timeElapsedInSeconds < 3600) {
    const minutes = Math.floor(timeElapsedInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (timeElapsedInSeconds < 86400) {
    const hours = Math.floor(timeElapsedInSeconds / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (timeElapsedInSeconds < 604800) {
    const days = Math.floor(timeElapsedInSeconds / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (timeElapsedInSeconds < 2419200) {
    const weeks = Math.floor(timeElapsedInSeconds / 604800);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (timeElapsedInSeconds < 29030400) {
    // Approximately one year
    const months = Math.floor(timeElapsedInSeconds / 2419200);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(timeElapsedInSeconds / 29030400); // Approximately one year
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
};

export const changeTime = (prevDate) => {
  prevDate = new Date(prevDate);
  const newDate = new Date();
  const timeDiff = newDate.getTime() - prevDate.getTime();
  let period = Math.floor(timeDiff / (1000 * 60));

  let realTime;
  if (period > 60) {
    period = Math.floor(timeDiff / (1000 * 3600));
    if (period > 23) {
      if (period > 720) {
        realTime = `${Math.floor(period / 30)} months ago`;
      } else if (Math.floor(Math.floor(period) / 24) > 1) {
        realTime = `${Math.floor(Math.floor(period) / 24)} days ago`;
      } else {
        realTime = `${Math.floor(Math.floor(period) / 24)} day ago`;
      }
    } else {
      realTime = `${Math.floor(period)} hours ago`;
    }
  } else if (Math.floor(period) > 59) {
    realTime = `${Math.floor(period / 60)} hours ago`;
  } else if (Math.floor(period) > 0) {
    realTime = `${Math.floor(period)} minutes ago`;
  } else {
    realTime = " Just now";
  }

  return realTime;
};

export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value;

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (
  value,
  toTimeForCurrentDay = true,
  format = {}
) => {
  const date = new Date(value);
  let formatting = { month: "short", day: "numeric", ...format };
  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

export const generateDateRange = (startDate, endDate, interval) => {
  let dates = [];
  let currentDate = new Date(startDate);

  while (currentDate < endDate) {
    if (interval === "Daily") {
      dates.push(new Date(currentDate).getDate());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    if (interval === "Weekly") {
      dates.push(
        `${intervals.monthly[new Date(currentDate).getMonth() + 1]} ${new Date(
          currentDate
        ).getDate()}`
      );
      currentDate.setDate(currentDate.getDate() + 7);
    }

    if (interval === "Monthly") {
      dates.push(intervals.monthly[new Date(currentDate).getMonth() + 1]);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }
  if (interval === "Monthly") {
    dates.push(intervals.monthly[new Date(currentDate).getMonth() + 1]);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return dates;
};

// ? The following functions are taken from https://codesandbox.io/s/ovvwzkzry9?file=/utils.js for formatting credit card details
// Get only numbers from the input value
const clearNumber = (value = "") => {
  return value.replace(/\D+/g, "");
};

export const detectCardType = (card) => {
  if (/^4/.test(card) && card.length > 3) {
    return "visa";
  } else if (/^5/.test(card) && card.length > 3) {
    return "mastercard";
  } else {
    return false;
  }
};

// Format credit cards according to their types
export const formatCreditCardNumber = (value, Payment) => {
  if (!value) {
    return value;
  }
  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;
  switch (issuer) {
    case "amex":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 15)}`;
      break;
    case "dinersclub":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 14)}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)}   ${clearValue.slice(
        4,
        8
      )}  ${clearValue.slice(8, 12)}  ${clearValue.slice(12, 16)}`;
      break;
  }

  return nextValue.trim();
};

// Format expiration date in any credit card
export const formatExpirationDate = (value) => {
  const finalValue = value
    .replace(/^([1-9]\/|[2-9])$/g, "0$1/") // 3 > 03/
    .replace(/^(0[1-9]|1[0-2])$/g, "$1/") // 11 > 11/
    .replace(/^([0-1])([3-9])$/g, "0$1/$2") // 13 > 01/3
    .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, "$1/$2") // 141 > 01/41
    .replace(/^([0]+)\/|[0]+$/g, "0") // 0/ > 0 and 00 > 0
    // To allow only digits and `/`
    .replace(/[^\d\/]|^[\/]*$/g, "")
    .replace(/\/\//g, "/"); // Prevent entering more than 1 `/`

  return finalValue.slice(0, 5);
  // return finalValue;
};

// Format CVC in any credit card
export const formatCVC = (value, cardNumber, Payment) => {
  const clearValue = clearNumber(value);
  const issuer = Payment.fns.cardType(cardNumber);
  const maxLength = issuer === "amex" ? 4 : 3;

  return clearValue.slice(0, maxLength);
};

export const calculateDateDiff = (
  timeSpan,
  initialDate = new Date(),
  operator = "-",
  noFormat
) => {
  const today = new Date(initialDate);
  const dateSplit = timeSpan.split("_");
  const howMany = parseInt(dateSplit[0]);
  const prediod = dateSplit[1];


  if (prediod === "day" || prediod === "days") {
    const daysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      operator === "-"
        ? today.getDate() - 1 * howMany
        : today.getDate() + 1 * howMany
    );
    daysAgo.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

    return noFormat ? daysAgo : formatDate(daysAgo);
  }

  if (prediod === "week" || prediod === "weeks") {
    const theDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      operator === "-"
        ? today.getDate() - 7 * howMany
        : today.getDate() + 7 * howMany
    );

    return formatDate(theDate);
  }

  if (prediod === "month" || prediod === "months") {
    const theDate = new Date(
      today.getFullYear(),
      operator === "-"
        ? today.getMonth() - 1 * howMany
        : today.getMonth() + 1 * howMany,
      1
    );

    return formatDate(theDate);
  }

  if (prediod === "year" || prediod === "years") {
    const oneYearAgo = new Date(
      operator === "-"
        ? today.getFullYear() - 1 * howMany
        : today.getFullYear() + 1 * howMany,
      today.getMonth(),
      today.getDate()
    );
    oneYearAgo.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

    return formatDate(oneYearAgo);
  }
  return formatDate(today); //
};

export const formatShippingAddress = (address) => {
  console.log(address);
  return (
    <Typography variant="h5" className="!text-xs">
      {/* {`${address?.address}, ${address?.city}, ${address?.state}, ${address?.postal_code}`} */}
    </Typography>
  );
};

export const formatSegmentation = (orders, totalAmount, lastSeen) => {
  let categ = "Recent Buyer";
  let color = "orange";
  const timeDifference = Math.abs(new Date(lastSeen) - new Date());
  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksDifference = Math.floor(timeDifference / millisecondsPerWeek);

  if (orders >= 10 && totalAmount.parseInt() > 100000) {
    categ = "High Spender";
    color = "red";
  }
  if (orders > 15 && totalAmount.parseInt() < 100000) {
    categ = "Frequent Buyer";
    color = "green";
  }
  if (weeksDifference > 4) {
    categ = "Inactive Buyer";
    color = "gray";
  }
  if (orders === 1) {
    categ = "First time buyer Buyer";
    color = "error";
  }
  return (
    <Typography>
      <Box
        className={`!text-xs !whitespace-break-spaces flex items-center `}
        color={color}
      >
        <Box
          bgcolor={color}
          className="w-4 h-4 shrink-0 rounded-full mr-2"
        ></Box>

        {categ}
      </Box>
    </Typography>
  );
};

export const formatCurrency = (amount, currency = "NGN", sign = "NG") => {
  const formattedCurrencyUS = new Intl.NumberFormat(`en-${sign}`, {
    style: "currency",
    currency,
  }).format(amount);
  return formattedCurrencyUS;
};

export const summarizeFollowers = (followers) => {
  if (followers < 1500) {
    return followers.toString(); // Return as is if below 1500
  } else if (followers < 1000000) {
    const abbreviatedValue = (followers / 1000).toFixed(1);
    return `${abbreviatedValue}k`;
  } else {
    const abbreviatedValue = (followers / 1000000).toFixed(1);
    return `${abbreviatedValue}M`;
  }
};

export const mySubstring = (string = "", num = 15, start = 0) => {
  if (string.length < num) {
    return string;
  } else {
    return `${string.substring(start, parseInt(num))} ${
      string.length > num + start ? "..." : ""
    }`;
  }
};

export const ngnPrice = (price) => `NGN ${price?.toLocaleString()}`;
