import { Box } from "@mui/material"
import { TextCheck } from "./components";

const CheckPassword = ({ password }) => {
    return (
      <Box>
        <TextCheck
          checked={password.length >= 8}
          text="Minimum of 8 characters long - the more the better"
        />
        <TextCheck
          checked={/[A-Z]/.test(password)}
          text="At least one uppercase"
        />
        <TextCheck
          checked={/[a-z]/.test(password)}
          text="At least one lowercase"
        />
        <TextCheck
          checked={/\d/.test(password)}
          text="At least one number"
        />
        <TextCheck
          checked={/[\W_]/.test(password)}
          text="At least one special character e.g (!@#$%^&*)"
        />
      </Box>
    );
}

export default CheckPassword