"use client";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";

import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { settingsInnerList } from "@/app/data/store/innerList";
import { settingsBreadCrumb } from "../components";
import { useEffect, useState } from "react";
import { TitleSubtitle } from "@/app/(pages)/user/components";
import { Checked, defaultCol } from "./role.components";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import {
  createRole,
  deleteRole,
  updatePermission,
} from "@/app/redux/state/slices/shop/permission";
import IconifyIcon from "@/app/components/icon";
import { formatName } from "@/app/utils/get-initials";

const RoleInput = ({ setRoleTitle, roleTitle }) => {
  return (
    <Box className="">
      <TextField
        placeholder="Role title"
        size="small"
        className="w-80"
        value={roleTitle}
        onChange={(e) => setRoleTitle(e.target.value)}
      />
    </Box>
  );
};

const Roles = ({ params }) => {
  const dispatch = useDispatch();
  const path = { ...params, sidebar: "settings", sublist: "role" };
  const { data, isLoading } = useSWR("/store/roles");
  const config = data?.data || {};

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [roleTitle, setRoleTitle] = useState("");
  const [dialogInfo, updateDialogInfo] = useState({
    open: false,
    title: "Create Role",
    acceptFunctionText: "Create",
    acceptFunction: () => {
      createRole({ title: roleTitle }, dispatch);
    },
  });

  const [permissions, updatePermissions] = useState(config?.permissions || []);

  useEffect(() => {
    config?.permissions && updatePermissions(config?.permissions || []);
  }, [data]);

  const tickBox = (index, to) => {
    // Create a new array based on the current permissions
    const newPermissions = [...permissions];
    const change = newPermissions[index];
    // Update the specific item in the new array
    newPermissions[index] = { ...change, ...to };

    // Update the state with the new array
    updatePermissions(newPermissions);
    const getM = Object.keys(to);
    const message = `${formatName(getM[0].split("_").join("-"))} is ${
      !to[getM[0]] ? "not" : ""
    } allowed to ${change.action.toLowerCase()}`;
    updatePermission(dispatch, { newPermissions, message });
  };

  useEffect(() => {
    updateDialogInfo({
      ...dialogInfo,
      acceptFunction: () => {
        createRole({ title: roleTitle }, dispatch);
      },
    });
  }, [roleTitle]);

  let roles =
    config?.roles?.map((x) => {
      return {
        id: x.toLowerCase().split(" ").join("_"),
        label: x,
        minWidth: 80,
      };
    }) || [];

  roles = [...defaultCol, ...roles];

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
      dialogInfo={dialogInfo}
      updateDialogInfo={updateDialogInfo}
      dialogComponent={
        <RoleInput setRoleTitle={setRoleTitle} roleTitle={roleTitle} />
      }
      crumb={[
        ...settingsBreadCrumb,
        { text: "Role & Permission", link: "role" },
      ]}
    >
      <Box className="h-ful w-full bg-white px-5 py-8 rounded-md">
        <Box>
          <Box className="flex items-center justify-between mb-5">
            <TitleSubtitle
              title="Role & Permission"
              titleClass="!text-[17px]"
              subtitle="You are currently logged into these device(s):"
              subtitleClass="!text-[13px] !mt-2"
              className=""
            />
            <Button
              variant="contained"
              className="!shadow-none !text-[13px] !h-8 w-32 !rounded-md"
              onClick={() => updateDialogInfo({ ...dialogInfo, open: true })}
            >
              New Role
            </Button>
          </Box>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {roles.map((column, i) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        <Box className="flex items-center group">
                          {formatName(column.label)}
                          {i > 3 && (
                            <IconifyIcon
                              icon="tabler:trash"
                              onClick={() => deleteRole(dispatch, column.label)}
                              className="!text-[18px] ml-2 !text-red-500 cursor-pointer opacity-0 group-hover:opacity-100"
                            />
                          )}
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {permissions
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((row, i) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                          {Object.keys(row).map((x, j) =>
                            j < 2 ? (
                              <TableCell key={j}>{row[x]}</TableCell>
                            ) : (
                              <TableCell key={j}>
                                <Checked
                                  check={row[x]}
                                  onClick={() => tickBox(i, { [x]: !row[x] })}
                                />
                              </TableCell>
                            )
                          )}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[30, 25, 100]}
              component="div"
              count={permissions.length}
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

export default Roles;
