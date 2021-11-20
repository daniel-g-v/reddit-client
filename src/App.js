import React from 'react';
import Navbar from './Components/Navbar/Navbar.jsx';
import { ThemeProvider } from '@mui/material';
import customTheme from './Components/Navbar/customTheme.js';

function App() {
  return (
    <div>
      <ThemeProvider theme={customTheme}>
        <Navbar/>
      </ThemeProvider>       
    </div>
  );
}

export default App;
