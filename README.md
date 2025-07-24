# easy-terminal-cli

A customizable React terminal package component with theme support, perfect for building terminal-like interfaces in your React applications.

[![npm version](https://badge.fury.io/js/easy-terminal-cli.svg)](https://badge.fury.io/js/easy-terminal-cli)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## Features

-  **Multiple built-in themes** (dark, light, matrix, retro)
-  **Custom theme support** with full TypeScript definitions
-  **Lightweight and performant** - no external dependencies
-  **Responsive design** with customizable dimensions
-  **Customizable prompt** and cursor
-  **Line history support** with different line types
-  **TypeScript first** with full type safety
-  **Universal compatibility** - works with CJS, ESM, and TypeScript

## Live DEMO

[Check out Live terminal web Demo](https://easy-terminal-mu.vercel.app/)

## Installation

```bash
npm install easy-terminal-cli
```

```bash
yarn add easy-terminal-cli
```

```bash
pnpm add easy-terminal-cli
```

## Quick Start

### Minimal Example

```tsx
import React from 'react';
import { Terminal } from 'easy-terminal-cli';

const App: React.FC = () => {
  return (
    <div style={{ padding: 20, background: '#000', minHeight: '100vh', color: '#0f0' }}>
      <h2 style={{ color: '#0f0', textAlign: 'center' }}>Minimal Terminal Demo</h2>

      <Terminal
        prompt="user@mini:~$"
        theme="matrix"
        height={300}
        width="100%"
        showCursor
        cursorBlink
        commands={{
          help: () =>
            [
              'Available commands:',
              '  help         Show this message',
              '  hello        Print a greeting',
              '  clear        Clear the terminal',
            ].join('\n'),

          hello: () => 'Hello there! Welcome to this minimal terminal.',
        }}
      />
    </div>
  );
};

export default App;

```

## API Reference

### Terminal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'dark' \| 'light' \| 'matrix' \| 'retro' \| TerminalTheme` | `'dark'` | Terminal color theme |
| `prompt` | `string` | `'$'` | Command prompt symbol |
| `height` | `string \| number` | `'400px'` | Terminal height |
| `width` | `string \| number` | `'100%'` | Terminal width |
| `lines` | `TerminalLine[]` | `[]` | Array of terminal lines to display |
| `showCursor` | `boolean` | `true` | Whether to show the cursor |
| `cursorBlink` | `boolean` | `true` | Whether the cursor should blink |
| `className` | `string` | `''` | Additional CSS class name |
| `style` | `React.CSSProperties` | `{}` | Additional inline styles |

### TerminalLine Interface

```typescript
interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp?: Date;
}
```

### TerminalTheme Interface

```typescript
interface TerminalTheme {
  backgroundColor: string;
  textColor: string;
  promptColor: string;
  cursorColor: string;
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
}
```

## Themes

### Built-in Themes

#### Dark Theme (default)
```tsx
<Terminal theme="dark" />
```

#### Light Theme
```tsx
<Terminal theme="light" />
```

#### Matrix Theme
```tsx
<Terminal theme="matrix" />
```

#### Retro Theme
```tsx
<Terminal theme="retro" />
```

### Custom Themes

You can create custom themes by passing a theme object:

```tsx
const customTheme = {
  backgroundColor: '#2d3748',
  textColor: '#e2e8f0',
  promptColor: '#68d391',
  cursorColor: '#ed8936',
  fontFamily: 'Monaco, Consolas, monospace',
  fontSize: '16px',
  lineHeight: '1.5',
};

<Terminal theme={customTheme} />
```

## Advanced Usage

### Interactive Terminal with all examples

```tsx
import React from 'react';
import { Terminal } from 'easy-terminal-cli';

/**
 * Demo application showcasing the full power of easy-terminal-cli.
 * Includes an extensive set of custom commands, async behaviour,
 * themed UI, and side‑effect examples (navigation, timers, logging).
 */

const jokes = [
  "Why do Java developers wear glasses? Because they don't C#.",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "There are 10 kinds of people: those who understand binary and those who don't.",
];

const quotes = [
  'Code is like humor. When you have to explain it, it’s bad. – Cory House',
  'First, solve the problem. Then, write the code. – John Johnson',
  'Programs must be written for people to read, and only incidentally for machines to execute. – Harold Abelson',
];

const App: React.FC = () => {
  /** Simulated SPA navigation */
  const navigate = (route: string) => {
    console.log(`Navigating to /${route} ...`);
    window.history.pushState({}, '', `/${route}`);
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}> Easy Terminal CLI – Mega Demo</h1>
        <p style={styles.subtitle}>
          Terminal component for React – with custom commands, async tasks & more.
        </p>
      </header>

      <main style={styles.main}>
        <Terminal
          prompt="dev@demo:~$"
          theme="matrix"
          height={420}
          width="100%"
          cursorBlink
          showCursor
          commands={{
            /** Make your OWN custom commands and functions **/
            /** Core help */
            help: () =>
              [
                ' Available commands:',
                '  help                Show this list',
                '  greet               Friendly greeting',
                '  echo <text>         Echo back text',
                '  math <expr>         Evaluate math expression',
                '  date                Show current date/time',
                '  joke                Random dev joke',
                '  quote               Random programming quote',
                '  ascii               Display cute ASCII cat',
                '  migrate             Simulate async migration',
                '  open <route>        Fake SPA navigation',
                '  theme <name>        Switch terminal theme',
                '  clear               Clear terminal',
              ].join('\n'),

            /** Simple static response */
            greet: () => 'Hello, Developer! Happy coding!',

            /** Echo user args */
            echo: (args) => args.join(' '),

            /** Math evaluator */
            math: (args) => {
              try {
                // eslint-disable-next-line no-eval
                const result = eval(args.join(' '));
                return `Result: ${result}`;
              } catch {
                return 'Invalid expression';
              }
            },

            /** Date/time */
            date: () => new Date().toString(),

            /** Random joke */
            joke: () => jokes[Math.floor(Math.random() * jokes.length)],

            /** Random quote */
            quote: () => quotes[Math.floor(Math.random() * quotes.length)],

            /** ASCII art */
            ascii: () => [' /\\_/\\', '( o.o )', ' > ^ <'].join('\n'),

            /** Async migration demo */
            migrate: () => {
              console.log(' Preparing migration…');
              setTimeout(() => console.log(' Migrating data…'), 800);
              setTimeout(() => console.log(' Migration complete.'), 2000);
            },

            /** Fake page navigation */
            open: (args) => {
              if (args[0]) {
                navigate(args[0]);
                return `Opening /${args[0]} ...`;
              }
              return 'Usage: open <route>';
            },
          }}
        />
      </main>
    </div>
  );
};


const styles: Record<string, React.CSSProperties> = {
  page: {
    background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Inter, sans-serif',
  },
  header: {
    marginTop: 48,
    textAlign: 'center',
  },
  title: {
    fontSize: '2.8rem',
    lineHeight: 1.2,
    background: 'linear-gradient(90deg,#00c6ff,#0072ff)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    margin: 0,
  },
  subtitle: {
    marginTop: 8,
    fontSize: '1.1rem',
    color: '#bbbbbb',
  },
  main: {
    marginTop: 40,
    width: '90%',
    maxWidth: 960,
  },
  footer: {
    marginTop: 'auto',
    padding: '32px 0',
    fontSize: '0.85rem',
    color: '#888',
  },
  link: {
    color: '#00c6ff',
    textDecoration: 'none',
  },
};

export default App;

```

### Responsive Terminal

```tsx
<Terminal
  theme="dark"
  height="50vh"
  width="90vw"
  style={{ 
    maxWidth: '800px',
    margin: '0 auto',
    border: '2px solid #333',
    borderRadius: '8px'
  }}
/>
```

## TypeScript Support

This package is built with TypeScript and provides full type definitions. No additional `@types` packages are needed.

```typescript
import { Terminal, TerminalProps, TerminalTheme, TerminalLine } from 'easy-terminal-cli';

const props: TerminalProps = {
  theme: 'dark',
  lines: [
    { type: 'command', content: 'ls -la' },
    { type: 'output', content: 'total 42' }
  ]
};
```

## Configuration props


```typescript
interface TerminalProps {
  theme?: 'dark' | 'light' | 'matrix' | 'retro' | TerminalTheme;
  prompt?: string;
  height?: string | number;
  width?: string | number;
  showCursor?: boolean;
  cursorBlink?: boolean;
  className?: string;
  style?: React.CSSProperties;
  commands?: Record<string, (args: string[]) => void | string | string[]>;
}
```

## Compatibility

-  **React 16.8+** (Hooks support required)
-  **TypeScript 4.0+**
-  **Next.js** (SSR compatible)
-  **Create React App**
-  **Vite**
-  **Webpack**
-  **Node.js** (for SSR/testing)

## Browser Support

-  Chrome 88+
-  Firefox 85+
-  Safari 14+
-  Edge 88+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/officiallyutso/easy-terminal-cli.git
cd easy-terminal-cli

# Install dependencies
npm install

# Start development mode
npm run dev

# Run type checking
npm run type-check

# Build the package
npm run build
```

## License

MIT © [UTSO SARKAR](LICENSE)

## Changelog

### v1.1.4

- Usage codes added to doc

### v1.1.3

- Live Demo added

### v1.1.2

- Fixed blinking cursor behaviour

### v1.1.1

- Custom command system with support for side effects and `console.log` capture
- Built-in commands: `clear`, `theme`
- Dynamic theming (`dark`, `light`, `matrix`, `retro`)
- React + TypeScript support with full customization


### v1.0.0
- Initial release
- Basic terminal component with theme support
- TypeScript definitions
- Built-in themes: dark, light, matrix, retro
- Customizable prompt and cursor

---

Made for the React community