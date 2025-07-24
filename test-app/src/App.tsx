import React from 'react';
import { Terminal, TerminalLine } from 'easy-terminal-cli';

function App() {
  const lines: TerminalLine[] = [
    { type: 'command', content: 'npm test' },
    { type: 'output', content: 'Testing easy-terminal-cli...' },
    { type: 'output', content: '✓ All tests passed!' },
  ];

  return (
    <div className="App">
      <h1>Testing easy-terminal-cli</h1>
      <Terminal theme="dark" lines={lines} />
    </div>
  );
}

export default App;