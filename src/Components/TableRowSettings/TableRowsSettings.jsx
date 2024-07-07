import { Add, Delete } from '@mui/icons-material';
import { Button, Container, FormControl, List, ListItem, TextField, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useRowsContext } from '../../Contexts/RowsContext';

const Row = ({ row }) => {
    const { addRow, editRow, removeRow } = useRowsContext();
    return (
        <Fragment>
            <ListItem>
                <FormControl>
                    <TextField
                        label="Row name"
                        id={`${row.id}-name`}
                        type="text"
                        value={row.name}
                        onChange={(e) => editRow(row.id, { name: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        label="Row color"
                        sx={{ width: '25ch' }}
                        id={`${row.id}-color`}
                        type="color"
                        value={row.color}
                        onChange={(e) => editRow(row.id, { color: e.target.value })}
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<Add />}
                    onClick={() => addRow(row.id, row.nestedLevel + 1, row.children.length)}
                >
                    add child row
                </Button>
                <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => removeRow(row)}>
                    remove row
                </Button>
            </ListItem>

            {!!row.children.length && (
                <Container style={{ paddingRight: 0 }}>
                    <RowList rows={row.children} />
                </Container>
            )}
        </Fragment>
    );
};

const RowList = ({ rows }) => {
    return (
        <List>
            {rows.map((row) => (
                <Row key={row.id} row={row} />
            ))}
        </List>
    );
};

const TableRowsSettings = () => {
    const { rows, addRow } = useRowsContext();
    return (
        <Container>
            <Typography variant="h4">Table settings</Typography>
            <Button variant="contained" onClick={() => addRow(null, 0, rows.length)}>
                add row
            </Button>
            <RowList rows={rows} />
        </Container>
    );
};

export default TableRowsSettings;
