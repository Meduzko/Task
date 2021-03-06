import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import DeleteIcon from '@material-ui/icons/Delete';

import { formattedData } from '../../fakeData/formattedData';
import { CustomTableCell } from '../CustomTableCell/CustomTableCell';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  }
}));

export const MainTable = () => {
  const [rows, setRows] = useState(formattedData());
  const [previous, setPrevious] = useState({});
  const classes = useStyles();

  const onToggleEditMode = row => {
    const withToggledEdit = {
      ...rows,
      ...[{
        ...row, 
        isEditMode: !row.isEditMode 
      }]
    }

    setRows(Object.values(withToggledEdit));
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }

    const value = e.target.value;
    const name = e.target.name;

    const editedVal = {
      ...rows,
      ...[{
        ...row, 
        [name]: value 
      }]
    }

    setRows(Object.values(editedVal));
  };

  const onRevert = row => {
    let prevState = previous[row.id] ? previous[row.id] : row;

    const newRows = {
      ...rows,
      ...[{
        ...row, 
        ...prevState 
      }]
    }

    setRows(Object.values(newRows));
    setPrevious(state => {
      delete state[row.id];
      return state;
    });

  };

  const onDelete = id => setRows(rows.filter(el => el.id !== id));

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Project name</TableCell>
            <TableCell align="left">Devices</TableCell>
            <TableCell align="left">Users</TableCell>
            <TableCell align="left">Begin Date</TableCell>
            <TableCell align="left">Expiration Date</TableCell>
            <TableCell align="left">Edit action</TableCell>
            <TableCell align="left">Delete action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <CustomTableCell {...{ row, name: "title", onChange }} />
              <CustomTableCell {...{ row, name: "devices", onChange }} />
              <CustomTableCell {...{ row, name: "users", onChange }} />
              <CustomTableCell {...{ row, name: "beginDate", onChange }} />
              <CustomTableCell {...{ row, name: "expirationDate", onChange }} />
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell className={classes.selectTableCell}>
                <IconButton
                  aria-label="delete"
                  onClick={() => onDelete(row.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
