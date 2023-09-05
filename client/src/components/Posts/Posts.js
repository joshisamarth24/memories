import React from 'react';
import { Grid,CircularProgress } from '@mui/material';
import Post from './Post/Post';
import useStyles from "./styles.js";
import { useSelector } from 'react-redux';

const Posts = ({setCurrentId}) => {
  const {posts,isLoading}=useSelector((state)=>state.posts);
  const classes = useStyles();
  if(!isLoading && !posts.length) return 'No posts';
  return (
    isLoading?(<CircularProgress/>):(
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
          {posts.map((post)=>{
            return(
            <Grid key={post._id} item xs={6} sm={6} md={6} lg={3} >
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>);
          })}     
      </Grid>
    )
  )
}

export default Posts