import React from 'react';
import '../messageview/message.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const SearchBox = () => {
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            maxWidth: '100%',
            backgroundColor: theme.palette.background.paper,
        },
    }));
    const classes = useStyles();
    return (
        <div>
            <List className="send-container" dense={false}>
                <ListItem className={classes.root}>
                    <ListItemText>
                        <TextField
                            size="medium"
                            fullWidth
                            className="send-input"
                            placeholder="Search"
                            multiline

                            inputProps={{
                                style: {
                                    padding: 5,
                                },
                            }}
                            onChange={event => {

                            }}
                        />
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    );
};
SearchBox.propTypes = {};
export default SearchBox;