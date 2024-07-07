import { Delete } from '@mui/icons-material';
import { Box, Button, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useReportsContext } from '../../Contexts/ReportsContext';
import ReportForm from '../ReportForm/ReportForm';

const Reports = () => {
    const { reports, addReport, removeReport, selectReport, selectedReport } = useReportsContext();

    const handleAddReport = () => {
        const newReport = addReport();
        selectReport(newReport.id);
    };

    return (
        <Container>
            <Typography variant="h4">Reports</Typography>
            <Button variant="contained" onClick={handleAddReport}>
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
                {!!selectedReport && <ReportForm />}
            </Box>
        </Container>
    );
};

export default Reports;
