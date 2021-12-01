import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RedditIcon from '@mui/icons-material/Reddit';
import Searchbar from './Searchbar.jsx';
import { Box, Hidden, Grid }from '@mui/material';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeSubreddit } from '../../features/subredditsSlice.js';
import TemporaryDrawer from './Drawer';




const Navbar = () => {
    
    const dispatch = useDispatch();

    return (
        <AppBar position="fixed" >
          <Toolbar >
            <Grid container>
                <Grid item md={4} sm={4} xs={3}>
                    <IconButton onClick={() => dispatch(changeSubreddit(''))}>
                    <Box sx={{
                        display: 'flex'
                    }}>
                        <RedditIcon color='secondary' fontSize='large' sx={{marginRight: '6px', marginTop: '2px', marginLeft: '10px'}}/>
                        <Hidden smDown>
                            <Typography variant="h6" color='secondary' sx={{paddingTop: '0.4rem', fontWeight: 'bold'}}>
                                Reddit
                            </Typography>
                            <Typography variant="h6" color="initial" sx={{paddingTop: '0.4rem', fontWeight: 'bold'}}>
                                Minimal
                            </Typography>
                        </Hidden>
                    </Box>
                    </IconButton>
                </Grid>
                <Grid item md={4} sm={5} xs={7}>   
                    <Box sx={{paddingTop:1}}> 
                        <Searchbar />
                    </Box>
                </Grid>
                
                <Grid item xs={2}> 
                    <Hidden smUp>   
                        <TemporaryDrawer/>
                    </Hidden>
                </Grid>
                
            </Grid>
          </Toolbar>
        </AppBar>
    )
}

export default Navbar
