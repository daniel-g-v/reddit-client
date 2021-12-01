import { React } from 'react';
import Post from '../Post/Post';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, fetchPosts, isLoading } from '../../features/Posts/postsSlice';
import { selectSubreddit } from '../../features/subredditsSlice';
import Loader from "react-loader-spinner";
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { logos } from '../../utils/subredditLogos';
import { Avatar, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles =  makeStyles( theme => ({
    offset: theme.mixins.toolbar
}))

const RedditPosts = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const childrenArray = useSelector(selectPosts);
    const postsLoading = useSelector(isLoading);
    const subreddit = useSelector(selectSubreddit);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    //change loading spinner position according to viewport size
    const isSmall = matches ? 'end' : 'center'; 

    useEffect(() => {
        dispatch(fetchPosts(subreddit));
    }, [dispatch, subreddit])

    const subredditString = <Typography variant="h4">{subreddit}</Typography>
    

    return (
        <div>
            <div className={classes.offset}></div>
                    {
                        subreddit === "" ? <Typography variant="h4" sx={{margin: 1}}>Popular Posts</Typography> 
                                           : <div>
                                                <Stack direction='row' spacing={2} sx={{marginTop: 1}}>
                                                    <Avatar alt={subreddit} src={logos[subreddit.slice(2)]}></Avatar>   
                                                    {subredditString}
                                                </Stack>
                                            </div>                                   
                    }
                {  !postsLoading  ?
                    childrenArray.map( (dataObject, index) => (
                        <Post key={index} data={dataObject.data}/> 
                    ) ) : <Box sx={{ display: 'flex', justifyContent: isSmall, marginTop: 2 }}>
                            <Loader type="BallTriangle" color="#00BFFF" height={65} width={65} />
                        </Box>
                    }
            <div className={classes.offset}></div>
        </div>
    )
}

export default RedditPosts;
