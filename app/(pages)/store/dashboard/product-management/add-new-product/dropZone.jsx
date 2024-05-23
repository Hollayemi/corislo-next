// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import {Box, Grid,
List,
Button,
ListItem,
Typography,
IconButton} from '@mui/material'
import { styled, useTheme } from "@mui/material/styles";

// ** Icon Imports
import Icon from '@/app/components/icon'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
}))

const FileUploader = () => {
  // ** State
  const [files, setFiles] = useState([])

  // ** Hooks
  const theme = useTheme();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img className="w-16 h-16 rounded-md" alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return (
        <Icon icon="tabler:file-description" className="w-16 h-16 rounded-md" />
      );
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

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
            <Typography sx={{ fontSize: "10px", textAlign: "center", mt: .5 }}>
              Drag and Drop image here or Choose File
            </Typography>
          </Box>
        </div>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          {files.length
            ? files.map((file) => (
                <Grid item xs={4} md={3} key={file.name}>
                  <div className="relative" title={file.name}>
                    {renderFilePreview(file)}
                    <div className="absolute bottom-0 right-0 rounded-tl-sm bg-white p-0.5 m-0.5 mr-1">
                      <Typography className="text-[8px]" variant="body2">
                        {Math.round(file.size / 100) / 10 > 1000
                          ? `${(Math.round(file.size / 100) / 10000).toFixed(
                              1
                            )}mb`
                          : `${(Math.round(file.size / 100) / 10).toFixed(
                              1
                            )}kb`}
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
        </Grid>
      </Grid>
    </Grid>
    //   <div className='buttons'>
    //     <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
    //       Remove All
    //     </Button>
    //   </div>
  );
}

export default FileUploader
