import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const NavBar = props => {

    return (
        <AppBar position="static">
            <Toolbar>
                <TypoGraphy variant="title" color="inherit">
                    <h2>TalentMap</h2>
                </TypoGraphy>
                <List component="nav">
                    <ListItem component="div">
                        <ListItemText inset>
                            <TypoGraphy color="inherit" variant="title">
                                Dashboard
                            </TypoGraphy>
                        </ListItemText>
                        <ListItemText inset>
                            <TypoGraphy color="inherit" variant="title">
                                Reports
                            </TypoGraphy>
                        </ListItemText>
                        <ListItemText inset>
                            <TypoGraphy color="inherit" variant="title">
                                Feedback
                            </TypoGraphy>
                        </ListItemText>
                        <ListItemText inset>
                            <TypoGraphy color="inherit" variant="title" onClick={() => { props.onClick("manager"); }}>
                                Manager
                            </TypoGraphy>
                        </ListItemText>

                        <ListItemText inset>
                            <TypoGraphy color="inherit" variant="title" onClick={() => { props.onClick("employee"); }}>
                                Employee
                            </TypoGraphy>
                        </ListItemText>
                    </ListItem>

                </List>


            </Toolbar>

        </AppBar >

    )
}


export default NavBar;
