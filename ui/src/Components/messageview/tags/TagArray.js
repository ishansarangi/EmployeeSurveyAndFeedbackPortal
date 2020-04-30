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
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import {remove_tag_from_thread, get_all_tags} from '../../apollo/Queries';
import {useAuthUser} from '../../auth/AuthUser';
import {useMutation, useLazyQuery} from '@apollo/react-hooks';
import {useStoreActions} from 'easy-peasy';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '45px',
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    backgroundColor: '#EBEBEB',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  chipContainer: {
    width: '80%',
  },
}));

const TagArray = ({tagData, threadId}) => {
  const classes = useStyles();
  const {loggedInUser} = useAuthUser();
  const sortedTagData = tagData.sort((a, b) => (a.name > b.name ? -1 : 1));

  const setTags = useStoreActions((actions) => actions.tagList.setTags);

  const [getTagData] = useLazyQuery(get_all_tags, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setTags(data.findAllTags);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [removeTagFromThread] = useMutation(remove_tag_from_thread, {
    onCompleted: (data) => {
      removeTag({
        threadId: threadId,
        tagId: data.removeTagFromThread.tagId,
      });
      getTagData();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const removeTag = useStoreActions(
    (actions) => actions.employeeThreadList.removeTagFromThread
  );

  const handleDelete = (chipToDelete) => () => {
    removeTagFromThread({
      variables: {
        employeeId: loggedInUser.employeeId,
        tagId: chipToDelete.tagId,
        threadId: threadId,
      },
    });
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.chipContainer}>
        {sortedTagData.map((data, index) => {
          return (
            <Chip
              style={{
                backgroundColor: data.color,
              }}
              key={data.index}
              label={data.name}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          );
        })}
      </div>
    </Paper>
  );
};

export default TagArray;
