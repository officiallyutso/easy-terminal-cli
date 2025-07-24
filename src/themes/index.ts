import { TerminalProps, TerminalTheme } from '../types';

export const themes: Record<string, TerminalTheme> = {
  dark: {
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    promptColor: '#00ff00',
    cursorColor: '#ffffff',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '14px',
    lineHeight: '1.4',
  },
  light: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    promptColor: '#0066cc',
    cursorColor: '#000000',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '14px',
    lineHeight: '1.4',
  },
  matrix: {
    backgroundColor: '#000000',
    textColor: '#00ff00',
    promptColor: '#00ff00',
    cursorColor: '#00ff00',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '14px',
    lineHeight: '1.4',
  },
  retro: {
    backgroundColor: '#000080',
    textColor: '#c0c0c0',
    promptColor: '#ffff00',
    cursorColor: '#c0c0c0',
    fontFamily: '"MS Sans Serif", sans-serif',
    fontSize: '12px',
    lineHeight: '1.2',
  },
};

export const getTheme = (theme: TerminalProps['theme']): TerminalTheme => {
  if (typeof theme === 'string') {
    return themes[theme] || themes.dark;
  }
  if (typeof theme === 'object' && theme !== null) {
    return theme;
  }
  return themes.dark;
};