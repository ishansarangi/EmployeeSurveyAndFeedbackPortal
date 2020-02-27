import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';

const ThreadItem = ({threadDetails, setSelectedThread, threadKey}) => {
  const useStyles = makeStyles(theme => ({
    text: {
      fontSize: '0.90rem',
      marginLeft: '10px',
      color: 'grey',
    },
    date: {
      color: 'grey',
      fontSize: '0.90rem',
      float: 'right',
    },
    readIcon: {
      paddingTop: '1%',
      marginBottom: '-1%',
      color: '#E87424',
    },
    preview: {
      fontSize: '1.20rem',
      marginLeft: '8%',
      overflowWrap: 'break-word',
      color: 'black',
      height: '43px',
      background: 'white',
    },
    griditemlink: {
      width: '100%',
      height: '100%',
      padding: '0',
      marginTop: '0',
    },
  }));

  const classes = useStyles();

  const handleListItemClick = key => {
    console.log('handleListItemClick called:' + key);
    setSelectedThread(key);
  };

  const GridItemLink = props => {
    return <GridListTile button component="a" {...props} />;
  };

  const getHeader = thread => {
    if (threadDetails.readFlag) {
      return (
        <Fragment>
          <FiberManualRecordSharpIcon
            fontSize="small"
            className={classes.readIcon}
            visibility={thread.readFlag}
          />
          <span className={classes.text}>{thread.sentBy}</span>
          <span className={classes.date}> {thread.latestDate}</span>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <span className={classes.text}>{thread.sentBy}</span>
          <span className={classes.date}> {thread.latestDate}</span>
        </Fragment>
      );
    }
  };

  return (
    <GridItemLink
      onClick={() => {
        handleListItemClick(threadKey);
      }}
      key={threadKey}
      className={classes.griditemlink}
    >
      <GridListTileBar
        className={classes.tileBar}
        title={getHeader(threadDetails)}
        subtitle={
          <Typography className={classes.preview}>
            {threadDetails.latestText}
          </Typography>
        }
      />
    </GridItemLink>
  );
};

ThreadItem.propTypes = {};

export default ThreadItem;
