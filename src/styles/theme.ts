import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { Roboto } from '@next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
});

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  styles: {
    global: {
      '*': {
        boxSizing: 'border-box',
        padding: 0,
        margin: 0,
        fontFamily: roboto.style.fontFamily,
      },
      body: {
        backgroundColor: 'whiteAlpha.100',
        color: 'gray.200',
      },
    },
  },
});
