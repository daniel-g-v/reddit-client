import { React, useState, useEffect } from 'react';

const RedditPosts = () => {
    const {posts, setPosts} = useState([]);

    
    return (
        <div>
            {
                posts.map(post => <Post />)
            }      
        </div>
    )
}

export default RedditPosts
