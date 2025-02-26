export const brandColors = {
  primary: {
    50: '#F0F7FF',
    100: '#E0EFFF',
    200: '#B8DBFF',
    300: '#8AC2FF',
    400: '#5BA9FF',
    500: '#2D90FF',
    600: '#1B76E6',
    700: '#1259B3',
    800: '#0B3D80',
    900: '#06264D',
  },
  secondary: {
    500: '#7F57FF',
  }
};

export const neutralColors = {
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    500: '#6B7280',
    900: '#111827',
  }
};

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: brandColors.primary[500],
    tabIconDefault: '#ccc',
    tabIconSelected: brandColors.primary[500],
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: brandColors.primary[400],
    tabIconDefault: '#ccc',
    tabIconSelected: brandColors.primary[400],
  },
};
