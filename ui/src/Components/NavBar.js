/**
 * Copyright 2020 Ishan Kumar Sarangi, Sabyasachi Mohanty, Kumar Prabhu Kalyan, Alsha Samantaray, Kirti Jha
 * Copyright 2020 Arizona State University
 * Copyright 2020 TalentMap
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {useHistory} from 'react-router-dom';
import {useAuthUser} from './auth/AuthUser';

const useStyles = makeStyles((theme) => ({
  addUser: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    float: 'right',
  },
  sectionDesktop: {
    width: '100%',
  },
}));

const NavButton = withStyles((theme) => ({
  root: {
    color: '#ffffff',
  },
}))(Button);

const NavBar = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const {loggedInUser} = useAuthUser();
  const menuId = 'primary-search-account-menu';
  const menuTitle = loggedInUser ? 'Profile' : 'Login';

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleMenuClose();
    history.push('/login');
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogin}>{menuTitle}</MenuItem>
    </Menu>
  );

  return (
    <AppBar className={classes.searchBar} position="static" elevation={0}>
      <Toolbar>
        <Link to="/" style={{color: '#FFF'}}>
          <NavButton>
            <Typography variant="h4" component="h6" color="inherit">
              TalentMap
            </Typography>
          </NavButton>
        </Link>

        <List component="nav">
          <ListItem component="div">
            <ListItemText inset>
              <Link to="/dashboard" style={{color: '#FFF'}}>
                <NavButton>
                  <Typography color="inherit" variant="h6" component="h6">
                    Dashboard
                  </Typography>
                </NavButton>
              </Link>
            </ListItemText>
            <ListItemText inset>
              <Link to="/reports" style={{color: '#FFF'}}>
                <NavButton>
                  <Typography color="inherit" variant="h6" component="h6">
                    Reports
                  </Typography>
                </NavButton>
              </Link>
            </ListItemText>
            <ListItemText inset>
              <Link to="/feedbackview" style={{color: '#FFF'}}>
                <NavButton>
                  <Typography color="inherit" variant="h6" component="h6">
                    FeedBack
                  </Typography>
                </NavButton>
              </Link>
            </ListItemText>
          </ListItem>
        </List>
        <div className={classes.sectionDesktop}>
          <IconButton
            className={classes.menuButton}
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        {renderMenu}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
