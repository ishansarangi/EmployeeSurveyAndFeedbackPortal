import React, {useContext} from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {UserType} from './UserType';
import {UserContext} from './UserContext';
import Button from '@material-ui/core/Button';

const NavButton = withStyles(theme => ({
  root: {
    color: '#ffffff',
  },
}))(Button);

const NavBar = props => {
  const {userType, setUserType} = useContext(UserContext);

  const changeUserType = () => {
    if (userType === UserType.Employee) {
      setUserType(UserType.Manager);
    } else if (userType === UserType.Manager) {
      setUserType(UserType.Employee);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <TypoGraphy variant="title" color="inherit">
          <h2>TalentMap</h2>
        </TypoGraphy>
        <List component="nav">
          <ListItem component="div">
            <ListItemText inset>
              <NavButton>
                <TypoGraphy color="inherit" variant="title">
                  Dashboard
                </TypoGraphy>
              </NavButton>
            </ListItemText>
            <ListItemText inset>
              <NavButton>
                <TypoGraphy color="inherit" variant="title">
                  Reports
                </TypoGraphy>
              </NavButton>
            </ListItemText>
            <ListItemText inset>
              <NavButton href="/my-feedback">
                <TypoGraphy color="inherit" variant="title">
                  Feedback
                </TypoGraphy>
              </NavButton>
            </ListItemText>
            <ListItemText inset>
              <FormControlLabel
                control={
                  <Switch
                    checked={userType === UserType.Manager}
                    onChange={() => changeUserType()}
                  />
                }
                label={
                  userType === UserType.Employee
                    ? 'Change to Manager'
                    : 'Switch back to Employee'
                }
              />
            </ListItemText>
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
