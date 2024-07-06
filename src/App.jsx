import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Add, Delete } from '@mui/icons-material';
import {
    Box,
    Button,
    Container,
    FormControl,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import { nanoid } from 'nanoid';
import { Fragment, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

const initialRows = [
    {
        id: 'qvcU34eCt2TKj6cHDhs8T',
        name: 'asd',
        color: '#ffffff',
        parentId: null,
        nestedLevel: 0,
        verticalLevel: 0,
        children: [
            {
                id: 'eBczMjvtOqc4qWFzvxdh4',
                name: 'asd inner',
                color: '#ffffff',
                parentId: 'qvcU34eCt2TKj6cHDhs8T',
                nestedLevel: 1,
                verticalLevel: 0,
                children: [
                    {
                        id: 'wUzVjBx1Om06gJRlHbiB6',
                        name: 'asd inner squared',
                        color: '#ffffff',
                        parentId: 'eBczMjvtOqc4qWFzvxdh4',
                        nestedLevel: 2,
                        verticalLevel: 0,
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        id: 'diEKzKEsoWOq_nGzXkssw',
        name: 'zxc',
        color: '#ffffff',
        parentId: null,
        nestedLevel: 0,
        verticalLevel: 1,
        children: [],
    },
];

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
};

const Row = ({ row, addRow, editRow, removeRow }) => {
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
                    <RowList rows={row.children} addRow={addRow} editRow={editRow} removeRow={removeRow} />
                </Container>
            )}
        </Fragment>
    );
};

const RowList = ({ rows, addRow, editRow, removeRow }) => {
    return (
        <List>
            {rows.map((row) => (
                <Row key={row.id} row={row} addRow={addRow} editRow={editRow} removeRow={removeRow} />
            ))}
        </List>
    );
};

const TableSettings = ({ rows, addRow, editRow, removeRow }) => {
    return (
        <Container>
            <Typography variant="h4">Table settings</Typography>
            <Button variant="contained" onClick={() => addRow(null, 0, rows.length)}>
                add row
            </Button>
            <RowList rows={rows} addRow={addRow} editRow={editRow} removeRow={removeRow} />
        </Container>
    );
};

const CustomTableRow = ({ row, reports, updateReportFields, updateReport }) => {
    const [open, setOpen] = useState(false);
    const reportsRowValues = reports.map((report) => {
        const field = report.fields.find((x) => x.rowId === row.id);
        if (!field) {
            return {};
        }

        return {
            ...field,
            reportId: report.id,
        };
    });
    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' }, backgroundColor: row.color }}>
                <TableCell sx={{ paddingLeft: `${row.nestedLevel * 20}px` }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen((prev) => !prev)}>
                        {open && !!row.children.length ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    {row.name}
                </TableCell>
                {reportsRowValues.map((reportValues) => (
                    <TableCell key={`${reportValues.reportId}-${reportValues.rowId}`}>
                        <TextField
                            value={reportValues.value}
                            onChange={(e) =>
                                updateReport(reportValues.reportId, {
                                    fields: updateReportFields(reportValues.rowId, e.target.value),
                                })
                            }
                        />
                    </TableCell>
                ))}
            </TableRow>
            {!!row.children.length && open && (
                <Fragment>
                    {row.children.map((childRow) => (
                        <CustomTableRow
                            key={childRow.id}
                            row={childRow}
                            reports={reports}
                            updateReport={updateReport}
                            updateReportFields={updateReportFields}
                        />
                    ))}
                </Fragment>
            )}
        </Fragment>
    );
};

const CustomTable = ({ rows, reports, updateReportFields, updateReport }) => {
    return (
        <TableContainer>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        {reports.map((report) => (
                            <TableCell key={report.id}>{report.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => {
                        return (
                            <CustomTableRow
                                key={row.id}
                                row={row}
                                reports={reports}
                                updateReport={updateReport}
                                updateReportFields={updateReportFields}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const generateFormFields = (rows) => {
    const queue = [];
    const fields = new Map();
    rows.forEach((row) => queue.push(row));

    while (queue.length) {
        const currentRow = queue.shift();
        fields.set(currentRow.id, currentRow);
        if (currentRow.children.length) {
            queue.unshift(...currentRow.children);
        }
    }

    return fields;
};

const Report = ({ report, reportFormFields, updateReport, updateReportFields }) => {
    const values = useMemo(() => {
        const defaultValues = {};
        Array.from(reportFormFields.keys()).forEach((key) => {
            defaultValues[key] = report.fields.find((field) => field.rowId === key)?.value;
        });
        return defaultValues;
    }, [reportFormFields, report]);
    const form = useForm({ values });
    console.log(form.getValues());
    return (
        <Box flex={1} sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
                label="Report Name"
                id="name"
                value={report.name}
                onChange={(e) => updateReport(report.id, { name: e.target.value })}
            />
            {report.fields.map(
                (field) =>
                    reportFormFields.has(field.rowId) && (
                        <TextField
                            key={field.rowId}
                            label={reportFormFields.get(field.rowId).name}
                            id={field.rowId}
                            value={field.value}
                            onChange={(e) =>
                                updateReport(report.id, { fields: updateReportFields(field.rowId, e.target.value) })
                            }
                        />
                    )
            )}
            <Button>save</Button>
        </Box>
    );
};

const Reports = ({
    reports,
    addReport,
    removeReport,
    selectReport,
    selectedReport,
    reportFormFields,
    updateReport,
    updateReportFields,
}) => {
    return (
        <Container>
            <Typography variant="h4">Reports</Typography>
            <Button variant="contained" onClick={() => addReport()}>
                add report
            </Button>
            <Box sx={{ display: 'flex' }}>
                <Box maxWidth={400} flexGrow={1}>
                    <List>
                        {reports.map((report) => (
                            <ListItem style={{ alignItems: 'stretch' }} key={report.id}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ textAlign: 'left' }}
                                    onClick={() => selectReport(report.id)}
                                >
                                    <ListItemText>Report {report.name}</ListItemText>
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<Delete />}
                                    onClick={() => removeReport(report)}
                                >
                                    remove report
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                {!!selectedReport && (
                    <Report
                        report={selectedReport}
                        reportFormFields={reportFormFields}
                        updateReport={updateReport}
                        updateReportFields={updateReportFields}
                    />
                )}
            </Box>
        </Container>
    );
};

const App = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [rows, setRows] = useState(initialRows);
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);

    const reportFormFields = useMemo(() => generateFormFields(rows), [rows]);
    const report = useMemo(() => reports.find((x) => x.id === selectedReport), [reports, selectedReport]);
    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const addNestedRow = (rows, parentId, newRow) => {
        return rows.map((row) => {
            if (row.id === parentId) {
                return {
                    ...row,
                    children: [...row.children, newRow],
                };
            } else if (row.children.length) {
                return {
                    ...row,
                    children: addNestedRow(row.children, parentId, newRow),
                };
            } else {
                return row;
            }
        });
    };

    const addRow = (parentId = null, nestedLevel = 0, verticalLevel = 0) => {
        const newRow = {
            id: nanoid(),
            name: '',
            color: '#ffffff',
            parentId,
            nestedLevel,
            verticalLevel,
            children: [],
        };
        if (!parentId) {
            setRows([...rows, newRow]);
        } else {
            setRows((currentRows) => addNestedRow(currentRows, parentId, newRow));
        }
    };

    const editNestedRow = (rows, rowId, rowData) => {
        return rows.map((row) => {
            if (row.id === rowId) {
                return {
                    ...row,
                    ...rowData,
                };
            } else if (row.children.length) {
                return {
                    ...row,
                    children: editNestedRow(row.children, rowId, rowData),
                };
            } else {
                return row;
            }
        });
    };

    const editRow = (rowId, rowData) => {
        setRows((previousRows) => editNestedRow(previousRows, rowId, rowData));
    };

    const removeNestedRow = (rows, rowId, parentId = null) => {
        if (!parentId) {
            return rows.filter((row) => row.id !== rowId);
        } else {
            return rows.map((row) => {
                if (row.id === parentId) {
                    return {
                        ...row,
                        children: row.children.filter((row) => row.id !== rowId),
                    };
                }
                if (row.children.length) {
                    return {
                        ...row,
                        children: removeNestedRow(row.children, rowId, parentId),
                    };
                }
                return row;
            });
        }
    };

    const removeRow = (row) => {
        setRows((previousRows) => removeNestedRow(previousRows, row.id, row.parentId));
    };

    const addReport = () => {
        const newReport = {
            id: nanoid(),
            name: '',
            fields: [],
        };

        Array.from(reportFormFields.keys()).forEach((rowId) => newReport.fields.push({ rowId, value: '' }));
        setReports((prev) => [...prev, newReport]);
        setSelectedReport(newReport.id);
    };

    const removeReport = (report) => {
        setReports((prev) => prev.filter((x) => x.id !== report.id));
    };

    const selectReport = (reportId) => {
        setSelectedReport(reportId);
    };

    const updateReport = (reportId, updatedData) => {
        setReports((prev) =>
            prev.map((x) => {
                if (x.id === reportId) {
                    return {
                        ...x,
                        ...updatedData,
                    };
                }

                return x;
            })
        );
    };

    const updateReportFields = (fieldId, value) => {
        return report.fields.map((x) => {
            if (x.rowId === fieldId) {
                return {
                    ...x,
                    value,
                };
            }
            return x;
        });
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentTab} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Table Settings" {...a11yProps(0)} />
                    <Tab label="Reports" {...a11yProps(1)} />
                    <Tab label="Table" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={currentTab} index={0}>
                <TableSettings rows={rows} addRow={addRow} editRow={editRow} removeRow={removeRow} />
            </CustomTabPanel>
            <CustomTabPanel value={currentTab} index={1}>
                <Reports
                    reportFormFields={reportFormFields}
                    selectedReport={report}
                    reports={reports}
                    addReport={addReport}
                    removeReport={removeReport}
                    selectReport={selectReport}
                    updateReport={updateReport}
                    updateReportFields={updateReportFields}
                />
            </CustomTabPanel>
            <CustomTabPanel value={currentTab} index={2}>
                <CustomTable
                    rows={rows}
                    reports={reports}
                    updateReport={updateReport}
                    updateReportFields={updateReportFields}
                />
            </CustomTabPanel>
        </Box>
    );
};

export default App;
