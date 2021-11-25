import { React } from 'react';
import Post from '../Post/Post';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts } from '../../features/Posts/postsSlice';
import { fetchPosts } from '../../features/Posts/postsSlice';

const useStyles =  makeStyles( theme => ({
    offset: theme.mixins.toolbar
}))

const RedditPosts = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const childrenArray = useSelector(selectPosts);
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])
    
    return (
        <div>
            <div className={classes.offset}></div>
                {  
                    childrenArray.map( (dataObject, index) => (
                        <Post key={index} data={dataObject.data}/>
                    ) )
                    }
            <div className={classes.offset}></div>
        </div>
    )
}

export default RedditPosts;
