import { extendTheme } from '@chakra-ui/react';
import { Roboto } from '@next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
});

export const theme = extendTheme({
  styles: {
    global: {
      '*': {
        boxSizing: 'border-box',
        padding: 0,
        margin: 0,
        fontFamily: roboto.style.fontFamily,
      },
      body: {
        backgroundColor: 'blackAlpha.900',
        color: 'gray.100',
      },
    },
  },
});
