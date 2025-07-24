export interface TerminalTheme {
  backgroundColor: string;
  textColor: string;
  promptColor: string;
  cursorColor: string;
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
}

export interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp?: Date;
}


export type TerminalCommandHandler = (args: string[]) => void | string | string[];

export interface TerminalProps {
  theme?: 'dark' | 'light' | 'matrix' | 'retro' | TerminalTheme;
  prompt?: string;
  height?: string | number;
  width?: string | number;
  lines?: TerminalLine[];
  showCursor?: boolean;
  cursorBlink?: boolean;
  className?: string;
  style?: React.CSSProperties;

  // ✅ Custom commands API
  commands?: Record<string, TerminalCommandHandler>;
}
