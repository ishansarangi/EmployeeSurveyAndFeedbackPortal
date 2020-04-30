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
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {FormControl} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '8px',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

const SearchBox = ({setSearchText}) => {
  const classes = useStyles();

  return (
    <FormControl variant="filled" className={classes.root}>
      <TextField
        id="filled-search"
        label="Search"
        type="search"
        variant="filled"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </FormControl>
  );
};
SearchBox.propTypes = {};
export default SearchBox;
