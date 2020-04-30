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

const FilterByTag = ({setTagFilter}) => {
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
          setTagFilter(value);
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
};

export default FilterByTag;
