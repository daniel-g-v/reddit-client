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
import { Divider, Link, Stack, Avatar } from '@mui/material';
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
import { selectSearchTerm } from '../../features/SearchBar/searchBarSlice';
import { logos } from '../../utils/subredditLogos';

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
  //data retreived from the api response
  const { title, 
          ups, 
          permalink, 
          selftext, 
          author, 
          subreddit, 
          url_overridden_by_dest, 
          num_comments, is_video, 
          media, 
          is_gallery, 
          preview } = data;

  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const commentsLoading = useSelector(isLoadingComments);
  const searchTerm = useSelector(selectSearchTerm);

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
  }; 
  //check if the post has an image
  let hasImage = '';
  if (preview) {
   hasImage = preview.enabled;
  }
  

  const card = <div>
    <Card sx={{ maxWidth: 600, maxHeight: '120%', marginTop: 2}}>
      <CardHeader
        title={<Link href={`https://www.reddit.com${permalink}`} sx={{color: 'black', textDecorationLine:'none'}} target='_blank'>{title}</Link>}
        subheader={ 
          <>
          <Stack direction='row' spacing={1}>
            <Avatar src={logos[subreddit]} sx={{ height: 16, width: 16}}/>
            <Link href={`https://www.reddit.com/r/${subreddit}`} sx={{color: 'black', textDecorationLine:'none'}} target='_blank' >{"r/" + subreddit}</Link>
          </Stack>
          <Typography variant="subtitle2" color="initial">{`user: ${author}`}</Typography>  
          </>
          }
      />
      <CardMedia
        component={ is_video ? "iframe" : "img" } 
        height={is_video ? media.reddit_video.height/2 : "auto"}
        alt="reddit logo"
        src= { is_video ? media.reddit_video.fallback_url 
               : is_gallery ? "https://play-lh.googleusercontent.com/MDRjKWEIHO9cGiWt-tlvOGpAP3x14_89jwAT-nQTS6Fra-gxfakizwJ3NHBTClNGYK4" 
               : hasImage ? url_overridden_by_dest 
               : "https://play-lh.googleusercontent.com/MDRjKWEIHO9cGiWt-tlvOGpAP3x14_89jwAT-nQTS6Fra-gxfakizwJ3NHBTClNGYK4"
              } 
      />
      
      <CardContent>{
          selftext ? 
          <ShowMoreText lines={4}
                        width={590}
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

            <Typography variant="body2" color="initial" sx={{marginLeft: 1}}>{formatUpVotes(ups)}</Typography>
            
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
          <Stack>
            <ForumOutlinedIcon />
            <Typography variant="body2" color="initial">{num_comments}</Typography>
          </Stack>
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
  </div>

  return (
    <>
        {
          searchTerm === '' ? card : title.toLowerCase().includes(searchTerm.toLowerCase()) ? card : null 
        }
    </>
  );
}