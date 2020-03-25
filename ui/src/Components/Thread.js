import React, { Fragment, useContext } from 'react';
import { all_thread_data } from '../data/TestData';
import NewThread from './NewThread';
import ThreadItem from './ThreadItem';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import { useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import { UserType } from './UserType';

const Thread = ({ setSelectedThread, selectedThread }) => {
  const { userType } = useContext(UserContext);
  let selectedView = useLocation();

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
    return all_thread_data.map((thread, index) => {
      return (
        <ThreadItem
          setSelectedThread={setSelectedThread}
          threadKey={index}
          threadDetails={{
            sentBy: thread.sentBy,
            latestText: thread.latestText,
            latestDate: thread.latestDate,
            readFlag: thread.readFlag,
            subject: thread.subject,
            manager: thread.manager,
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
        {userType === UserType.Manager && selectedView.pathname === "/employee-feedback" ?
          (<div />) : (<NewThread />)}
      </div>
    </Fragment>
  );
};

Thread.propTypes = {};

export default Thread;
