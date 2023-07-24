'use client';
// ** MUI Imports
import CssBaseline from '@mui/material/CssBaseline'
import Topography from './topography'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'

// ** Theme Config
import themeConfig from '@/app/configs/themeConfig'

import DefaultPalette from './palette'

const ThemeComponent = props => {
  // ** Props
  const { settings, children } = props

  let theme = createTheme({
    palette: DefaultPalette()
  })

  // ** Continue theme creation and pass merged component overrides to CreateTheme function  

  // theme = createTheme(theme,
  //   {
  //       topography: Topography(theme)
  //   }, 
  // )

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
}

export default ThemeComponent
