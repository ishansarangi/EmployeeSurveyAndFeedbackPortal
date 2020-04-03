import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ColorGrid = ({setColor}) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const timer = React.useRef();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = entry => {
    if (!loading) {
      setSuccess('');
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(entry);
        setLoading(false);
        setColor(entry);
      }, 100);
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
