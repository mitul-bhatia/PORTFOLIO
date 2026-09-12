export const TOKENS = {
  colors: {
    paper: '#F3E9DA',
    ink: '#2B1D14',
    elevated: '#EADFC8',
    muted: '#6B5744',
    accent: '#A8672E', // Burnt sienna
    border: '#D9C9AC',
  },
  shadow: {
    notebook: '2px 2px 0px #D9C9AC',
  },
  radius: {
    default: '0px',
  },
} as const;

export type ColorToken = keyof typeof TOKENS.colors;
