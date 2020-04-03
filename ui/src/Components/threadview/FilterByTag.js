import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '8px',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function FilterByTag() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="size-small-filled-multi"
        size="medium"
        options={tagList}
        noOptionsText="No more tags available!"
        filterSelectedOptions
        getOptionLabel={option => option.name}
        onChange={(event, value) => {
          console.log(value);
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="default"
              style={{
                backgroundColor: option.color,
              }}
              label={option.name}
              size="medium"
              {...getTagProps({index})}
            />
          ))
        }
        renderOption={option => (
          <Chip
            variant="default"
            style={{
              backgroundColor: option.color,
              padding: '15px',
              marginLeft: '12px',
            }}
            label={option.name}
            size="medium"
          />
        )}
        renderInput={params => (
          <TextField
            {...params}
            variant="filled"
            label="Filter By Tag"
            placeholder="Select Tag"
          />
        )}
      />
    </div>
  );
}

const tagList = [
  {name: 'Follow Up', tagId: 1, color: '#FFC107'},
  {name: 'Important', tagId: 2, color: '#46B978'},
  {name: 'Idea', tagId: 3, color: '#EEA5F6'},
  {name: 'Non Issue', tagId: 4, color: '#2EACE2'},
];
