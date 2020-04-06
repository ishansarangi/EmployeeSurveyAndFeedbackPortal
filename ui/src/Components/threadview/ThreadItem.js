import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';

const ThreadItem = ({
  threadDetails,
  setSelectedThread,
  threadKey,
  selectedIndex,
}) => {
  const useStyles = makeStyles((theme) => ({
    topSecionWithBadge: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: '30px',
      marginTop: '-27px',
    },
    topSecionWithoutBadge: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: '30px',
      paddingTop: '16px',
    },
    text: {
      fontSize: '14px',
      color: 'black',
    },
    date: {
      color: 'grey',
      fontSize: '12px',
      float: 'left',
      marginTop: '20px',
    },
    readIcon: {
      marginTop: '16px',
      color: '#E87424',
    },
    preview: {
      fontSize: '14px',
      marginLeft: '30px',
      textOverflow: 'ellipsis',
      color: 'black',
      maxLines: 3,
    },
    griditemlink: {
      width: '100%',
      height: '100% !important',
      padding: '0',
      marginTop: '0',
      background: selectedIndex === threadKey ? 'red' : 'white',
    },
    GridListTileBar: {
      color: selectedIndex === threadKey ? 'red' : 'white',
    },
    root: {
      background: selectedIndex === threadKey ? 'red' : 'white',
    },
  }));

  const classes = useStyles();

  const handleListItemClick = (key) => {
    setSelectedThread(key);
  };

  const GridItemLink = (props) => {
    return <GridListTile component="a" {...props} />;
  };

  const getFullName = (employee) => {
    if (employee) return employee.firstName + ' ' + employee.lastName;
    else return 'Anonymous';
  };

  const getHeader = () => {
    if (!threadDetails.read) {
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
            <span className={classes.text}>{threadDetails.subject}</span>
          </div>
          <div className={classes.topSecionWithBadge}>
            <span className={classes.date}> {threadDetails.latestDate}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className={classes.topSecionWithoutBadge}>
            <span className={classes.text}>{threadDetails.subject}</span>
          </div>
          <div className={classes.topSecionWithoutBadge}>
            <span className={classes.date}> {threadDetails.latestDate}</span>
          </div>
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
      selected={selectedIndex === threadKey}
      style={{background: 'red'}}
    >
      <GridListTileBar
        style={{background: 'red'}}
        title={getHeader()}
        subtitle={
          <Fragment>
            <Typography
              className={classes.preview}
              style={{wordWrap: 'break-word'}}
              maxLines={3}
            >
              {threadDetails.latestText}
            </Typography>
          </Fragment>
        }
      />
    </GridItemLink>
  );
};

ThreadItem.propTypes = {};

export default ThreadItem;
