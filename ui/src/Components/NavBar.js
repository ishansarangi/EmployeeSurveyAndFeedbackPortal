import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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

                    </ListItem>

                </List>

                <Grid
                    justify="space-between" // Add it here :)
                    container
                    spacing={2}
                >
                    <Grid item>
                        <div>
                            <Button id="manager" href="#text-buttons" color="inherit">
                                Manager
                            </Button>

                        </div>
                    </Grid>

                    <Grid item>
                        <div>
                            <Button href="#text-buttons" color="inherit"
                                onClick={() => props.onClick("employee")}>
                                Employee
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Toolbar>

        </AppBar>

    )
}

export default NavBar;
