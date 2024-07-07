import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Edit } from '@mui/icons-material';
import {
    Box,
    IconButton,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { nanoid } from 'nanoid';
import { Fragment, useMemo, useState } from 'react';
import { useReportsContext } from '../../Contexts/ReportsContext';
import { useRowsContext } from '../../Contexts/RowsContext';
import ReportForm from '../ReportForm/ReportForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const getReportsRowValues = (reports, row) => {
    return reports.map((report) => {
        const field = report.fields.find((x) => x.rowId === row.id);
        if (!field) {
            return {};
        }

        return {
            ...field,
            reportId: report.id,
        };
    });
};

const getKey = (reportValues) => {
    if (reportValues.reportId) {
        return `${reportValues.reportId}-${reportValues.rowId}-${reportValues.value}`;
    } else {
        return nanoid();
    }
};

const ReportsTableRow = ({ row }) => {
    const { reports } = useReportsContext();
    const [open, setOpen] = useState(false);

    const reportsRowValues = useMemo(() => getReportsRowValues(reports, row), [reports, row]);

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
                    <TableCell key={getKey(reportValues)}>{reportValues.value}</TableCell>
                ))}
            </TableRow>
            {!!row.children.length && open && (
                <Fragment>
                    {row.children.map((childRow) => (
                        <ReportsTableRow key={childRow.id} row={childRow} />
                    ))}
                </Fragment>
            )}
        </Fragment>
    );
};

const ReportsTable = () => {
    const { rows } = useRowsContext();
    const { reports, selectReport, selectedReport } = useReportsContext();

    return (
        <Fragment>
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {reports.map((report) => (
                                <TableCell key={report.id}>
                                    {report.name}
                                    <IconButton onClick={() => selectReport(report.id)} size="small">
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return <ReportsTableRow key={row.id} row={row} reports={reports} />;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={!!selectedReport}
                onClose={() => selectReport(null)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ReportForm />
                </Box>
            </Modal>
        </Fragment>
    );
};

export default ReportsTable;
