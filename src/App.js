import React from 'react';
import Navbar from './Components/Navbar/Navbar.jsx';
import { ThemeProvider, Grid, Hidden } from '@mui/material';
import customTheme from './Components/Navbar/customTheme.js';
import RedditPosts from './Components/RedditPosts/RedditPosts.jsx';
import Subreddits from './Components/SubredditMenu/Subreddits.jsx';
import BackToTop from './Components/BackToTop/BackToTopButton.jsx';

function App() {

  return (
    <div>
      <ThemeProvider theme={customTheme}>
        <Navbar/>
        <BackToTop/>
        <Grid container spacing={0}>
          <Grid item md={3} xl={4}></Grid>
          <Grid item sm={8} md={4} xl={3} >
            <RedditPosts />
          </Grid>
          <Hidden smDown>
            <Grid item sm={4} md={4} xl={5}>
              <Subreddits />
            </Grid>
          </Hidden>    
        </Grid>
      </ThemeProvider>       
    </div>
  );
}

export default App;
