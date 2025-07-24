import React from 'react';
import { Terminal, TerminalLine } from '../src';

const TestTerminal: React.FC = () => {
  const sampleLines: TerminalLine[] = [
    { type: 'output', content: 'Welcome to easy-terminal-cli!' },
    { type: 'command', content: 'npm install easy-terminal-cli' },
    { type: 'output', content: '✓ Package installed successfully' },
    { type: 'command', content: 'ls -la' },
    { type: 'output', content: 'drwxr-xr-x  3 user user 4096 Jan 26 10:30 .' },
    { type: 'output', content: 'drwxr-xr-x  5 user user 4096 Jan 26 10:29 ..' },
    { type: 'output', content: '-rw-r--r--  1 user user  220 Jan 26 10:30 package.json' },
    { type: 'command', content: 'whoami' },
    { type: 'output', content: 'developer' },
    { type: 'command', content: 'nonexistent-command' },
    { type: 'error', content: 'command not found: nonexistent-command' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Terminal Component Tests</h1>
      
      <h2>Dark Theme</h2>
      <Terminal theme="dark" lines={sampleLines} prompt="user@localhost:~$" />
      
      <h2>Light Theme</h2>
      <Terminal theme="light" lines={sampleLines} prompt="dev>" />
      
      <h2>Matrix Theme</h2>
      <Terminal theme="matrix" lines={sampleLines} prompt="root#" />
      
      <h2>Retro Theme</h2>
      <Terminal theme="retro" lines={sampleLines} prompt="C:\\>" />
      
      <h2>Custom Theme</h2>
      <Terminal 
        theme={{
          backgroundColor: '#f7fafc',
          textColor: '#2d3748',
          promptColor: '#3182ce',
          cursorColor: '#e53e3e',
          fontFamily: 'Monaco, Consolas, monospace',
          fontSize: '16px',
          lineHeight: '1.6',
        }}
        lines={sampleLines}
        prompt="custom$"
        height="300px"
      />
    </div>
  );
};

export default TestTerminal;