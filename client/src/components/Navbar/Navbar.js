import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import decode from "jwt-decode";
import useStyles from './styles';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    navigate('/');
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location])

  return (
    <AppBar className={classes.appBar} position='static' color='inherit' style={{
      display: "flex",
      flexDirection: "row"
    }}>
      <Link to='/'>
        <img src={memoriesText} alt='icon' height="45px" />
        <img className={classes.image} src={memoriesLogo} alt='memories' height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
            <Button className={classes.logout} variant='contained' color='secondary' onClick={logout} >Logout</Button>
          </div>
        ) : (
          <Button variant='contained' color='primary' component={Link} to="/auth">Sign in</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;