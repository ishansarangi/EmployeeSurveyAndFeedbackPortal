import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useStoreState} from 'easy-peasy';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '8px',
  },
}));

export default function FilterByTag() {
  const classes = useStyles();
  const tagList = useStoreState((state) => state.tagList.tags);
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="size-small-filled-multi"
        size="medium"
        options={tagList}
        noOptionsText="No more tags available!"
        filterSelectedOptions
        getOptionLabel={(option) => option.name}
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
              size="small"
              {...getTagProps({index})}
            />
          ))
        }
        renderOption={(option) => (
          <Chip
            variant="default"
            style={{
              backgroundColor: option.color,
              padding: '15px',
              marginLeft: '12px',
            }}
            label={option.name}
            size="small"
          />
        )}
        renderInput={(params) => (
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
