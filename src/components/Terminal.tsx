import React, { useState, useEffect, useRef } from 'react';
import type { TerminalProps, TerminalLine } from '../types';
import { getTheme } from '../themes';

export const Terminal: React.FC<TerminalProps> = ({
  theme = 'dark',
  prompt = '$',
  height = '400px',
  width = '100%',
  showCursor = true,
  cursorBlink = true,
  className = '',
  style = {},
  commands = {},
}) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<TerminalProps['theme']>(theme);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalTheme = getTheme(currentTheme);

  useEffect(() => {
    if (!cursorBlink || !showCursor) return;
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, [cursorBlink, showCursor]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [lines]);

  const appendLines = (newLines: TerminalLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  };

  const handleCommand = (rawInput: string) => {
    const parts = rawInput.trim().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    const newLines: TerminalLine[] = [{ type: 'command', content: rawInput }];

    // Built-in: theme switcher
    if (cmd === 'theme') {
      const themes = ['dark', 'light', 'matrix', 'retro'];
      if (args.length === 0) {
        newLines.push({ type: 'output', content: `Current theme: ${typeof currentTheme === 'string' ? currentTheme : 'custom'}` });
      } else if (themes.includes(args[0])) {
        setCurrentTheme(args[0] as TerminalProps['theme']);
        newLines.push({ type: 'output', content: `Theme changed to '${args[0]}'` });
      } else {
        newLines.push({ type: 'error', content: `Invalid theme. Options: ${themes.join(', ')}` });
      }
      appendLines(newLines);
      return;
    }

    // Built-in: clear
    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    // User-defined command
    const commandFn = commands[cmd];
    if (commandFn) {
      try {
        const outputBuffer: string[] = [];

        // Intercept console.log
        const originalLog = console.log;
        console.log = (...args) => {
          outputBuffer.push(args.join(' '));
        };

        const result = commandFn(args);

        console.log = originalLog; // restore log

        if (typeof result === 'string') outputBuffer.push(result);
        if (Array.isArray(result)) outputBuffer.push(...result);

        for (const output of outputBuffer) {
          newLines.push({ type: 'output', content: output });
        }
      } catch (err) {
        newLines.push({ type: 'error', content: `Error: ${String(err)}` });
      }
    } else {
      newLines.push({ type: 'error', content: `Command not found: ${cmd}` });
    }

    appendLines(newLines);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  const renderLine = (line: TerminalLine, index: number) => {
    const lineStyle: React.CSSProperties = {
      color:
        line.type === 'error'
          ? '#ff6b6b'
          : line.type === 'command'
          ? terminalTheme.promptColor
          : terminalTheme.textColor,
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
    };

    const prefix = line.type === 'command' ? `${prompt} ` : '';
    return (
      <div key={index} style={lineStyle}>
        {prefix}
        {line.content}
      </div>
    );
  };

  const terminalStyle: React.CSSProperties = {
    backgroundColor: terminalTheme.backgroundColor,
    color: terminalTheme.textColor,
    fontFamily: terminalTheme.fontFamily,
    fontSize: terminalTheme.fontSize,
    lineHeight: terminalTheme.lineHeight,
    height: typeof height === 'number' ? `${height}px` : height,
    width: typeof width === 'number' ? `${width}px` : width,
    padding: '16px',
    border: '1px solid #333',
    borderRadius: '4px',
    overflowY: 'auto',
    boxSizing: 'border-box',
    ...style,
  };

  const inputStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: terminalTheme.promptColor,
    fontFamily: terminalTheme.fontFamily,
    fontSize: terminalTheme.fontSize,
    flex: 1,
  };

  const cursorStyle: React.CSSProperties = {
    backgroundColor: terminalTheme.cursorColor,
    width: '8px',
    height: '1em',
    display: 'inline-block',
    marginLeft: '2px',
    opacity: showCursor && cursorVisible ? 1 : 0,
    transition: 'opacity 0.2s',
  };

  return (
    <div className={`terminal ${className}`} style={terminalStyle} onClick={() => inputRef.current?.focus()}>
      {lines.map((line, index) => renderLine(line, index))}
      <div
        style={{
            color: terminalTheme.promptColor,
            display: 'flex',
            flexWrap: 'wrap',
            whiteSpace: 'pre-wrap',
        }}
        onClick={() => inputRef.current?.focus()}
        >
        <span>{prompt} </span>
        <span>
            {input}
            {showCursor && (
            <span style={cursorStyle} />
            )}
        </span>
        {/* Hidden input to capture keystrokes */}
        <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
            height: 0,
            width: 0,
            }}
        />
        </div>

    </div>
  );
};

export default Terminal;
