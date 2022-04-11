import { createTheme } from '@material-ui/core/styles';

const defaultThemeBP = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1014,
      xl: 1336,
    },
  },
});

const defaultTheme = createTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 400,
      md: 540,
      lg: 768,
      xl: 1024,
    },
  },
  spacing: 4,
  palette: {
    text: {
      primary: '#333333',
      secondary: '#67676d',
      disabled: 'rgb(21, 21, 30, 0.5)',
    },
    background: {
      default: 'rgb(0, 0, 0, 0)', // Transparent
    },
    primary: {
      light: '#EE0000',
      main: '#EE0000',
      dark: '#EE0000',
    },
    secondary: {
      light: '#3497ff',
      main: '#3497ff',
      dark: '#3497ff',
    },
    error: {
      light: '#EE0000',
      main: '#EE0000',
      dark: '#EE0000',
      contrastText: '#ffffff',
    },
    custom: {
      black: '#000000',
      grayBg: '#DFDFDF',
      grayHighlight: '#EBEBEB',
      yellowButton: '#FFCE1B',
      darkTransparent: 'rgba(0, 0, 0, 0.5)',
      frame: '#d0d0d2',
      white: '#FFFFFF',
      darkGreyBg: '#38383f',
      darkRed: '#e00',
      lightBlack: '#15151e',
      lightGrayishRed: '#F2DEDE',
    },
  },
  typography: {
    fontFamily: 'titillium-regular',
    h2: {
      fontFamily: 'Formula1-Bold',
      fontSize: '25px',
      fontWeight: '600',
      color: '#333333',
      letterSpacing: '0.2px',
      [defaultThemeBP.breakpoints.up('lg')]: {
        fontSize: '32px',
      },
    },
    h5: {
      fontSize: '17px',
      fontWeight: '700',
      letterSpacing: '0.2px',
    },
    h6: {
      fontSize: '15px',
      fontWeight: '600',
    },
    body1: {
      fontSize: '17px',
      letterSpacing: '0.2px',
    },
    body2: {
      fontSize: '15px',
    },
    subtitle1: {
      fontSize: '15px',
    },
    button: {
      fontSize: '13px',
      fontWeight: '400',
      letterSpacing: '0.5px',
    },
  },
  overrides: {
    MuiInput: {
      root: {
        border: `1px solid #000000`,
        borderRadius: '10px',
        // marginBottom: '16px',
        height: '50px',
      },
      input: {
        marginLeft: '12px',
      },
    },
    MuiFormControl: {
      root: { width: '100%' },
    },
    MuiButton: {
      root: {
        paddingLeft: '13px',
        paddingRight: '13px',
        paddingTop: '9px',
        paddingBottom: '9px',
      },
    },
    MuiDivider: {
      root: {
        width: '100%',
      },
    },
    MuiListItem: {
      root: {
        '&$selected': {
          backgroundColor: '#1aa3ff',
        },
      },
    },
    MuiInputLabel: {
      root: {
        marginBottom: '4px',
        marginLeft: '12px',
      },
    },
    MuiPaginationItem: {
      root: {
        fontFamily: 'Formula1-Regular',
        fontSize: '12px',
      },
    },
  },
});

export { defaultTheme };
