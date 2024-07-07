import { nanoid } from 'nanoid';
import { useCallback, useReducer } from 'react';

const ACTIONS_TYPES = {
    ADD_REPORT: 'ADD_REPORT',
    EDIT_REPORT: 'EDIT_REPORT',
    DELETE_REPORT: 'DELETE_REPORT',
};

const ACTIONS_CREATORS = {
    ADD_REPORT_ACTION_CREATOR: (payload) => ({ type: ACTIONS_TYPES.ADD_REPORT, payload }),
    EDIT_REPORT_ACTION_CREATOR: (payload) => ({ type: ACTIONS_TYPES.EDIT_REPORT, payload }),
    DELETE_REPORT_ACTION_CREATOR: (payload) => ({ type: ACTIONS_TYPES.DELETE_REPORT, payload }),
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS_TYPES.ADD_REPORT: {
            return [...state, action.payload];
        }
        case ACTIONS_TYPES.EDIT_REPORT: {
            return state.map((report) => {
                if (report.id === action.payload.id) {
                    return {
                        ...report,
                        ...action.payload.data,
                    };
                }
                return report;
            });
        }
        case ACTIONS_TYPES.DELETE_REPORT: {
            return state.filter((report) => report.id !== action.payload.id);
        }

        default: {
            return state;
        }
    }
};

const useReports = (initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addReport = useCallback(() => {
        const newReport = {
            id: nanoid(),
            name: '',
            fields: [],
        };
        dispatch(ACTIONS_CREATORS.ADD_REPORT_ACTION_CREATOR(newReport));
        return newReport;
    }, []);

    const updateReport = (reportId, updatedData) => {
        dispatch(ACTIONS_CREATORS.EDIT_REPORT_ACTION_CREATOR({ id: reportId, data: updatedData }));
    };

    const removeReport = useCallback((report) => {
        dispatch(ACTIONS_CREATORS.DELETE_REPORT_ACTION_CREATOR({ id: report.id }));
    }, []);

    return { reports: state, addReport, updateReport, removeReport };
};

export default useReports;
