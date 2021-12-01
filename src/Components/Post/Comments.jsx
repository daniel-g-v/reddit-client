import React from "react";
import { Divider, List, ListItem, Typography } from '@mui/material';

const Comments = ({ postsToRender }) => {return (
    <List>
        {postsToRender.map((post, index) => (
        <>
        <ListItem key={index}>
          <Typography variant="h6" color="initial" key={index}>{post.author}</Typography>
        </ListItem>
        <ListItem key={index+1}>
            <Typography variant="body2" color="initial" >{post.comment}</Typography>

        </ListItem>
      </>
      ))}
    </List>
      
  );
};
export default Comments;