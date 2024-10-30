'use client'
import StoreLeftSideBar from '@/app/components/view/store/LeftSideBar'
import { settingsInnerList } from '@/app/data/store/innerList'
import { Box, Button, Typography } from '@mui/material'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from '@mui/material'
import Image from 'next/image'
import { settingsBreadCrumb } from '../components'
import { TitleSubtitle } from '@/app/(pages)/user/components'
import IconifyIcon from '@/app/components/icon'
import { detectCardType, formatDate } from '@/app/utils/format'
import { history, historyHeader } from './billing.components'
import { useState } from 'react'
import { reshapePrice } from '../../marketing/components'
import BillingCard from './addCard'
import useSWR from 'swr'
import { CircleLoader } from '@/app/components/cards/loader'
import { businessSubscription } from '@/app/redux/state/slices/shop/settings/payment'
import { useDispatch } from 'react-redux'

const Billing = ({ params }) => {
  const dispatch = useDispatch()
  const path = {
    ...params,
    sidebar: 'settings',
    sublist: 'billing',
  }
  const { data, isLoading: cardLoading } = useSWR('/store/billings')
  const card = data?.data[0] || {}
  const [page, setPage] = useState(0)
  const [rightOpen, setRightOpen] = useState(null)
  const [rowsPerPage, setRowsPerPage] = useState(30)
  const [dialogInfo, updateDialogInfo] = useState({
    open: false,
    title: 'Action Confirmation',
    acceptFunctionText: 'Yes, Cancel Subscription',
    alert:
      'Are you sure to proceed the cancellation on this plan. this action cannot be reversed',
    acceptFunction: () => {
      createRole({ title: roleTitle }, dispatch)
    },
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const cardType = detectCardType(card.openDigits && card.openDigits[0])
  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      InnerList={settingsInnerList}
      crumb={[...settingsBreadCrumb, { text: 'Billing', link: 'billing' }]}
      dialogInfo={dialogInfo}
      updateDialogInfo={updateDialogInfo}
      rightOpen={rightOpen}
      setRightOpen={setRightOpen}
    >
      <Box className="h-ful w-full bg-white px-1 md:px-5 py-8 rounded-md">
        <TitleSubtitle
          title="Billing"
          titleClass="!text-[17px]"
          subtitle="See information regarding your current plan"
          subtitleClass="!text-[13px] !mt-2"
          className=""
        />

        <Box className="w-full py-6 px-1 md:px-4 border border-slate-50 rounded-xl mt-3">
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
                  onClick={() =>
                    updateDialogInfo({ ...dialogInfo, open: true })
                  }
                  className="!text-red-500 hover:!bg-transparent !px-0 !h-6 "
                >
                  Cancel Subscription
                </Button>
                <Button
                  variant="contained"
                  className="!absolute !top-2 !text-[11px] md:!text-[13px] w-[120px] md:!w-auto !h-8 md:!h-10 !right-2 !rounded-full !mt-1.5 !mr-1.5 !shadow-none"
                  onClick={() =>
                    businessSubscription(dispatch, {
                      plan_name: 'Zetto',
                      period: 'monthly',
                    })
                  }
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
              {!cardLoading && card.name ? (
                <>
                  <Box className="flex items-center justify-between mt-2 mb-7">
                    <Image
                      src={`/images/misc/${cardType}.png`}
                      alt="imcard"
                      className="w-14 h-10 p-1 border rounded-md"
                      width={100}
                      height={100}
                    />
                    <Box className="flex flex-col items-center mx-2">
                      <Typography variant="body2" className="!text-[12px]">
                        {card.openDigits &&
                          card.openDigits[0] + '*********' + card.openDigits[1]}
                      </Typography>
                      <Typography variant="body2" className="!text-[10px]">
                        Exp Date: {card.expiry}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      className="!text-[11px] md:!text-[13px] w-20 !h-8  !rounded-full !mt-1.5 !mr-1.5 !shadow-none"
                      onClick={() => setRightOpen(<BillingCard card={card} />)}
                    >
                      Update
                    </Button>
                  </Box>
                  <Box className="flex items-center">
                    <IconifyIcon
                      icon="tabler:mail"
                      className="mr-1 !text-[17px]"
                    />
                    <Typography variant="caption" className="!text-[12px]">
                      {card.email}
                    </Typography>
                  </Box>
                </>
              ) : (
                <Box className="flex justify-center mt-6">
                  {cardLoading ? (
                    <CircleLoader />
                  ) : (
                    <Box className="flex flex-col items-center justify-center">
                      <Typography
                        variant="caption"
                        className="!text-[12px] !mb-2"
                      >
                        No Card Found
                      </Typography>
                      <Button
                        variant="outlined"
                        className="!text-[11px] md:!text-[13px] w-28 !h-8  !rounded-full !mt-1.5 !mr-1.5 !shadow-none"
                        onClick={() => setRightOpen(<BillingCard card={{}} />)}
                      >
                        Add Card
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Box>

          <TitleSubtitle
            title="Billing History"
            titleClass="!text-[13px] !mb-3"
          />

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                      )
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
  )
}

export default Billing
