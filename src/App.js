import React from 'react';
import Navbar from './Components/Navbar/Navbar.jsx';
import { ThemeProvider, Grid } from '@mui/material';
import customTheme from './Components/Navbar/customTheme.js';
import RedditPosts from './Components/RedditPosts/RedditPosts.jsx';
import Subreddits from './Components/SubredditMenu/Subreddits.jsx';

function App() {

  return (
    <div>
      <ThemeProvider theme={customTheme}>
        
        <Navbar/>
        
        <Grid container spacing={0}>
          
          <Grid item md={4}>
           
          </Grid>
    
          <Grid item md={4}>
            <RedditPosts />
          </Grid>

          <Grid item md={4}>
            <Subreddits />
          </Grid>
            
        </Grid>

      </ThemeProvider>       
    </div>
  );
}

export default App;
