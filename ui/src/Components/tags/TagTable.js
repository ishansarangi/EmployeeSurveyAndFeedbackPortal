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
import DeleteIcon from '@material-ui/icons/Delete';
import {useMutation} from '@apollo/react-hooks';
import {remove_tag} from '../apollo/Queries';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import DialogView from './DialogView';

const columns = [
  {id: 'name', label: 'Name', minWidth: 170},
  {id: 'color', label: 'Color', minWidth: 100},
  {
    id: 'totalMessages',
    label: 'Total\u00a0Messages\u00a0using\u00a0Tag',
    minWidth: 170,
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
  const rows = useStoreState((state) => state.tagList.tags);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const setDialog = useStoreActions((actions) => actions.dialogModel.setDialog);

  const handleDeleteTag = (deleteTagId, totalMessages) => {
    setDialog({
      open: true,
      message: 'Are you sure you want to delete the tag?',
      id: deleteTagId,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      return (
        <IconButton
          aria-label="delete"
          onClick={() => {
            handleDeleteTag(row.tagId, row.totalMessages);
          }}
        >
          <DeleteIcon />
        </IconButton>
      );
    } else if (col.id === 'totalMessages') {
      return row.totalMessages;
    } else {
      return value;
    }
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
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
                    {columns.map((column) => {
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
      <DialogView />
    </Paper>
  );
};

export default TagTable;
