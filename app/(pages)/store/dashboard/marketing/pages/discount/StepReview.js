// ** MUI Imports
import {
  Box,
Grid,
Table,
Switch,
TableRow,
TableBody,
TableCell,
Typography,
TableContainer,
FormControlLabel,
} from '@mui/material'

// ** Custom Components Imports
import CustomChip from '@/app/components/chip'
import { formatDate } from "@/app/utils/format";

const ReviewComplete = ({ campaignData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={6} xl={7}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Almost done! 🚀
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Confirm your campaign details information and submit to create it.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableBody
                  sx={{
                    "& .MuiTableCell-root": {
                      borderBottom: 0,
                      verticalAlign: "top",
                      "&:last-of-type": { px: "0 !important" },
                      "&:first-of-type": { pl: "0 !important" },
                      py: (theme) => `${theme.spacing(0.75)} !important`,
                    },
                  }}
                >
                  <TableRow>
                    <TableCell>
                      <Typography
                        noWrap
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                      >
                        Campaign Type
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: "text.secondary" }}>
                        {campaignData.campaignType}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        noWrap
                        XVXVXVX
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                      >
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: "text.secondary" }}>
                        {campaignData.discount}%
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        noWrap
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                      >
                        Campaign Code
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <CustomChip
                        rounded
                        size="small"
                        skin="light"
                        color="warning"
                        label={campaignData.code}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        noWrap
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                      >
                        Deal Title
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: "text.secondary" }}>
                        {campaignData.title}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        noWrap
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                      >
                        Deal Duration
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: "text.secondary" }}>
                        {formatDate(campaignData.startDate)} to{" "}
                        {formatDate(campaignData.endDate)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {/* <Grid item xs={12}>
            <FormControlLabel control={<Switch />} label='I have confirmed the deal details.' />
          </Grid> */}
        </Grid>
      </Grid>
      <Grid
        item
        lg={6}
        xl={5}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          "& img": { maxWidth: "100%" },
        }}
      >
        <Box
          sx={{
            pt: 5,
            px: 5,
            width: "100%",
            display: "flex",
            borderRadius: 1,
            alignItems: "flex-end",
            justifyContent: "center",
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <img
            height={230}
            alt="review-illustration"
            src="/images/pages/create-deal-review-complete.png"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ReviewComplete
