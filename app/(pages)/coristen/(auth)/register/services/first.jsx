import { MyTextField } from "@/app/(pages)/user/components";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SimpleDropDown } from "../../../dashboard/product-management/add-new-product/components";

const Sevices = ({ handleStoreChange, values, setStage, errors }) => {
  console.log(values);
  const [stage, setSubStage] = useState(values["about_store"] ? 7 : 1);
  const StageBox = ({ level }) => (
    <Box
      className={`w-1/6 h-1 mx-1 ${
        stage >= level ? "bg-blue-900" : "bg-gray-200"
      }`}
    ></Box>
  );
  const names = {
    1: "category",
    2: "businessName",
    3: "store",
    4: "businessEmail",
    5: "state",
    6: "address",
    7: "about_store",
  };
  return (
    <Box className="w-full md:w-[700px] min-w-[330px]">
      <Typography variant="body2" className="!font-bold !text-[12px]">
        Question {stage}/7
      </Typography>
      <Box className="w-full flex items-center mb-6">
        <StageBox level={1} />
        <StageBox level={2} />
        <StageBox level={3} />
        <StageBox level={4} />
        <StageBox level={5} />
        <StageBox level={6} />
        <StageBox level={7} />
      </Box>
      <Box className="md:flex items-center flex-wrap">
        <FieldInput
          level={1}
          name="category"
          stage={stage}
          values={values}
          handleStoreChange={handleStoreChange}
          render={["Gym", "Spa", "Tailor", "Mechanic"]}
          label="What type of services are you running?"
        />
        <FieldInput
          type="text"
          level={2}
          name="businessName"
          stage={stage}
          values={values}
          handleStoreChange={handleStoreChange}
          placeholder="e.g Kindle Gym"
          label="What is the name of the service?"
        />
        <FieldInput
          type="text"
          level={3}
          name="store"
          stage={stage}
          values={values}
          handleStoreChange={handleStoreChange}
          placeholder="short-name e.g kepax"
          label={`${values["businessName"]} or what (one word)`}
        />
        <FieldInput
          type="text"
          level={4}
          name="businessEmail"
          stage={stage}
          values={values}
          handleStoreChange={handleStoreChange}
          placeholder="Write about your service, not less than 500 words"
          label="Business Email"
        />
        <FieldInput
          type="text"
          level={5}
          name="state"
          stage={stage}
          values={values}
          handleStoreChange={handleStoreChange}
          placeholder="e.g Lagos State"
          label="What is the state your service is located?"
        />
        <FieldInput
          type="text"
          level={6}
          name="address"
          stage={stage}
          values={values}
          handleStoreChange={handleStoreChange}
          placeholder="Search the location"
          label="What address of your services?"
        />
        {/* <FieldInput
          type="text"
          level={6}
          name="website"
          stage={stage}
          values={values}
          handleStoreChange={handleStoreChange}
          placeholder="website link"
          label="Website of your services (optional)"
          inputProps={{
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">https://</InputAdornment>
              ),
            },
          }}
        /> */}
        <FieldInput
          type="text"
          level={7}
          name="about_store"
          stage={stage}
          values={values}
          handleStoreChange={handleStoreChange}
          placeholder="Write about your service, not less than 500 words"
          label="Write a little description about your service"
          inputProps={{
            minRows: 2,
            maxRows: 3,
            multiline: true,
          }}
        />
      </Box>

      <Box className="w-full  !b-10 mb-10 mt-8">
        <Button
          variant="contained"
          disabled={!Boolean(values[names[stage]])}
          className="w-full !h-12 !rounded-full !text-gray-100 !text-[17px] !mt-3 !shadow-none"
          onClick={() => (stage < 7 ? setSubStage(stage + 1) : setStage(2))}
        >
          {stage < 7 ? "Continue" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

const FieldInput = ({
  type,
  level,
  stage,
  handleStoreChange,
  parentClassName,
  ...props
}) => {
  return (
    <Box
      className={`${props?.inputProps?.multiline ? "w-full" : "md:w-1/2"} px-2`}
    >
      {type === "text" ? (
        <Box
          className={`${
            stage >= level
              ? props?.inputProps?.multiline
                ? "h-28"
                : "h-20"
              : "h-0"
          } transition-all duration-300 overflow-hidden`}
        >
          <MyTextField
            title={props.label}
            onChange={handleStoreChange(props.name)}
            value={props.values[props.name]}
            placeholder={props.placeholder}
            PClassName={`w-full md:w-auto`}
            others={props.inputProps || {}}
          />
        </Box>
      ) : (
        <Box
          className={`${
            stage >= level ? "h-[76px]" : "h-0"
          } transition-all overflow-hidden`}
        >
          <SimpleDropDown
            render={props.render.map((res, i) => (
              <MenuItem key={i} value={res}>
                {res}
              </MenuItem>
            ))}
            defaultValue={props.values[props.name]}
            onChange={handleStoreChange(props.name)}
            label={props.label}
            sx={{ mb: 2 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Sevices;
