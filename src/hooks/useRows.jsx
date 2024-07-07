import { nanoid } from 'nanoid';
import { useCallback, useReducer } from 'react';

const ACTIONS_TYPES = {
    ADD_ROW: 'ADD_ROW',
    EDIT_ROW: 'EDIT_ROW',
    DELETE_ROW: 'DELETE_ROW',
};

const ACTIONS_CREATORS = {
    ADD_ROW_ACTION_CREATOR: (payload) => ({ type: ACTIONS_TYPES.ADD_ROW, payload }),
    EDIT_ROW_ACTION_CREATOR: (payload) => ({ type: ACTIONS_TYPES.EDIT_ROW, payload }),
    DELETE_ROW_ACTION_CREATOR: (payload) => ({ type: ACTIONS_TYPES.DELETE_ROW, payload }),
};

const addNestedRow = (rows, newRow) => {
    return rows.map((row) => {
        if (row.id === newRow.parentId) {
            return {
                ...row,
                children: [...row.children, newRow],
            };
        } else if (row.children.length) {
            return {
                ...row,
                children: addNestedRow(row.children, newRow),
            };
        } else {
            return row;
        }
    });
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

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS_TYPES.ADD_ROW: {
            return action.payload.parentId === null ? [...state, action.payload] : addNestedRow(state, action.payload);
        }
        case ACTIONS_TYPES.EDIT_ROW: {
            return editNestedRow(state, action.payload.rowId, action.payload.rowData);
        }
        case ACTIONS_TYPES.DELETE_ROW: {
            return removeNestedRow(state, action.payload.rowId, action.payload.parentId);
        }

        default: {
            return state;
        }
    }
};

const useRows = (initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addRow = useCallback((parentId = null, nestedLevel = 0, verticalLevel = 0) => {
        const newRow = {
            id: nanoid(),
            name: '',
            color: '#ffffff',
            parentId,
            nestedLevel,
            verticalLevel,
            children: [],
        };

        dispatch(ACTIONS_CREATORS.ADD_ROW_ACTION_CREATOR(newRow));
        return newRow;
    }, []);

    const editRow = useCallback((rowId, rowData) => {
        dispatch(ACTIONS_CREATORS.EDIT_ROW_ACTION_CREATOR({ rowId, rowData }));
    }, []);

    const removeRow = useCallback((row) => {
        dispatch(ACTIONS_CREATORS.DELETE_ROW_ACTION_CREATOR(row));
    }, []);

    return { rows: state, addRow, editRow, removeRow };
};

export default useRows;
