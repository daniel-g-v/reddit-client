import React, { useState } from "react";
import { selectComments, setExpanded } from "../../features/Posts/postsSlice";
import Comments from "./Comments";
import { useSelector, useDispatch } from "react-redux";
import Button from '@mui/material/Button'

const postsPerPage = 3;
let arrayForHoldingPosts = [];

const LoadMoreComments = ({ expanded, setExpanded }) => {
//   const [postsToShow, setPostsToShow] = useState([]);
//   const [next, setNext] = useState(0);
//   const childrenArray = useSelector(selectComments);
//   const dispatch = useDispatch();
  
//   let posts = []; 
//   childrenArray.map( dataObject => {
//     let postObject = {
//         author: dataObject.data.author,
//         comment: dataObject.data.body
//     };
//     posts.push(postObject);
//     return posts;
// });
    
//  const loopWithSlice = (start, end) => {
//     const slicedPosts = posts.slice(start, end);
//     arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
//     setPostsToShow(arrayForHoldingPosts);
//   }

  const handleShowMorePosts = () => {
    // loopWithSlice(next, next + postsPerPage);
    // setNext(next + postsPerPage);

  };

  const handleClose = () => {
    // arrayForHoldingPosts=[];
    // dispatch(setExpanded());
    
  };

  return (
    <div>
      <Comments />
      <Button onClick={handleShowMorePosts} variant="text" color="secondary">
        Load more
      </Button>
      <Button onClick={handleClose} variant="text" color="secondary">
        Close
      </Button>
    </div>
  );
};

export default LoadMoreComments;
