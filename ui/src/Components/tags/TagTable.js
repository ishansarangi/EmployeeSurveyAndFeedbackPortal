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
];

function createData(name, color, numOfMessages, tagId) {
  return {name, color, numOfMessages, tagId};
}

const rows = [
  createData('Important', '#FFC107', 0, 1),
  createData('Follow Up', '#46B978', 0, 2),
  createData('Idea', '#EEA5F6', 0, 3),
  createData('Non Issue', '#2EACE2', 0, 4),
  createData('Important1', '#FFC106', 0, 5),
  createData('Follow Up1', '#46B977', 0, 6),
  createData('Idea1', '#EEA5F5', 0, 7),
  createData('Non Issue1', '#2EACE1', 0, 8),
  createData('Important2', '#FFC106', 0, 9),
  createData('Follow Up2', '#46B976', 0, 10),
  createData('Idea2', '#EEA5F4', 0, 11),
  createData('Non Issue2', '#2EACE0', 0, 12),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function TagTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleColumnValue = (col, value) => {
    if (col.format && typeof value === 'number') return col.format(value);
    else if (col.id == 'color') {
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
                          {handleColumnValue(column, value)}
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
}
