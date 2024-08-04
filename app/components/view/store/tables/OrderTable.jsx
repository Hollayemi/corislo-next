"use client";
// ** React Imports
import { useState } from "react";

// ** MUI Imports
import { DataGrid } from "@mui/x-data-grid";

// ** Custom Components
import QuickSearchToolbar from "@/app/components/quickTool/QuickSearchToolbar";

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const OrderTable = ({
  columns,
  rows,
  onRowClick = () => {},
  loading = false,
}) => {
  const myRows = rows.map((e, i) => {
    return { ...e, id: i };
  });
  // ** States
  const [data] = useState(myRows);
  const [pageSize, setPageSize] = useState(7);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");

    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        // @ts-ignore
        return searchRegex.test(row[field].toString());
      });
    });
    if (searchValue.length) {
      setFilteredData(filteredRows);
    } else {
      setFilteredData([]);
    }
  };
  return (
    // <Grid container>
    //   <Grid
    //     item
    //     xs={12}
    //     className="!w-[385px] !max-w-[385px] md:!w-full md:!max-w-full overflow-scroll md:overflow-auto border md:border-none shadow md:shadow-none"
    //   >
    <DataGrid
      loading={loading}
      autoHeight
      columns={columns}
      pageSize={pageSize}
      rowsPerPageOptions={[7, 10, 25, 50]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      onRowClick={(e) => onRowClick(e.row, e.id)}
      rows={filteredData.length ? filteredData : data}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      componentsProps={{
        baseButton: {
          variant: "outlined",
        },
        toolbar: {
          value: searchText,
          clearSearch: () => handleSearch(""),
          onChange: (event) => handleSearch(event.target.value),
        },
      }}
      // minWidth={300}
      // className="w-[1220px]  md:w-full"
      sx={{ border: "none" }}
    />
    //   </Grid>
    // </Grid>
  );
};

export default OrderTable;
