type ColorScale = {
  50: string;
  100: string;
  300: string;
  500: string;
  700: string;
  900: string;
};

const commonTheme = {
  typography: {
    fontFamily: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      bold: 'Inter-Bold',
      italic: 'Inter-Italic',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  zIndices: {
    hide: -1,
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    modal: 1300,
    tooltip: 1400,
  },
};

export const lightTheme = {
  ...commonTheme,
  colors: {
    primary: {
      50: '#E6F0FF',
      100: '#CCE0FF',
      300: '#66A3FF',
      500: '#006FFD',
      700: '#0057CA',
      900: '#003F96',
    },
    neutral: {
      50: '#F7F7F7',
      100: '#EEEEEE',
      300: '#C4C4C4',
      500: '#919191',
      700: '#5E5E5E',
      900: '#262626',
    },
    background: '#f5f5f5',
    backgroundLight: '#FFFFFF',
    borderColor: '#919191',
    inputColor: '#F7F7F7',
    text: '#000000',
    white: '#FFFFFF',
    black: '#000000',
    error: '#E53935',
    warning: '#FFB400',
    success: '#2E7D32',
    info: '#0288D1',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
};

export const darkTheme = {
  ...commonTheme,
  colors: {
    primary: {
      50: '#FFF0E6',
      100: '#FFE0CC',
      300: '#FFA366',
      500: '#FF7D1A',
      700: '#CC5A00',
      900: '#994400',
    },
    neutral: {
      50: '#3F3F3F',
      100: '#2E2E2E',
      300: '#252525',
      500: '#1F1F1F',
      700: '#181818',
      900: '#121212',
    },
    background: '#1F1F1F',
    backgroundLight: '#2C2C2C',
    borderColor: '#5E5E5E',
    inputColor: '#3F3F3F',
    text: '#FFFFFF',
    white: '#FFFFFF',
    black: '#000000',
    error: '#F44336',
    warning: '#FFCA28',
    success: '#66BB6A',
    info: '#29B6F6',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.2)',
    md: '0 4px 6px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.3)',
  },
};

export type Theme = typeof commonTheme & typeof lightTheme;
