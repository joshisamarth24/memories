import React,{useState} from 'react';
import { Card,CardMedia,CardActions,CardContent,Button,Typography, ButtonBase } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from "moment";
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../actions/posts";
import {useNavigate} from "react-router-dom";


import useStyles from "./styles.js";

const Post = ({post,setCurrentId}) => {
  
  const classes=useStyles();
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(post?.likes);
  const Navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('profile'));

  const openPost = (e) => Navigate(`/posts/${post._id}`);

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
  };

  return (

    <Card className={classes.card} raised elevation={6} >
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} onClick={openPost} style={{cursor:'pointer'}} />
        <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2}>
        {(user?.result?.googleId === post?.creator || user?.result?._id===post?.creator) && 
          (
            <Button style={{color:'white'}} size='small' 
          onClick={()=>{
            setCurrentId(post._id);
          }}>
            <MoreHorizIcon fontSize='default' />
          </Button>
          )}
        </div>
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=>{ return `#${tag}`})}</Typography>
        </div>
        <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
        <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
           <Likes />
          </Button>
          {(user?.result?.googleId === post?.creator || user?.result?._id===post?.creator) && 
          (
            <Button size='small' color='primary' onClick={()=>{dispatch(deletePost(post._id))}}>
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
          )}
        </CardActions>
        
    </Card>
  )
}

export default Post