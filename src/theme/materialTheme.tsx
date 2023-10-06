const paletteColors = {
  white: '#FFFFFF',
  dark: '#141316',
  orange: '#ED8E00',
  green: '#56BD86',
  peach: '#EF564D',
  darkRed: '#542A2A',
  darkGreen: '#1B3E1A',
  grey: '#A4A5AF',
  darkGrey: '#28272C',
  borderDark: '#232226',
  lightGrey: '#36343C',
  middleGrey: '#37363D',
  contrastGreen: '#7DBD56',
  contrastRed: '#EF4D60',
  brown: '#232127',
  lightBrown: '#2F2E35',
  silver: '#828392',
}

const lightPalleteColors = {
  white: '#FFFFFF',
  dark: '#141316',
  orange: '#ED8E00',
  green: '#56BD86',
  peach: '#EF564D',
  lightRed: '#FCDDDB',
  lightGreen: '#DDF2E7',
  contrastGreen: '#7DBD56',
  contrastRed: '#EF4D60',
  borderDark: '#F2F2F3',
  grey: '#828392',
  darkGrey: '#F2F2F3',
  middleGrey: '#828392',
  lightGrey: '#E1E2E5',
}

const baseTheme = {
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  spacing: 2,
  overrides: {
    MuiTypography: {
      h1: {
        fontWeight: 700,
        fontSize: 32,
        color: paletteColors.white,
      },
      h2: {
        fontSize: 24,
        fontWeight: 700,
        color: paletteColors.white,
      },
      h3: {
        fontSize: 22,
        fontWeight: 700,
        color: paletteColors.white,
      },
      h4: {
        fontSize: 20,
        fontWeight: 700,
        color: paletteColors.white,
      },
      h5: {
        fontSize: 18,
        fontWeight: 700,
        color: paletteColors.white,
      },
      h6: {
        fontSize: 12,
        color: paletteColors.white,
        fontWeight: 700,
        lineHeight: 'normal',
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: 700,
        color: paletteColors.white,
      },
      body1: {
        fontSize: 14,
        color: paletteColors.white,
      },
      body2: {
        fontSize: 14,
        fontWeight: 700,
        color: paletteColors.white,
      },
      caption: {
        fontSize: 20,
        color: paletteColors.orange,
      },
      overline: {
        color: paletteColors.grey,
        fontWeight: 700,
        fontSize: 12,
        textTransform: 'none',
      },
    },
  },
  palette: {
    // type: 'dark',
    background: {
      default: paletteColors.dark,
      paper: paletteColors.darkGrey,
    },
    primary: {
      main: paletteColors.orange,
      contrastText: paletteColors.white,
    },
    secondary: {
      main: paletteColors.borderDark,
      contrastText: paletteColors.grey,
    },
    text: {
      primary: paletteColors.white,
      secondary: paletteColors.dark,
      disabled: paletteColors.grey,
    },
    success: {
      main: paletteColors.green,
      dark: paletteColors.darkGreen,
      contrastText: paletteColors.contrastGreen,
    },
    error: {
      main: paletteColors.peach,
      dark: paletteColors.darkRed,
      contrastText: paletteColors.contrastRed,
    },
    info: {
      main: paletteColors.lightGrey,
      contrastText: paletteColors.middleGrey,
      dark: paletteColors.brown,
      light: paletteColors.lightBrown,
    },
    warning: {
      main: paletteColors.silver,
    },
  },
}

const lightTheme = {
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  spacing: 2,
  overrides: {
    MuiTypography: {
      h1: {
        fontWeight: 700,
        fontSize: 32,
        color: lightPalleteColors.dark,
      },
      h2: {
        fontSize: 24,
        fontWeight: 700,
        color: lightPalleteColors.dark,
      },
      h3: {
        fontSize: 22,
        fontWeight: 700,
        color: lightPalleteColors.dark,
      },
      h4: {
        fontSize: 20,
        fontWeight: 700,
        color: lightPalleteColors.dark,
      },
      h5: {
        fontSize: 18,
        fontWeight: 700,
        color: lightPalleteColors.dark,
      },
      h6: {
        fontSize: 12,
        color: lightPalleteColors.dark,
        fontWeight: 700,
        lineHeight: 'normal',
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: 700,
        color: lightPalleteColors.dark,
      },
      body1: {
        fontSize: 14,
        color: lightPalleteColors.dark,
      },
      body2: {
        fontSize: 14,
        fontWeight: 700,
        color: lightPalleteColors.dark,
      },
      caption: {
        fontSize: 20,
        color: lightPalleteColors.orange,
      },
      overline: {
        color: lightPalleteColors.grey,
        fontWeight: 700,
        fontSize: 12,
        textTransform: 'none',
      },
    },
  },
  palette: {
    type: 'light',
    background: {
      default: lightPalleteColors.white,
      paper: lightPalleteColors.darkGrey,
    },
    primary: {
      main: lightPalleteColors.orange,
      contrastText: paletteColors.middleGrey,
    },
    secondary: {
      main: lightPalleteColors.borderDark,
      contrastText: lightPalleteColors.grey,
    },
    text: {
      primary: lightPalleteColors.dark,
      secondary: lightPalleteColors.white,
      hint: lightPalleteColors.grey,
    },
    success: {
      main: lightPalleteColors.green,
      dark: lightPalleteColors.lightGreen,
      contrastText: lightPalleteColors.contrastGreen,
    },
    error: {
      main: lightPalleteColors.peach,
      dark: lightPalleteColors.lightRed,
      contrastText: lightPalleteColors.contrastRed,
    },
    info: {
      main: lightPalleteColors.lightGrey,
      contrastText: paletteColors.middleGrey,
      dark: paletteColors.brown,
      light: paletteColors.lightBrown,
    },
    warning: {
      main: paletteColors.silver,
    },
  },
}

const getThemePallete = (themeCode: string | null): object => {
  switch (themeCode) {
    case 'light':
      return lightTheme
    default:
      return baseTheme
  }
}

export { baseTheme, getThemePallete, paletteColors }
