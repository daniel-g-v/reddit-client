import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { changeSubreddit } from '../../features/subredditsSlice';
import { useDispatch } from 'react-redux';
import { alpha } from '@mui/material/styles';
import { ListItemButton} from '@mui/material';
import { logos } from '../../utils/subredditLogos';

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
    <List sx={{  maxWidth: 275, bgcolor: 'background.paper' }}>
      {
        subredditsList.map((subreddit, index) => (
        <ListItemButton className={classes.hover} key={index} sx={{margin: '5px 5px'}} onClick={() => dispatch(changeSubreddit(`r/${subreddit}`))}>
          <ListItem>
          
            <ListItemAvatar>
                <Avatar alt={subreddit} src={logos[subreddit]}>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={subreddit} sx={{display:'flex', flexShrink:'2'}}/>
          
          </ListItem>
        </ListItemButton>
        ))
      }
    </List>
    </>
  );
}

