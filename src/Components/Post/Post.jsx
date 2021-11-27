import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Divider, Link, Stack } from '@mui/material';
import { ArrowCircleDown } from '@mui/icons-material';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ReactMarkdown from 'react-markdown';
import { fetchComments, selectComments, removeComments, isLoadingComments } from '../../features/Posts/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Box } from '@mui/system';
import ShowMoreText from "react-show-more-text";
import './Post.css';
import { formatUpVotes } from '../../utils/helperFunctions';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post({ data }) {
  const [expanded, setExpanded] = React.useState(false);
  const { title, ups, permalink, selftext, author, subreddit, url_overridden_by_dest, num_comments, is_video, media } = data;
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const commentsLoading = useSelector(isLoadingComments)

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (!expanded){ 
      dispatch(fetchComments(permalink));
      return;
    };
    dispatch(removeComments());
  };

  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  }

  return (
    <Card sx={{ maxWidth: 500, maxHeight: '120%', marginTop: 2}}>
      <CardHeader
        title={title}
        subheader={ 
          <>
          <Link href={`https://www.reddit.com/${permalink}`} sx={{color: 'black'}} >{"r/" + subreddit}</Link>
          <Typography variant="subtitle2" color="initial">{`user: ${author}`}</Typography>  
          </>
          }
      />
      <CardMedia
        component={ is_video ? "video" : "img" } 
        height="auto"
        alt="reddit logo"
        src= { is_video ? media.reddit_video.fallback_url : url_overridden_by_dest === undefined ? "https://play-lh.googleusercontent.com/MDRjKWEIHO9cGiWt-tlvOGpAP3x14_89jwAT-nQTS6Fra-gxfakizwJ3NHBTClNGYK4" 
        : url_overridden_by_dest } 
      />
      
      <CardContent>{
          selftext ? 
          <ShowMoreText lines={4}
                        width={490}
                        more="Show more"
                        less="Show less"
                        onClick={executeOnClick}
                        expanded={false}
                        truncatedEndingComponent={"..."}
                        anchorClass='expander'
          >
            <ReactMarkdown children={selftext} />
          </ShowMoreText> : null
        }
      </CardContent>
      
      <CardActions disableSpacing>
          <Stack >
            <IconButton aria-label="upvote" >
                <ArrowCircleUpIcon/>
            </IconButton>

            <Typography variant="body1" color="initial" sx={{marginLeft: 1}}>{formatUpVotes(ups)}</Typography>
            
            <IconButton aria-label="downvote">
                <ArrowCircleDown/>
            </IconButton>
          </Stack>
        
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{display: 'flex', flexFirection: 'columns'}}
        >
          <ForumOutlinedIcon />
          <Typography variant="body1" color="initial">{num_comments}</Typography>
        </ExpandMore>
        
      
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          { !commentsLoading ? 
            comments.map( (dataObject, index) => (
              <>
              <Typography variant="h6" color="initial" key={index}>{dataObject.data.author}</Typography>
              <Typography variant="body2" color="initial" key={index + 1 }>
                  {dataObject.data.body}
              </Typography>
              <Divider/> 
              </>
            )) :	<Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Loader type="BallTriangle" color="#00BFFF" height={65} width={65} />
                  </Box>
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}