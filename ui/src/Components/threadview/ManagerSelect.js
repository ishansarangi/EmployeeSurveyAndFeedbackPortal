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
import TextField from '@material-ui/core/TextField';
import {useStoreState} from 'easy-peasy';

const ManagerSelect = ({handleManagerSelection}) => {
  const getFullName = (user) => {
    let fullName = '';
    if (user.firstName) fullName = user.firstName;
    if (user.lastName) fullName = fullName + ' ' + user.lastName;
    return fullName;
  };

  const managerList = useStoreState((state) => state.managerList.managers);

  return (
    <Autocomplete
      id="size-small-filled-multi"
      size="medium"
      options={managerList}
      getOptionLabel={(option) => getFullName(option)}
      onChange={(event, value) => {
        if (value) handleManagerSelection(value);
        else handleManagerSelection([]);
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={getFullName(option)}
            size="small"
            {...getTagProps({index})}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label="Send To"
          placeholder="Select Manager"
        />
      )}
    />
  );
};

export default ManagerSelect;
