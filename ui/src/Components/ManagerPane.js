import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Feedback from './Feedback';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props}/>;
}

const ManagerPane = (props) => {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div className="main">
            <nav className="navigation-bar">
                <div className={
                    classes.root
                }>
                    <List component="nav" aria-label="secondary mailbox folders">
                        <ListItemLink href="#employee-feedback"
                            selected={
                                selectedIndex === 0
                            }
                            onClick={
                                event => handleListItemClick(event, 0)
                        }>
                            <ListItemText primary="Employee Feedback"/>
                        </ListItemLink>
                        <ListItemLink href="#my-feedback"
                            selected={
                                selectedIndex === 1
                            }
                            onClick={
                                event => handleListItemClick(event, 1)
                        }>
                            <ListItemText primary="My Feedback"/>
                        </ListItemLink>
                    </List>
                </div>
            </nav>
            <div className="child-content">
                {/* need to remove feedback and update using props */}
                <Feedback/>
            </div>
        </div>
    );
} 

ManagerPane.propTypes = {
    children: PropTypes.element.isRequired
};

export default ManagerPane;
