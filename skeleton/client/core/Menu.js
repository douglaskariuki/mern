import { AppBar, IconButton, Link, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { authenticate, clearJwt, isAuthenticated } from '../auth/auth-helper'

const isActive = (history, path) => {
  if(history.location.pathname == path) {
    return {color: "#ff4081"}
  } else {
    return {color: "#ffffff"}
  }
}

const Menu = withRouter(({history}) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          MERN Skeleton
        </Typography>

        <Link to="/">
          <IconButton aria-label="Home">
            <HomeIcon />
          </IconButton>
        </Link>

        <Link to="/users">
          <Button style={isActive(history, "/users")}>Users</Button>
        </Link>

        {
          !isAuthenticated() && (
            <>
              <Link to="/signup">
                <Button style={isActive(history, "/signup")}>Sign Up</Button>
              </Link>

              <Link to="/signin">
                <Button style={isActive(history, "/signin")}>Sign In</Button>
              </Link>
            </>
          )
        }

        {
          isAuthenticated() && (
            <>
              <Link to={`/user/${isAuthenticated().user._id}`}>
                <Button style={isActive(history, `/user/${isAuthenticated().user._id}`)}>
                  My Profile
                </Button>
              </Link>

              <Button color="inherit" onClick={() => {clearJwt(() => history.push("/"))}}>
                Sign Out
              </Button>
            </>
          )
        }
      </Toolbar>
    </AppBar>
  </>
))

export default Menu
