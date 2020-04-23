import React, {Fragment, useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CustomizedInputBase from './SearchTags';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import {add_tags_to_thread} from '../apollo/Queries';
import {useAuthUser} from '../auth/AuthUser';
import {useMutation} from '@apollo/react-hooks';
import {useStoreState, useStoreActions} from 'easy-peasy';
import useDebounce from '../util/UseDebounce';

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

const ManageTagButton = withStyles(theme => ({
  root: {
    color: '#E87424',
    width: 'fit-content',
    float: 'right',
  },
}))(Button);

const PaperComponentCustom = ({handleClickOpen, threadId}) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');
  const debouncedSearchTerm = useDebounce(searchText, 500);
  const tags = useStoreState(state =>
    state.tagList.filterTags(debouncedSearchTerm)
  );

  return (
    <Paper className={classes.root} square>
      <CustomizedInputBase setSearchText={setSearchText} />
      <TagTable threadId={threadId} tags={tags} />
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

const TagTable = ({threadId, tags}) => {
  const {loggedInUser} = useAuthUser();
  const classes = useStylesTag();

  const [addTagsToThreads] = useMutation(add_tags_to_thread, {
    onCompleted: data => {
      addTags(data.addTagToThread);
    },
    onError: error => {
      console.log(error);
    },
  });

  const addTags = useStoreActions(
    actions => actions.employeeThreadList.addTagsToThread
  );

  const handleTagView = () => {
    return tags.map((tag, index) => (
      <ListItem
        button
        onClick={() => {
          addTagsToThreads({
            variables: {
              employeeId: loggedInUser.employeeId,
              tagId: tag.tagId,
              threadId: threadId,
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

  const handleClickOpen = () => {};

  return (
    <div className={classes.tagList}>
      <List>{handleTagView()}</List>
    </div>
  );
};

export default PaperComponentCustom;
