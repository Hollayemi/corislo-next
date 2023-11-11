// ** React Imports
import { Fragment, useState } from "react";

// ** MUI Imports
import { Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

// ** Icon Imports
import Icon from "@/app/components/icon";

// ** Third Party Imports
import { useDropzone } from "react-dropzone";

// Styled component for the upload image inside the dropzone area
const Img = styled("img")(({ theme }) => ({
  width: 48,
  height: 48,
}));

const DocumentUploader = ({ files, setFiles }) => {
  // ** State

  // ** Hooks
  const theme = useTheme();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
    },
  });


  return (
    <div {...getRootProps({ className: "dropzone cursor-pointer" })}>
      <input {...getInputProps()} />
      <Box className="flex items-center 2 justify-center p-1 w-full h-32 my-6 rounded-md flex-col border border-dashed">
        <Img alt="Upload img" src={`/images/misc/upload-cloud.png`} />
        <Typography sx={{ fontSize: "10px", textAlign: "center", mt: 0.5 }}>
          Drag and Drop image here or Choose File
        </Typography>
      </Box>
    </div>

    //   <div className='buttons'>
    //     <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
    //       Remove All
    //     </Button>
    //   </div>
  );
};

export default DocumentUploader;
