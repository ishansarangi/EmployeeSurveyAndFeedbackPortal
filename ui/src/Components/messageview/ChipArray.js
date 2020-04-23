import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagContainer from '../tags/TagContainer';
import {remove_tag_from_thread} from '../apollo/Queries';
import {useAuthUser} from '../auth/AuthUser';
import {useMutation} from '@apollo/react-hooks';
import {useStoreState, useStoreActions} from 'easy-peasy';

const useStyles = makeStyles(theme => ({
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

const ChipsArray = ({chipData, threadId}) => {
  const classes = useStyles();
  const {loggedInUser} = useAuthUser();
  const sortedTagData = chipData.sort((a, b) => (a.name > b.name ? -1 : 1));

  const [removeTagFromThread] = useMutation(remove_tag_from_thread, {
    onCompleted: data => {
      addTags(data.removeTagFromThread);
    },
    onError: error => {
      console.log(error);
    },
  });

  const addTags = useStoreActions(
    actions => actions.employeeThreadList.addTagsToThread
  );

  const handleDelete = chipToDelete => () => {
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

export default ChipsArray;
