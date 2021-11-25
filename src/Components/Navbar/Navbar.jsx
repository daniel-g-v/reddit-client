import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RedditIcon from '@mui/icons-material/Reddit';
import Searchbar from './Searchbar.jsx';
import { Box, Hidden, Grid }from '@mui/material';


const Navbar = () => {
    
    return (
        <AppBar position="fixed" >
          <Toolbar>
            <Grid container>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={3}>
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
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={5} xs={6}>    
                    <Searchbar />
                </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
    )
}

export default Navbar
