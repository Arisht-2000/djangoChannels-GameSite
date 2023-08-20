// myapp/static/myapp/js/main.js
import React from 'react';
import { createRoot } from 'react-dom/client';

import GameBoard from './GameBoard';

// Create a root and render the GameBoard component
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<GameBoard />);
