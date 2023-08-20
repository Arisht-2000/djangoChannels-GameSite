// myapp/static/myapp/js/main.js
import React from 'react';
import { createRoot } from 'react-dom/client';

import GameBoard from './GameBoard';

// Retrieve the game object from Django template context (as in step 1)
const gameJson = '{{ game|json_script }}';
const game = JSON.parse(gameJson);

// Create a root and render the GameBoard component
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<GameBoard />);
