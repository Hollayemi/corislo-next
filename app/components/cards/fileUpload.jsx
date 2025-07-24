/* eslint-disable @next/next/no-img-element */
// ** Third Party Imports
import { useDropzone } from "react-dropzone";

// Function to convert a file to base64
export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const ProfilePictureUploader = ({
  setFiles = () => {},
  fileNum = 1,
  setLocalFiles,
  component,
  directUpload,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      setLocalFiles(acceptedFiles.map((file) => Object.assign(file)));

      const base64Files = await Promise.all(
        acceptedFiles.map(async (file) => {
          if (file) {
            const base64Image = await convertFileToBase64(file);
            directUpload && directUpload(base64Image, file);

            return base64Image;
          }
        })
      );

      setFiles(base64Files.filter(Boolean));
    },
    maxFiles: fileNum,
  });

  return (
    <div {...getRootProps({ className: "dropzone cursor-pointer w-fit" })}>
      <input {...getInputProps()} />
      {component}
    </div>
  );
};

export default ProfilePictureUploader;
