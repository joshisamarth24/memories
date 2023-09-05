import React, { useState } from 'react';
import ChipInput from 'material-ui-chip-input';
import { useNavigate, useLocation } from "react-router-dom";
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import Pagination from '../Pagination';
import { getPostsBySearch } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@mui/material";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);


  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`);
    }
    else {
      history('/');
    }
  }

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagtoDelete) => setTags(tags.filter((tag) => tag !== tagtoDelete));

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid container justify='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={7} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField
                name='search'
                variant='outlined'
                label='Search Memories'
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label='Search Tags'
                variant='outlined'
              />
              <Button className={classes.searchButton} color='primary' variant='contained' onClick={searchPost}>Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6}>
              <Pagination page={page} className={classes.pagination}  />
            </Paper>
            )}
          </Grid>
        </Grid>

      </Container>
    </Grow>
  )
}

export default Home