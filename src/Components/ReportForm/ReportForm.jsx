import { Box, Button, TextField } from '@mui/material';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useReportsContext } from '../../Contexts/ReportsContext';

const ReportForm = () => {
    const { selectedReport, updateReport, reportFormFields, selectReport } = useReportsContext();

    const reportFormFieldsKeysArray = useMemo(() => Array.from(reportFormFields.keys()), [reportFormFields]);

    const values = useMemo(() => {
        const defaultValues = {};
        reportFormFieldsKeysArray.forEach((key) => {
            defaultValues[key] = selectedReport.fields.find((field) => field.rowId === key)?.value || '';
        });
        defaultValues['name'] = selectedReport.name || '';
        return defaultValues;
    }, [reportFormFields, selectedReport]);

    const form = useForm({ values });

    const onSubmit = (data) => {
        const { name, ...rest } = data;

        const updatedFields = {
            name,
            fields: reportFormFieldsKeysArray.map((key) => ({ rowId: key, value: rest[key] })),
        };
        updateReport(selectedReport.id, updatedFields);
        selectReport(null);
    };

    return (
        <Box flex={1} sx={{ display: 'flex', flexDirection: 'column', '& > :not(style)': { m: 1 } }}>
            <Controller
                name="name"
                control={form.control}
                render={({ field }) => {
                    return <TextField label="Report Name" {...field} />;
                }}
            />

            {reportFormFieldsKeysArray.map((key) => (
                <Controller
                    key={key}
                    name={key}
                    control={form.control}
                    render={({ field }) => {
                        return <TextField label={reportFormFields.get(key).name} {...field} />;
                    }}
                />
            ))}

            <Button onClick={form.handleSubmit(onSubmit)} variant="contained">
                save
            </Button>
        </Box>
    );
};

export default ReportForm;
