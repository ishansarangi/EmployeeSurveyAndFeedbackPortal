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

const useStyles = makeStyles(theme => ({
  addUser: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const NavButton = withStyles(theme => ({
  root: {
    color: '#ffffff',
  },
}))(Button);

const NavBar = props => {
  const classes = useStyles();

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
              <Link to="/feedbackview" style={{color: '#FFF'}}>
                <NavButton>
                  <Typography color="inherit" variant="h6" component="h6">
                    FeedBack
                  </Typography>
                </NavButton>
              </Link>
            </ListItemText>

            <ListItemText inset>
              <Link to="/login" style={{color: '#FFF'}}>
                <NavButton>
                  <Typography color="inherit" variant="h6" component="h6">
                    Login
                  </Typography>
                </NavButton>
              </Link>
            </ListItemText>
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
