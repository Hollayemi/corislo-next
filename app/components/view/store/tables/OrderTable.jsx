"use client";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const OrderTable = ({
  columns,
  rows,
  onRowClick = () => {},
  loading = false,
  size,
  tableProps = {},
  search = ""
}) => {
  console.log(rows)
  const myRows = rows.map((e, i) => {
    return { ...e, id: i };
  });
  // ** States
  const [data] = useState(myRows);
  const [pageSize, setPageSize] = useState(size || 7);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (search) {
      setSearchText(search);
      const searchRegex = new RegExp(escapeRegExp(search), "i");
      const filteredRows = data.filter((row) => {
        return Object.keys(row).some((field) => {
          // @ts-ignore
          return searchRegex.test(row[field]?.toString());
        });
      });
      setFilteredData(filteredRows);
    } else {
      setFilteredData([]);
    }
  }
  , [search, data]);

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
    <DataGrid
      loading={loading}
      autoHeight
      columns={columns}
      pageSize={pageSize}
      rowsPerPageOptions={[7, 10, 25, 50]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize,
          },
        },
      }}
      onRowClick={(e) => onRowClick(e.row)}
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
      sx={{ border: "none" }}
      {...tableProps
        
      }
    />
  );
};

export default OrderTable;
