// ** MUI Imports
import { formatCurrency } from "@/app/utils/format";
import {
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
} from "@mui/material";

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
};

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const OrderProductList = ({ rows }) => {
  return (
    // <TableContainer component={Paper} className="!w-[300px]" elevation={0}>
    <Table sx={{ minWidth: 200, overflow: "auto" }}>
      <TableHead>
        <TableRow
          sx={{
            "td, th": {
              border: 0,
              fontWeight: "bold",
            },
          }}
        >
          <TableCell>Product Name</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Quantity</TableCell>
          <TableCell align="right">Total Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{
              "td, th": {
                border: 0,
                height: 12,
              },
            }}
          >
            <TableCell component="th" scope="row">
              {row.productName}
            </TableCell>
            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="right">{row.qty}</TableCell>
            <TableCell align="right">
              {formatCurrency(row.totalAmount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // </TableContainer>
  );
};

export default OrderProductList;
