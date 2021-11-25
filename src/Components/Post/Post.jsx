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
import { Divider, Stack } from '@mui/material';
import { ArrowCircleDown } from '@mui/icons-material';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ReactMarkdown from 'react-markdown';
import { fetchComments, selectComments, removeComments } from '../../features/Posts/postsSlice';
import { useDispatch, useSelector } from 'react-redux';

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
  const { title, subreddit, ups, permalink, selftext  } = data;
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (!expanded){ 
      dispatch(fetchComments(permalink));
      return;
    };
    dispatch(removeComments());
  };

  const anchorTitle = <a href={"https://www.reddit.com" + permalink} target="_blank" rel='noreferrer' >{title}</a>


  return (
    <Card sx={{ maxWidth: 500, maxHeight: '120%', marginTop: 2, textDecoration:'none' }}>
      <CardHeader
        title={anchorTitle}
        subheader={ `r/${subreddit}` }
      />
      <CardMedia
        component="img"
        height="auto"
        image={ "https://play-lh.googleusercontent.com/MDRjKWEIHO9cGiWt-tlvOGpAP3x14_89jwAT-nQTS6Fra-gxfakizwJ3NHBTClNGYK4" }
        alt="reddit logo"
      />
      <CardContent>
        <ReactMarkdown children={selftext} />
      </CardContent>
      <CardActions disableSpacing>
          <Stack >
            <IconButton aria-label="upvote" >
                <ArrowCircleUpIcon/>
            </IconButton>

            <Typography variant="body1" color="initial">{ups}</Typography>
            
            <IconButton aria-label="downvote">
                <ArrowCircleDown/>
            </IconButton>
          </Stack>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ForumOutlinedIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {
            comments.map( (dataObject, index) => (
              <>
              <Typography variant="h6" color="initial" key={index}>{dataObject.data.author}</Typography>
              <Typography variant="body2" color="initial" key={index}>
                  {dataObject.data.body}
              </Typography>
              <Divider/>
              </>
            ))
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}