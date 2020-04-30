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

import React, {useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CustomizedInputBase from './SearchTags';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import {add_tags_to_thread, get_all_tags} from '../../apollo/Queries';
import {useAuthUser} from '../../auth/AuthUser';
import {useMutation, useLazyQuery} from '@apollo/react-hooks';
import {useStoreState, useStoreActions} from 'easy-peasy';
import useDebounce from '../../util/UseDebounce';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: 275,
    height: 275,
    minHeight: 275,
  },
  tagList: {
    maxHeight: 225,
    overflow: 'auto',
  },
});

const ManageTagButton = withStyles((theme) => ({
  root: {
    color: '#E87424',
    width: 'fit-content',
    float: 'right',
  },
}))(Button);

const TagListContainer = ({handleClickOpen, threadData}) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');
  const debouncedSearchTerm = useDebounce(searchText, 500);
  const tags = useStoreState((state) =>
    state.tagList.filterTags(debouncedSearchTerm)
  );

  return (
    <Paper className={classes.root} square>
      <CustomizedInputBase setSearchText={setSearchText} />
      <TagTable threadData={threadData} tags={tags} />
      <div style={{width: '100%', bottom: 0, position: 'absolute'}}>
        <ManageTagButton onMouseDown={handleClickOpen} fullWidth>
          MANAGE TAGS
        </ManageTagButton>
      </div>
    </Paper>
  );
};

const useStylesTag = makeStyles({
  tagList: {
    maxHeight: 200,
    overflow: 'auto',
  },
});

const TagTable = ({threadData, tags}) => {
  const {loggedInUser} = useAuthUser();
  const classes = useStylesTag();
  const showSnack = useStoreActions(
    (actions) => actions.snackBarModel.showSnack
  );

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

  const [addTagsToThreads] = useMutation(add_tags_to_thread, {
    onCompleted: (data) => {
      addTags({
        threadId: threadData.threadId,
        tag: data.addTagToThread,
      });
      getTagData();
    },
    onError: (error) => {
      console.log(error);
      showSnack({
        message: 'Failed to Tag Thread!',
        severity: 'error',
      });
    },
  });

  const addTags = useStoreActions(
    (actions) => actions.employeeThreadList.addTagsToThread
  );

  const handleTagView = () => {
    return tags.map((tag, index) => (
      <ListItem
        disabled={threadData.tags.some((t) => t.tagId === tag.tagId)}
        button
        onClick={() => {
          addTagsToThreads({
            variables: {
              employeeId: loggedInUser.employeeId,
              tagId: tag.tagId,
              threadId: threadData.threadId,
            },
          });
        }}
      >
        <Chip
          variant="default"
          style={{
            backgroundColor: tag.color,
            padding: '15px',
            marginLeft: '12px',
          }}
          label={tag.name}
          size="small"
        />
      </ListItem>
    ));
  };

  return (
    <div className={classes.tagList}>
      <List>{handleTagView()}</List>
    </div>
  );
};

export default TagListContainer;
