"use client";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { settingsInnerList } from "@/app/data/store/innerList";
import { Box, Button, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import Image from "next/image";
import { settingsBreadCrumb } from "../components";
import { TitleSubtitle } from "@/app/(pages)/user/components";
import IconifyIcon from "@/app/components/icon";
import { formatDate } from "@/app/utils/format";
import { history, historyHeader } from "./billing.components";
import { useState } from "react";
import { reshapePrice } from "../../marketing/components";

const Billing = ({ params }) => {
  const path = {
    ...params,
    sidebar: "settings",
    sublist: "billing",
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [dialogInfo, updateDialogInfo] = useState({
    open: false,
    title: "Action Confirmation",
    acceptFunctionText: "Yes, Cancel Subscription",
    alert: "Are you sure to proceed the cancellation on this plan. this action cannot be reversed",
    acceptFunction: () => {
      createRole({ title: roleTitle }, dispatch);
    },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      InnerList={settingsInnerList}
      crumb={[...settingsBreadCrumb, { text: "Billing", link: "billing" }]}
      dialogInfo={dialogInfo}
      updateDialogInfo={updateDialogInfo}
    >
      <Box className="h-ful w-full bg-white px-2 md:px-5 py-8 rounded-md">
        <TitleSubtitle
          title="Billing"
          titleClass="!text-[17px]"
          subtitle="See information regarding your current plan"
          subtitleClass="!text-[13px] !mt-2"
          className=""
        />

        <Box className="w-full py-6 px-4 border border-slate-50 rounded-xl mt-3">
          <TitleSubtitle
            title="Customer Plan"
            titleClass="!text-[13px] !mb-3"
          />
          <Box className="flex flex-col md:flex-row items-center mb-8">
            <Box className="w-full md:w-3/5 md:pr-5">
              <Box className="bg-gray-50 h-40 rounded-lg p-5 relative">
                <TitleSubtitle
                  title="Corislo Basic"
                  titleClass="!text-[15px]"
                  subtitle="Current plan ends on Monday, Nov 23, 2023."
                  subtitleClass="!text-[12px] !mt-2 md:!mt-0.5"
                  className="mb-2"
                />

                <br />
                <Typography variant="caption" className="!text-[12px]">
                  Need any help? contact us at info@corisio.com
                </Typography>
                <br />
                <Button
                  onClick={() => updateDialogInfo({ ...dialogInfo, open: true })}
                  className="!text-red-500 hover:!bg-transparent !px-0 !h-6 "
                >
                  Cancel Subscription
                </Button>
                <Button
                  variant="contained"
                  className="!absolute !top-2 !text-[11px] md:!text-[13px] w-[120px] md:!w-auto !h-8 md:!h-10 !right-2 !rounded-full !mt-1.5 !mr-1.5 !shadow-none"
                >
                  Upgrade Plan
                </Button>
              </Box>
            </Box>
            <Box className="border h-40 rounded-lg p-5 w-full md:w-2/5 mt-4 md:mt-0">
              <TitleSubtitle
                title="Payment Method"
                titleClass="!text-[15px]"
                className=""
              />
              <Box className="flex items-center justify-between mt-2 mb-7">
                <Image
                  src="/images/misc/mastercard.png"
                  alt="imcard"
                  className="w-16 h-8 p-1 border rounded-md"
                  width={100}
                  height={100}
                />
                <Box className="flex flex-col items-center mx-2">
                  <Typography variant="body2" className="!text-[12px]">
                    44555*********5344
                  </Typography>
                  <Typography variant="body2" className="!text-[10px]">
                    Exp Date: {formatDate(new Date())}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  className="!text-[11px] md:!text-[13px] w-20 !h-8  !rounded-full !mt-1.5 !mr-1.5 !shadow-none"
                >
                  Update
                </Button>
              </Box>

              <Box className="flex items-center">
                <IconifyIcon icon="tabler:mail" className="mr-1 !text-[17px]" />
                <Typography variant="caption" className="!text-[12px]">
                  billing@mamafeeds.com
                </Typography>
              </Box>
            </Box>
          </Box>

          <TitleSubtitle
            title="Billing History"
            titleClass="!text-[13px] !mb-3"
          />

          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {historyHeader.map((column, i) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((row, i) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                          <TableCell>{row.invoice}</TableCell>
                          <TableCell>{reshapePrice(row.amount)}</TableCell>
                          <TableCell>{formatDate(row.date)}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>{row.action}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[30, 25, 100]}
              component="div"
              count={history.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
};

export default Billing;
