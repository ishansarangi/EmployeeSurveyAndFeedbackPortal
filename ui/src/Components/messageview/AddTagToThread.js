import React, {Fragment, useState} from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {withStyles} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import TagContainer from '../tags/TagContainer';
import {add_tags_to_thread} from '../apollo/Queries';
import {useAuthUser} from '../auth/AuthUser';
import {useMutation} from '@apollo/react-hooks';
import {useStoreState, useStoreActions} from 'easy-peasy';

const ListItemCustom = withStyles(theme => ({
  gutters: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  secondaryAction: {
    paddingRight: 0,
  },
}))(ListItem);

const AutocompleteCustom = withStyles(theme => ({
  endAdornment: {
    display: 'none',
  },
}))(Autocomplete);

const CreateButton = withStyles(theme => ({
  root: {
    color: '#E87424',
  },
}))(Button);

const ManageTagButton = withStyles(theme => ({
  root: {
    color: '#E87424',
  },
}))(Button);

const MuiFilledInputCustom = makeStyles(
  {
    underline: {
      '&&&:before': {
        borderBottom: 'none',
      },
      '&&:after': {
        borderBottom: 'none',
      },
    },
  },
  {name: 'MuiFilledInput'}
);

const loadCustomStyles = () => {
  MuiFilledInputCustom();
};

const AddTagToThread = ({threadId}) => {
  const tagList = useStoreState(state => state.tagList.tags);

  loadCustomStyles();
  const {loggedInUser} = useAuthUser();
  const [tags, setTags] = useState([]);

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

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = event => {
    addTagsToThreads({
      variables: {
        employeeId: loggedInUser.employeeId,
        tags: tags,
        threadId: threadId,
      },
    });
    handleClose();
  };

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      width: 275,
      height: 275,
      minHeight: 275,
    },
  });

  const PaperComponentCustom = options => {
    const classes = useStyles();
    const {containerProps, children} = options;

    return (
      <Paper className={classes.root} {...containerProps} square>
        {children}
        <div style={{bottom: '5%', position: 'absolute', marginLeft: '13%'}}>
          <ManageTagButton onMouseDown={handleClickOpen} fullWidth>
            MANAGE TAGS
          </ManageTagButton>
        </div>
      </Paper>
    );
  };

  return (
    <Fragment>
      <TagContainer open={open} handleClose={handleClose} />
      <List dense={false}>
        <ListItemCustom>
          <ListItemText>
            <AutocompleteCustom
              multiple
              id="size-small-filled-multi"
              size="medium"
              options={tagList}
              noOptionsText="No more tags left!"
              filterSelectedOptions
              PaperComponent={PaperComponentCustom}
              getOptionLabel={option => option.name}
              onChange={(event, value) => {
                let arr = [];
                value.map(tagEntry => {
                  arr.push(tagEntry.tagId);
                });
                setTags(arr);
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
                  label="Click here to select Tags..."
                  placeholder="Select Tag"
                />
              )}
            />
          </ListItemText>
          <ListItemSecondaryAction>
            <CreateButton onClick={handleSubmit}>ADD TAG</CreateButton>
          </ListItemSecondaryAction>
        </ListItemCustom>
      </List>
    </Fragment>
  );
};

export default AddTagToThread;
