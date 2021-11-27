import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { makeStyles } from '@mui/styles';
import { changeSubreddit } from '../../features/subredditsSlice';
import { useDispatch } from 'react-redux';
import { alpha } from '@mui/material/styles';
import { ListItemButton } from '@mui/material';

const useStyles =  makeStyles( theme => ({
  offset: theme.mixins.toolbar,
  hover: {
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.15),
    }
  },
  
}))

export default function Subreddits() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const subredditsList = [ 'AskReddit', 'NoStupidQuestions', 'DestinyTheGame', 'explainlikeimfive', 'AskMen', 'leagueoflegends', 'Minecraft', 'anime', 'IAmA', 'AskWomen' ];


  return (
    <>
    <div className={classes.offset}></div>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
        subredditsList.map((subreddit, index) => (
        <ListItemButton className={classes.hover} sx={{margin: '5px 5px'}} onClick={() => dispatch(changeSubreddit(`r/${subreddit}`))}>
          <ListItem key={index}   >
          
            <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={subreddit}  />
          
          </ListItem>
        </ListItemButton>
        ))
      }
    </List>
    </>
  );
}

