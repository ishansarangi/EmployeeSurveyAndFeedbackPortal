import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';

const ThreadItem = ({threadDetails, setSelectedThread, threadKey}) => {
  const useStyles = makeStyles(theme => ({
    topSecionWithBadge: {
      display: 'flex',
      justifyContent: 'space-between',
      marginLeft: '30px',
      marginTop: '-27px',
    },
    topSecionWithoutBadge: {
      display: 'flex',
      justifyContent: 'space-between',
      marginLeft: '30px',
      paddingTop: '16px',
    },
    text: {
      fontSize: '12px',
      color: 'grey',
    },
    date: {
      color: 'grey',
      fontSize: '12px',
      float: 'right',
    },
    readIcon: {
      marginTop: '16px',
      color: '#E87424',
    },
    preview: {
      fontSize: '14px',
      marginLeft: '30px',
      overflowWrap: 'break-word',
      color: 'black',
      height: '43px',
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
    return <GridListTile component="a" {...props} />;
  };

  const getHeader = thread => {
    if (threadDetails.readFlag) {
      return (
        <div>
          <Fragment>
            <FiberManualRecordSharpIcon
              fontSize="inherit"
              style={{fontSize: '15px'}}
              className={classes.readIcon}
            />
          </Fragment>
          <div className={classes.topSecionWithBadge}>
            <span className={classes.text}>{thread.sentBy}</span>
            <span className={classes.date}> {thread.latestDate}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.topSecionWithoutBadge}>
          <span className={classes.text}>{thread.sentBy}</span>
          <span className={classes.date}> {thread.latestDate}</span>
        </div>
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
