type ColorScale = {
  50: string;
  100: string;
  300: string;
  500: string;
  700: string;
  900: string;
};

export const theme = {
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
    white: '#FFFFFF',
    black: '#000000',
    error: '#E53935',
    warning: '#FFB400',
    success: '#2E7D32',
    info: '#0288D1',
  },
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
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
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
