// ** React Imports
import { Fragment, useState } from "react";

// ** MUI Imports
import { Box, Grid, TextField, Switch, Typography } from "@mui/material";
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

export const FileUploader = ({ files, setFiles }) => {
  
  // ** Hooks
  const theme = useTheme();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
    },
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          className="w-32 h-32 rounded-md"
          alt={file.name}
          src={URL.createObjectURL(file)}
        />
      );
    } else {
      return (
        <Icon icon="tabler:file-description" className="w-16 h-16 rounded-md" />
      );
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Grid container spacing={3}>
      {files.length
        ? files.map((file) => (
            <Grid item xs={6} md={4} key={file.name}>
              <div className="relative w-32 h-32 rounded-md" title={file.name}>
                {renderFilePreview(file)}
                <div className="absolute bottom-0 right-0 rounded-tl-sm bg-white p-0.5 m-0.5 mr-1">
                  <Typography className="text-[8px]" variant="body2">
                    {Math.round(file.size / 100) / 10 > 1000
                      ? `${(Math.round(file.size / 100) / 10000).toFixed(1)}mb`
                      : `${(Math.round(file.size / 100) / 10).toFixed(1)}kb`}
                  </Typography>
                </div>
                <div
                  onClick={() => handleRemoveFile(file)}
                  className="text-[6px] flex items-center justify-center text-white absolute -mt-2 -mr-2 top-0 right-0 w-4 h-4 rounded-full bg-red-500"
                >
                  <Icon icon="tabler:x" fontSize={16} />
                </div>
              </div>
            </Grid>
          ))
        : null}

      <Grid item xs={6} sm={4}>
        <div {...getRootProps({ className: "dropzone cursor-pointer" })}>
          <input {...getInputProps()} />
          <Box className="flex items-center 2 justify-center p-1 w-36 h-36 rounded-md flex-col border border-dashed">
            <Img
              alt="Upload img"
              src={`/images/misc/upload-${theme.palette.mode}.png`}
            />
            <Typography sx={{ fontSize: "10px", textAlign: "center", mt: 0.5 }}>
              Drag and Drop image here or Choose File
            </Typography>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export const InputBoxWithSideLabel = ({ label, value, className, inputProps, onChange }) => {
  return (
    <Grid container spacing={2} className={`mb-6 ${className}`}>
      <Grid item xs={12} sm={4} className="!flex items-center">
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
          {...inputProps}
          fullWidth
          onChange={onChange}
          value={value}
          size="small"
        />
      </Grid>
    </Grid>
  );
};


export const SocialMediaConponent = ({ label, className, socialMedia, setSocialMedia }) => {
  const smallLabel = label.toLowerCase().split(' ').join("");

  const handleChange = (label, value) => {
    const updated = { ...socialMedia, [label]: value };

    setSocialMedia(updated);
  };

  return (
    <Grid container spacing={2} className={`mb-6 ${className}`}>
      <Grid item xs={12} sm={4} className="!flex items-center">
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
          onChange={(e) => handleChange(smallLabel, e.target.value)}
          fullWidth
          value={label && socialMedia[label?.split(" ").join("")?.toLowerCase()]}
          size="small"
        />
      </Grid>
    </Grid>
  );
};


export const OpeningHours = ({
  label,
  className,
  openHours,
  setOpenHours,
}) => {
  const smallLabel = label.toLowerCase();
  const isPresent = openHours.hasOwnProperty(smallLabel);
  
  const handleChange = (label, key, value) => {
    let updated;
    if(isPresent){
        updated = { ...openHours, [label]: { ...openHours[label], [key]: value } };
    }else{
      updated = { ...openHours, [label]: { [key]: value } };
    }
    setOpenHours(updated);
  };

  const checked = Boolean(openHours[smallLabel]?.isset);
  return (
    <Grid container spacing={1} className={`mb-6 ${className}`}>
      <Grid item xs={4} sm={4} className="!flex items-center">
        <Box className="!flex !items-center -ml-4 md:ml-0">
          <Switch
            edge="end"
            checked={isPresent && openHours[smallLabel]?.isset == true}
            className="!md:mr-2"
            onChange={(e) => handleChange(smallLabel, "isset", !checked)}
          />
          <Typography>{label}</Typography>
        </Box>
      </Grid>
      <Grid item xs={4} sm={4}>
        <TextField
          fullWidth
          defaultValue="08:00"
          size="small"
          onChange={(e) => handleChange(smallLabel, "from", e.target.value)}
        />
      </Grid>
      <Grid item xs={4} sm={4}>
        <TextField
          fullWidth
          defaultValue="05:00"
          size="small"
          onChange={(e) => handleChange(smallLabel, "to", e.target.value)}
        />
      </Grid>
    </Grid>
  );
};
