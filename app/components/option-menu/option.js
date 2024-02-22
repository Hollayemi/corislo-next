import React from 'react'
import OptionsMenu from '.';
import { Button } from '@mui/material';

const CustomOption = ({ icon, options, butPush, clickFunction, addBtn }) => {
  return (
    <OptionsMenu
      icon={icon}
      options={options}
      butPush={butPush}
      setOption={clickFunction}
      addBtn={addBtn}
      iconButtonProps={{
        size: "small",
        sx: { color: "text.disabled", cursor: "pointer" },
      }}
    />
  );
};

export default CustomOption