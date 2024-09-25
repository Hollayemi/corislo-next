"use client";
import { forwardRef, Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  CardContent,
  Card,
} from "@mui/material";
import HomeWrapper from "@/app/components/view/home";
import { agentUpdateHandle } from "@/app/redux/state/slices/agents/agentInfo";
import Icon from "@/app/components/icon";
import CustomAvatar from "@/app/components/avatar";
import Image from "next/image";
import { MyTextField } from "../../user/components";
import { copyToClipboard } from "@/app/utils/clipboard";
import useSWR from "swr";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShareIcon = ({ icon }) => {
  return (
    <Box className="w-8 h-8 mx-1 bg-gray-100 rounded-md flex justify-center items-center cursor-pointer text-gray-400 hover:!text-blue-800">
      <Icon
        icon={icon}
        className="!text-[22px]  transition-all duration-300 text-inherit"
      />
    </Box>
  );
};

const ReferralDashboard = () => {
  const dispatch = useDispatch();
  // ** State
  const [open, setOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { data, isLoading } = useSWR("/agent");
  const agentData = data?.data[0] || {};

  const reshapePrice = (price) => {
    if (typeof parseInt(price) === 'number') {
      return parseInt(price).toLocaleString()
    }
  }

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [accountDetails, setAccountName] = useState({
    account_number: agentData.account_number || "",
    bank_name: agentData.account_number || "",
    account_name: agentData.account_number || "",
  });

  const handleUpdateBank = () => {
    agentUpdateHandle(dispatch, accountDetails);
    handleClose();
  };

  const handleAccountInputs =
    (prop) =>
    ({ target }) => {
      setAccountName((data) => {
        return { ...data, [prop]: target.value };
      });
    };

  const price = 8000;
  console.log(agentData)
  return (
    <HomeWrapper noFooter>
      <Box className="flex flex-col md:flex-row items-start px-1  md:px-2 lg:px-16 mt-4 mb-14">
        <Box className="w-full md:w-2/5  px-2">
          <Box className="flex justify-between h-[170px] bg-white p-5 px-6 rounded-xl">
            <Box>
              <Typography
                varinat="caption"
                className="!text-[14px] !text-gray-600 !font-bold"
              >
                Your client referral stats
              </Typography>
              <Typography
                variation="body2"
                className="!text-4xl !font-black !text-black !mt-3"
              >
                ₦ <span className="mr-2">{reshapePrice(agentData.amount)}</span>
              </Typography>

              <Button
                variant="contained"
                className="!shadow-none !h-10 !w-40 !text-[13px] !mt-6"
                endIcon={<Icon icon="tabler:arrow-narrow-right" />}
              >
                Withdraw
              </Button>
            </Box>
            <Box className="flex flex-col justify-between">
              <Box>
                <Typography
                  variation="body2"
                  className="!text-[15px] !font-bold !text-black !mb-1"
                >
                  {agentData.storeRegistered + agentData.agentRegistered}
                </Typography>
                <Typography
                  varinat="caption"
                  className="!text-[12px] !text-gray-400 !font-bold"
                >
                  Clients Referred
                </Typography>
              </Box>
              <Box>
                <Typography
                  variation="body2"
                  className="!text-[13px] !font-bold !text-black !mb-1"
                >
                  {agentData.coin}
                </Typography>
                <Typography
                  varinat="caption"
                  className="!text-[12px] !text-gray-400 !font-bold"
                >
                  Point Balance
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="h-[200px] flex justify-between bg-white p-5 px-3 md:px-6 mt-4 rounded-xl">
            <Box>
              <Typography
                varinat="caption"
                className="!text-[14px] !text-gray-600 !font-bold"
              >
                Lifetime Earnings
              </Typography>
              <Typography
                variation="body2"
                className="!text-xl !font-black !text-black !mt-2"
              >
                ₦{' '}
                <span className="mr-2">
                  {reshapePrice(agentData.lifeEarning)}
                </span>
              </Typography>
              <Box className="flex items-center mt-6">
                <EarningsBoxes
                  color="green"
                  title="Referrals"
                  price={reshapePrice(agentData.fromReferring)}
                  about="From referrals"
                />
                <EarningsBoxes
                  color="blue"
                  title="Points"
                  price={reshapePrice(
                    parseInt(agentData.used_coin || 0) +
                      parseInt(agentData.coin)
                  )}
                  about="From other activities"
                />
                <EarningsBoxes
                  color="gray"
                  title="Withdrawn"
                  price={reshapePrice(agentData.withdrawn)}
                  about="From other activities"
                />
              </Box>
            </Box>
          </Box>
          <Box className="h-[200px] flex justify-between bg-white p-5 px-3 md:px-6 mt-4 rounded-xl">
            <Box className="w-full">
              <Typography
                varinat="caption"
                className="!text-[14px] !text-gray-600 !font-bold"
              >
                Share your unique referral link
              </Typography>

              <Box className="flex items-start justify-between mt-6 !w-full">
                <Box className="w-full">
                  <Box className="w-full p-1 border flex items-center focus-within:border-blue-300 rounded">
                    <input
                      type="text"
                      className="border-none h-10 px-4 grow outline-none"
                      value={`https://corisio.vercel.app/store/register?ref=${agentData.ref_id}`}
                    />
                    <Button
                      variant="contained"
                      className="!shadow-none"
                      onClick={() =>
                        copyToClipboard(
                          `https://corisio.vercel.app/store/register?ref=${agentData.ref_id}`,
                          setIsCopied
                        )
                      }
                    >
                      {!isCopied ? 'Copy' : 'Copied'}
                    </Button>
                  </Box>
                  <Box className="flex items-center justify-center  mt-6">
                    <Typography
                      varinat="body2"
                      className="!text-[12px] !text-gray-900 !font-bold !mr-4"
                    >
                      Share on:
                    </Typography>
                    <ShareIcon icon="tabler:brand-facebook" />
                    <ShareIcon icon="tabler:brand-x" />
                    <ShareIcon icon="tabler:brand-instagram" />
                    <ShareIcon icon="tabler:brand-linkedin" />
                    <ShareIcon icon="tabler:brand-whatsapp" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="h-[130px] flex justify-between bg-white p-5 px-3 md:px-6 mt-4 rounded-xl">
            <Box className="w-full">
              <Typography
                varinat="caption"
                className="!text-[14px] !text-gray-600 !font-bold"
              >
                Set Bank Details
              </Typography>

              <Box className="flex items-start justify-between mt-6 !w-full">
                <Box className="w-3/4">
                  <Typography
                    noWrap
                    varinat="body2"
                    className="!text-[14px] !text-gray-900 !font-bold !w-full sm:!w-3/4 md:!w-full"
                  >
                    {agentData.account_name}
                  </Typography>
                  <Typography
                    varinat="caption"
                    className="!text-[11px] !text-gray-400"
                  >
                    {agentData.account_number}
                    <span className="ml-2 !text-[12px]">
                      {agentData.bank_name}
                    </span>
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  className="!text-[11px] !h-10 !w-32 !shadow-none"
                  onClick={handleClickOpen}
                >
                  Set Bank Details
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="px-2 w-full md:w-3/5 mt-4 md:mt-0">
          <Box className="px-5 py-10 rounded-xl bg-white flex items-center">
            <Box>
              <Typography
                variant="body1"
                className="!text-[20px] !font-bold !mb-2"
              >
                Earn valuable <br /> tokens effortlessly
              </Typography>
              <Typography variant="body2" className="!text-[12px] !leading-6">
                Looking for resources on how to register a store or need
                assistance? Click the 'Support Hub' button below for guides,
                FAQs, and expert help. We're here to support you every step of
                the way in building your network and earning rewards.
              </Typography>

              <Box className="flex md:hidden justify-center w-full">
                <Image
                  src="/images/misc/referral-svg.png"
                  alt="circle"
                  width={400}
                  height={400}
                  className="w-80 !flex-shrink-0"
                />
              </Box>

              <Button
                variant="contained"
                className="!shadow-none !h-10 w-full md:!w-60 !text-[13px] !mt-6"
                endIcon={<Icon icon="tabler:arrow-narrow-right" />}
              >
                Support & Resources
              </Button>
            </Box>
            <Box className="hidden md:flex justify-center w-full">
              <Image
                src="/images/misc/referral-svg.png"
                alt="circle"
                width={400}
                height={400}
                className="w-80 !flex-shrink-0"
              />
            </Box>
          </Box>

          <Box className="px-2 py-2 rounded-xl bg-white flex items-center mt-4">
            <ActivityTable />
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          className="!text-[16px] !mt-2"
        >
          Update Bank Account Details
        </DialogTitle>
        <DialogContent>
          <MyTextField
            title="Full Name"
            value={accountDetails.account_name}
            onChange={handleAccountInputs('account_name')}
            PClassName="w-full md:w-auto"
          />
          <Box className="flex">
            <MyTextField
              title="Account Number"
              value={accountDetails.account_number}
              onChange={handleAccountInputs('account_number')}
              PClassName="w-full md:w-auto px-1"
            />
            <MyTextField
              title="Bank"
              value={accountDetails.bank_name}
              onChange={handleAccountInputs('bank_name')}
              PClassName="w-full md:w-auto px-1"
            />
          </Box>
        </DialogContent>
        <DialogActions className="dialog-actions-dense !mb-4">
          <Button onClick={handleClose}>close</Button>
          <Button
            variant="contained"
            className="!shadow-none"
            onClick={handleUpdateBank}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </HomeWrapper>
  )
};

export default ReferralDashboard;

const EarningsBoxes = ({ color, price, title, about }) => (
  <Box
    className={`w-28 md:w-32 h-20 mx-1 px-2.5 p-1.5 !rounded-md bg-${color}-50 flex flex-col justify-between`}
  >
    <Typography
      variation="body2"
      className="!text-[14px] !font-bold !text-black"
    >
      ₦ <span className="mr-2">{price}</span>
    </Typography>
    <Box>
      <Typography
        variation="body2"
        className="!text-[12px] !font-bold !text-black"
      >
        {title}
      </Typography>
      <Typography variation="caption" className="!text-[10px] !text-gray-400">
        {about}
      </Typography>
    </Box>
  </Box>
);

const data = [
  {
    title: "You registered a store (Starbucks)",
    subtitle: "Starbucks was registered today",
    amount: 75,
    amountDiff: "negative",
    avatarColor: "primary",
    avatarIcon: "tabler:wallet",
  },
  {
    title: "You added money via Bank Transfer",
    subtitle: "Money added via Bank Transfer",
    amount: 480,
    avatarColor: "success",
    avatarIcon: "tabler:browser-check",
  },
  {
    title: "You received a client payment via PayPal",
    subtitle: "Client payment received via PayPal",
    amount: 268,
    avatarColor: "error",
    avatarIcon: "tabler:brand-paypal",
  },
  {
    title: "You ordered an iPhone 13",
    subtitle: "iPhone 13 ordered",
    amount: 699,
    amountDiff: "negative",
    avatarColor: "secondary",
    avatarIcon: "tabler:credit-card",
  },
  {
    title: "You received a refund via Bank Transaction",
    subtitle: "Refund received via Bank Transaction",
    amount: 98,
    avatarColor: "info",
    avatarIcon: "tabler:currency-dollar",
  },
  {
    title: "You received a client payment via PayPal",
    subtitle: "Client payment received via PayPal",
    amount: 126,
    avatarColor: "error",
    avatarIcon: "tabler:brand-paypal",
  },
  {
    title: "You paid office rent via Bank Transfer",
    subtitle: "Office rent paid via Bank Transfer",
    amount: 1290,
    amountDiff: "negative",
    avatarColor: "success",
    avatarIcon: "tabler:browser-check",
  },
];

const ActivityTable = () => {
  return (
    <Card className="w-full !shadow-none h-[400px]">
      <Box className="!px-3 !py-3 w-full">
        <Typography className="text-[13px] font-bold">Activities</Typography>
      </Box>
      <CardContent className="!overflow-auto">
        {data.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: index !== data.length - 1 ? 3.75 : undefined,
              }}
            >
              <CustomAvatar
                skin="light"
                variant="rounded"
                color={item.avatarColor}
                sx={{ mr: 4, width: 34, height: 34 }}
              >
                <Icon icon={item.avatarIcon} />
              </CustomAvatar>
              <Box
                sx={{
                  rowGap: 1,
                  columnGap: 4,
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography sx={{ fontWeight: 500 }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: "text.disabled" }}>
                    {item.subtitle}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontWeight: 500,
                    color:
                      item.amountDiff === "negative"
                        ? "error.main"
                        : "success.main",
                  }}
                >
                  {`${item.amountDiff === "negative" ? "-" : "+"}₦${
                    item.amount
                  }`}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};
