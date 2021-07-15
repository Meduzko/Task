import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles(theme => ({
    tableCell: {
        width: 130,
        height: 40
    },
    input: {
        width: 130,
        height: 40
    }
}));

export const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = row;

    const displayNestedItems = (items, name) => {
        return items.map((item) => ` ${item[name === 'devices' ? 'serialNumber' : 'firstName']};`)
    }

    return (
        <TableCell align="left" className={classes.tableCell}>
            {isEditMode ? (
                <Input
                    value={Array.isArray(row[name]) ? displayNestedItems(row[name], name) : row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                    className={classes.input}
                />
            ) : (
                Array.isArray(row[name]) ? displayNestedItems(row[name], name) : row[name]
            )}
        </TableCell>
    );
};