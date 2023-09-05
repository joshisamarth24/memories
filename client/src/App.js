import React,{useEffect, useState} from 'react';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import { Container, ThemeProvider,createTheme} from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';


const theme = createTheme();
const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId="21738910197-2ujckpk7q39j97b6ekahk14tbo5pjjkb.apps.googleusercontent.com" >
      <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route path='/' exact Component={()=> <Navigate to='/posts' />} />
        <Route path='/posts' exact Component={Home} />
        <Route path='/posts/search' exact Component={Home} />
        <Route path='/posts/:id' exact Component={PostDetails} />
        <Route path='/auth' exact Component={()=>(!user ? <Auth/> : <Navigate to='/posts' />)} />
      </Routes>
    </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
    </ThemeProvider>
    
    
  );
};

export default App