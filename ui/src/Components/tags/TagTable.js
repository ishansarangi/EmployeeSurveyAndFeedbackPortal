import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {useStoreState, useStoreActions} from 'easy-peasy';
import DeleteIcon from '@material-ui/icons/Delete';
import {useMutation} from '@apollo/react-hooks';
//import {delete_tag} from '../apollo/Queries';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';

const columns = [
  {id: 'name', label: 'Name', minWidth: 170},
  {id: 'color', label: 'Color', minWidth: 100},
  {
    id: 'numOfMessages',
    label: 'Total\u00a0Messages\u00a0using\u00a0Tag',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {id: 'delete', label: '', minWidth: 50},
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const TagTable = () => {
  const rows = useStoreState(state => state.tagList.tags);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [deleteTagID, setDeleteTagID] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const showDialog = useStoreActions(actions => actions.DialogModel.showDialog);

  // const handleClickOpen = () => {
  //   showDialog();
  // };

  // const handleClose = () => {
  //   //setOpen(false);
  // };

  // const [deleteTag] = useMutation(delete_tag, {
  //   onCompleted: data => {
  //     setDeleteTagID(0);
  //   },
  // });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteTag = () => {
    // showDialog({
    //   message: 'Tag Created!',
    // });
    // deleteTag({
    //   variables: {
    //     tagId: deleteTagID,
    //   },
    // })
  };

  const handleColumnValue = (col, value, row) => {
    if (col.format && typeof value === 'number') return col.format(value);
    else if (col.id === 'color') {
      return (
        <Button
          style={{
            backgroundColor: value,
            maxWidth: '30px',
            maxHeight: '30px',
            minWidth: '30px',
            minHeight: '30px',
          }}
        />
      );
    } else if (col.id === 'delete') {
      console.log(row);
      return (
        <div>
          <IconButton aria-label="delete" onClick={handleDeleteTag}>
            <DeleteIcon />
          </IconButton>
        </div>
      );
    } else if (col.id === 'numOfMessages') {
      return row.totalMessages;
    } else {
      return value;
    }
  };

  return (
    <Paper className={classes.root}>
      <DialogView />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row + index}
                  >
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {handleColumnValue(column, value, row)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const DialogView = () => {
  const DialogActionButton = withStyles(theme => ({
    root: {
      color: '#E87424',
    },
  }))(Button);

  const dialog = useStoreState(state => state.DialogModel.dialog);

  const closeDialog = useStoreActions(
    actions => actions.DialogModel.closeDialog
  );

  const handleClose = () => {
    closeDialog();
  };

  return (
    <Dialog
      open={dialog.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Delete Tag?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialog.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogActionButton onClick={handleClose}>Yes</DialogActionButton>
        <DialogActionButton onClick={handleClose} autoFocus>
          No
        </DialogActionButton>
      </DialogActions>
    </Dialog>
  );
};
export default TagTable;
