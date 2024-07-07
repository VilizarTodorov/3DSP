import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Box, Tab, Tabs } from '@mui/material';
import { useMemo, useState } from 'react';
import Reports from './Components/Reports/Reports';
import ReportsTable from './Components/ReportsTable/ReportsTable';
import TableRowsSettings from './Components/TableRowSettings/TableRowsSettings';
import { ReportsContextProvider } from './Contexts/ReportsContext';
import { RowsContextProvider } from './Contexts/RowsContext';
import useReports from './hooks/useReports';
import useRows from './hooks/useRows';

const initialRows = [
    {
        id: 'qvcU34eCt2TKj6cHDhs8T',
        name: 'Cost',
        color: '#ffffff',
        parentId: null,
        nestedLevel: 0,
        verticalLevel: 0,
        children: [
            {
                id: 'eBczMjvtOqc4qWFzvxdh4',
                name: 'Price',
                color: '#ffffff',
                parentId: 'qvcU34eCt2TKj6cHDhs8T',
                nestedLevel: 1,
                verticalLevel: 0,
                children: [
                    {
                        id: 'wUzVjBx1Om06gJRlHbiB6',
                        name: 'Margin',
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
        name: 'Total',
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

const App = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const { rows, addRow, editRow, removeRow } = useRows(initialRows);
    const { reports, addReport, updateReport, removeReport } = useReports([]);

    const reportFormFields = useMemo(() => generateFormFields(rows), [rows]);

    const [selectedReportId, setSelectedReportId] = useState(null);

    const selectedReport = useMemo(() => reports.find((x) => x.id === selectedReportId), [reports, selectedReportId]);

    const handleTabChange = (_, newValue) => {
        setCurrentTab(newValue);
        setSelectedReportId(null);
    };

    const selectReport = (reportId) => setSelectedReportId(reportId);

    return (
        <RowsContextProvider value={{ rows, addRow, editRow, removeRow }}>
            <ReportsContextProvider
                value={{
                    reports,
                    addReport,
                    updateReport,
                    removeReport,
                    selectReport,
                    selectedReport,
                    reportFormFields,
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={currentTab} onChange={handleTabChange} aria-label="basic tabs example">
                            <Tab label="Table Settings" {...a11yProps(0)} />
                            <Tab label="Reports" {...a11yProps(1)} />
                            <Tab label="Table" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={currentTab} index={0}>
                        <TableRowsSettings />
                    </CustomTabPanel>
                    <CustomTabPanel value={currentTab} index={1}>
                        <Reports />
                    </CustomTabPanel>
                    <CustomTabPanel value={currentTab} index={2}>
                        <ReportsTable />
                    </CustomTabPanel>
                </Box>
            </ReportsContextProvider>
        </RowsContextProvider>
    );
};

export default App;
