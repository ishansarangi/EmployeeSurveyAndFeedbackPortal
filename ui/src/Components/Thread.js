import React, {Fragment} from 'react';
import NewThread from './NewThread';
import ThreadItem from './ThreadItem';
import {makeStyles} from '@material-ui/core/styles';
import {Divider} from '@material-ui/core';
import GridList from '@material-ui/core/GridList';

const Thread = ({setSelectedThread, selectedThread, threadData}) => {
  const useStyles = makeStyles(theme => ({
    container: {
      height: '85px',
      padding: 0,
      background: 'white',
    },
    gridList: {
      height: '85px',
      padding: 0,
      overflow: 'initial',
      background: 'white',
      margin: '0px',
      width: 'inherit',
    },
    newThread: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      padding: '16px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));

  const getThreadsView = () => {
    return threadData.map((thread, index) => {
      return (
        <ThreadItem
          setSelectedThread={setSelectedThread}
          threadKey={index}
          threadDetails={{
            sentBy: thread.createdBy.firstName,
            latestText: thread.latestText,
            latestDate: thread.modifiedAt,
            readFlag: true,
            subject: thread.subject,
            manager: thread.sentTo.firstName,
          }}
        />
      );
    });
  };

  const classes = useStyles();
  return (
    <Fragment>
      <GridList cellHeight={400} className={classes.gridList}>
        {getThreadsView()}
      </GridList>
      <Divider />
      <div className={classes.newThread}>
        <NewThread />
      </div>
    </Fragment>
  );
};

Thread.propTypes = {};

export default Thread;
