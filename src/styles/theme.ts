import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      '*': {
        boxSizing: 'border-box',
        padding: 0,
        margin: 0,
      },
      body: {
        backgroundColor: 'gray.900',
        color: 'gray.100',
        '-webkit-font-smoothing': 'antialiased',
      },
    },
  },
});
