import { React } from 'react';
import Post from '../Post/Post';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, fetchPosts, isLoading } from '../../features/Posts/postsSlice';
import { selectSubreddit } from '../../features/subredditsSlice';
import Loader from "react-loader-spinner";
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography'

const useStyles =  makeStyles( theme => ({
    offset: theme.mixins.toolbar
}))

const RedditPosts = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const childrenArray = useSelector(selectPosts);
    const postsLoading = useSelector(isLoading);
    const subreddit = useSelector(selectSubreddit)

    useEffect(() => {
        dispatch(fetchPosts(subreddit));
    }, [dispatch, subreddit])
    
    return (
        <div>
            <div className={classes.offset}></div>
                <Typography variant="h4" color="secondary" sx={{marginTop: 1}}>
                    {
                        subreddit === "" ? 'Popular Posts' : subreddit
                    }
                </Typography>
                {  !postsLoading  ?
                    childrenArray.map( (dataObject, index) => (
                        <Post key={index} data={dataObject.data}/>
                    ) ) : <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <Loader type="BallTriangle" color="#00BFFF" height={65} width={65} />
                        </Box>
                    }
            <div className={classes.offset}></div>
        </div>
    )
}

export default RedditPosts;
