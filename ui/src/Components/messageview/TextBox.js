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
import './message.css';
import {withStyles} from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import {orange} from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {makeStyles} from '@material-ui/core/styles';

const TextBox = ({text, setText, handleSubmit}) => {
  const CreateButton = withStyles((theme) => ({
    root: {
      color: '#ffffff',
      backgroundColor: '#E87424',
      '&:hover': {
        backgroundColor: orange[600],
      },
    },
  }))(Button);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '90%',
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const classes = useStyles();
  return (
    <List className="send-container" dense={false}>
      <ListItem className={classes.root}>
        <ListItemText>
          <TextField
            size="medium"
            fullWidth
            className="send-input"
            placeholder="Type Something..."
            multiline
            rowsMax={5}
            value={text}
            inputProps={{
              style: {
                padding: 5,
              },
            }}
            onChange={(event) => {
              event.preventDefault();
              setText(event.target.value);
            }}
          />
        </ListItemText>

        <ListItemSecondaryAction>
          <CreateButton
            variant="contained"
            disabled={!text}
            onClick={handleSubmit}
          >
            <SendIcon style={{color: '#FFF'}}></SendIcon>
          </CreateButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};
TextBox.propTypes = {};
export default TextBox;
