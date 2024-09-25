import { Box, TextField } from "@mui/material";

export const defaultCol = [
  { id: "module", label: "Module", minWidth: 180 },
  { id: "actions", label: "Actions", minWidth: 180 },
];

export const permissions = [
  {
    module: "User Management",
    action: "View Staff",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: false,
  },
  {
    module: "",
    action: "Create Staff",
    superAdmin: true,
    branchAdmin: false,
    storeManager: false,
    staff: false,
  },
  {
    module: "",
    action: "Edit Staff",
    superAdmin: true,
    branchAdmin: false,
    storeManager: false,
    staff: false,
  },
  {
    module: "",
    action: "Delete Staff",
    superAdmin: true,
    branchAdmin: false,
    storeManager: false,
    staff: false,
  },
  {
    module: "Role Management",
    action: "View Roles",
    superAdmin: true,
    branchAdmin: true,
    storeManager: false,
    staff: false,
  },
  {
    module: "",
    action: "Create Roles",
    superAdmin: true,
    branchAdmin: false,
    storeManager: false,
    staff: false,
  },
  {
    module: "",
    action: "Edit Roles",
    superAdmin: true,
    branchAdmin: false,
    storeManager: false,
    staff: false,
  },
  {
    module: "",
    action: "Delete Roles",
    superAdmin: true,
    branchAdmin: false,
    storeManager: false,
    staff: false,
  },
  {
    module: "Store Management",
    action: "View Stores",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: false,
  },
  {
    module: "",
    action: "Create Stores",
    superAdmin: true,
    branchAdmin: true,
    storeManager: false,
    staff: false,
  },
  {
    module: "",
    action: "Edit Stores",
    superAdmin: true,
    branchAdmin: true,
    storeManager: false,
    staff: false,
  },
  {
    module: "",
    action: "Delete Stores",
    superAdmin: true,
    branchAdmin: true,
    storeManager: false,
    staff: false,
  },
  {
    module: "Inventory Management",
    action: "View Inventory",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: true,
  },
  {
    module: "",
    action: "Add Inventory",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: false,
  },
  {
    module: "",
    action: "Edit Inventory",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: false,
  },
  {
    module: "",
    action: "Delete Inventory",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: false,
  },
  {
    module: "Sales Management",
    action: "View Sales",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: true,
  },
  {
    module: "",
    action: "Create Sales",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: true,
  },
  {
    module: "",
    action: "Edit Sales",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: false,
  },
  {
    module: "",
    action: "Delete Sales",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: false,
  },
  {
    module: "Customer Management",
    action: "View Customers",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: true,
  },
  {
    module: "",
    action: "Create Customers",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: false,
  },
  {
    module: "",
    action: "Edit Customers",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: false,
  },
  {
    module: "",
    action: "Delete Customers",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: false,
  },
  {
    module: "Reporting",
    action: "View Reports",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: false,
  },
  {
    module: "",
    action: "Generate Reports",
    superAdmin: true,
    branchAdmin: true,
    storeManager: true,
    staff: false,
  },
  {
    module: "Settings",
    action: "View Settings",
    superAdmin: true,
    branchAdmin: true,
    storeManager: false,
    staff: false,
  },
  {
    module: "",
    action: "Edit Settings",
    superAdmin: true,
    branchAdmin: false,
    storeManager: false,
    staff: false,
  }
];

export const Checked = ({ check, onClick }) => (
  <Box
    className="w-4 h-4 flex justify-center items-center border shadow cursor-pointer hover:bg-blue-400"
    onClick={onClick}
  >
    {check && <Box className="w-3 h-3 bg-blue-800"></Box>}
  </Box>
);

export const NewRole = () => {
  return (
    <Box className="bg-red-600">
      <TextField
        placeholder="Role title"
        value={"roleTitle"}
        onChange={(e) => {}}
      />
    </Box>
  );
};