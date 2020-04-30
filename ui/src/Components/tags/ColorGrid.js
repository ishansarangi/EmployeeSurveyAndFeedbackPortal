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

import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ColorGrid = ({setColor, handleClose}) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const timer = React.useRef();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = (entry) => {
    if (!loading) {
      setSuccess('');
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(entry);
        setLoading(false);
        setColor(entry);
        handleClose();
      }, 300);
    }
  };

  const tileData = [
    ['#FFC107', '#46B978', '#EEA5F6'],
    ['#2EACE2', '#1E7348', '#9D8A90'],
    ['#EB144C', '#CDDC39', '#C3456C'],
  ];

  const getGridRow = (row, index) => {
    return (
      <Grid key={index} container spacing={1}>
        {row.map((entry, ind) => {
          return (
            <Grid item key={index + ind} xs={4}>
              <Button
                style={{
                  backgroundColor: entry,
                  maxWidth: '40px',
                  maxHeight: '40px',
                  minWidth: '40px',
                  minHeight: '40px',
                }}
                variant="contained"
                onClick={() => handleButtonClick(entry)}
              >
                {success === entry && <CheckIcon />}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      {tileData.map((row, index) => {
        return getGridRow(row, index);
      })}
    </div>
  );
};

export default ColorGrid;
