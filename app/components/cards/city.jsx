import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';
import { Typography } from '@mui/material';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

const options = [
  {
    state: "Abia",
    cities: [
      "Aba North",
      "Aba South",
      "Arochukwu",
      "Bende",
      "Ikwuano",
      "Isiala-Ngwa North",
      "Isiala-Ngwa South",
      "Isuikwato",
      "Obi Nwa",
      "Ohafia",
      "Osisioma",
      "Ngwa",
      "Ugwunagbo",
      "Ukwa East",
      "Ukwa West",
      "Umuahia North",
      "Umuahia South",
      "Umu-Neochi",
    ],
  },
  {
    state: "Adamawa",
    cities: [
      "Demsa",
      "Fufore",
      "Ganaye",
      "Gireri",
      "Gombi",
      "Guyuk",
      "Hong",
      "Jada",
      "Lamurde",
      "Madagali",
      "Maiha",
      "Mayo-Belwa",
      "Michika",
      "Mubi North",
      "Mubi South",
      "Numan",
      "Shelleng",
      "Song",
      "Toungo",
      "Yola North",
      "Yola South",
    ],
  },
];

export default function SelectCities() {
  return (
    <Autocomplete
      id="grouped-demo"
      options={options}
      groupBy={(option) => option.state}
      getOptionLabel={(option) =>  option.cities}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="With categories" />
      )}
      renderGroup={(params) => (
        <li key={params.key}>
          <Typography variant="subtitle1">{params.group}</Typography>
          <ul>{params.children}</ul>
        </li>
      )}
      renderOption={(props, option) => <li {...props}>{option}</li>}
    />
  );
}