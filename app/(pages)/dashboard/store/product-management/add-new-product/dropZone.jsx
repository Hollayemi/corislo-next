"use client"
// ** React Imports
import { useState } from "react";

// ** MUI Imports
import { Box, Grid, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";

// ** Icon Imports
import Icon from "@/app/components/icon";

// ** Third Party Imports
import { useDropzone } from "react-dropzone";
import { convertFileToBase64 } from "@/app/components/cards/fileUpload";

// Styled component for the upload image inside the dropzone area
const Img = styled("img")(({ theme }) => ({
  width: 48,
  height: 48,
}));

const FileUploader = ({ files, setFiles, localFiles, setLocalFiles }) => {
  // ** State
  const [video, setVideo] = useState();
  // ** Hooks
  const theme = useTheme();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const fileInfo = acceptedFiles.map((file) => {
        if (file.type.startsWith("video")) {
          setVideo(file);
        }
        return Object.assign(file);
      });
      setLocalFiles((prev) => {
        return [...prev, ...fileInfo];
      });
      const base64Files = await Promise.all(
        acceptedFiles.map(async (file, i) => {
          if (file) {
            const base64Image = await convertFileToBase64(file);
            setFiles((item) => {
              return [
                ...item,
                {
                  name: fileInfo[i].name,
                  base64: base64Image,
                  video: file.type.startsWith("video"),
                },
              ];
            });
          }
        })
      );
    },
  });

  const handleRemoveFile = (file) => {
    const uploadedFiles = localFiles;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setLocalFiles([...filtered]);

    const filteredbASE64 = files.filter((i) => i.name !== file.name);
    setFiles([...filteredbASE64]);
  };

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <div className="relative w-16 h-16">
          <img
            className="w-16 h-16 rounded-md"
            alt={file.name}
            src={URL.createObjectURL(file)}
          />
          <div
            onClick={() => handleRemoveFile(file)}
            className="text-[6px] flex items-center justify-center text-white absolute -mt-2 -mr-2 top-0 right-0 w-4 h-4 rounded-full bg-red-500"
          >
            <Icon icon="tabler:x" fontSize={16} />
          </div>
        </div>
      );
    } else {
      return (
        <Icon icon="tabler:file-description" className="w-16 h-16 rounded-md" />
      );
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
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

      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          {video && (
            <Grid item xs={8} md={6} key="video">
              <video className="w-52 h-16" controls>
                <source
                  // src="https://www.w3schools.com/html/mov_bbb.mp4"
                  src={video && URL.createObjectURL(video)}
                  type="video/mp4"
                />
              </video>
            </Grid>
          )}

          {localFiles.length
            ? localFiles.map((file, i) => (
                <Grid item xs={4} md={3} key={file.name + i}>
                  {/* <CardMedia
                    component="video"
                    controls
                    autoPlay
                    src={URL.createObjectURL(file)}
                    title={"title"}
                  /> */}

                  <div className="relative" title={file.name}>
                    {renderFilePreview(file)}
                    <div className="absolute bottom-0 right-0 rounded-tl-sm bg-white p-0.5 m-0.5 mr-1">
                      <Typography className="!text-[11px]" variant="body2">
                        {Math.round(file.size / 100) / 10 > 1000
                          ? `${(Math.round(file.size / 100) / 10000).toFixed(
                              1
                            )}mb`
                          : `${(Math.round(file.size / 100) / 10).toFixed(
                              1
                            )}kb`}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
    </Grid>
    //   <div className='buttons'>
    //     <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
    //       Remove All
    //     </Button>
    //   </div>
  );
};

export default FileUploader;
