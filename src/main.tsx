import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import the generated token variables once at the app root, as CLAUDE.md says.
// variables.light.css defines :root; variables.dark.css defines [data-theme="dark"].
import '../build/css/variables.light.css';
import '../build/css/variables.dark.css';
import '../build/css/typography.css';

import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
