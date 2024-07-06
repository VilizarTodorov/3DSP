import './App.css';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
// import { Box, Button, Input, InputLabel, Modal, TextField, Typography } from '@mui/material';
// import { Fragment, useState } from 'react';
// import { useReducer } from 'react';
// import { Controller, useFieldArray, useForm } from 'react-hook-form';
// import { nanoid } from 'nanoid';

// const CREATE_ROW_ACTION = (payload) => ({
//     type: 'CREATE_ROW',
//     payload,
// });

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

// const GET_ROW_DEFAULT_VALUES = () => ({
//     id: nanoid(),
//     name: '',
//     color: '#000000',
//     nestedLevel: 0,
//     parent: '',
//     children: [],
// });

// const rowReducer = (state, action) => {
//     if (action.type === 'CRETE_ROW') {
//         return [...state, action.payload];
//     }
// };

// const CreateRowForm = ({ onSubmit, defaultValues = GET_ROW_DEFAULT_VALUES() }) => {
//     const form = useForm({ defaultValues });
//     const { fields, append, remove, move, update } = useFieldArray({
//         control: form.control,
//         name: 'children',
//     });

//     const saveChild = (index, data) => {
//         update(index, data);
//     };

//     const addChild = () => {
//         append(GET_ROW_DEFAULT_VALUES());
//     };

//     return (
//         <Box
//             sx={{
//                 p: 2,
//                 border: '1px solid black',
//                 '& > :not(style)': { m: 1 },
//             }}
//         >
//             <Typography>{form.getValues('id')}</Typography>
//             <Typography variant="h6" sx={{ mb: 3 }}>
//                 Create Row
//             </Typography>
//             <Controller
//                 name="name"
//                 control={form.control}
//                 render={({ field }) => (
//                     <Fragment>
//                         <InputLabel htmlFor={field.name}>Name</InputLabel>
//                         <Input id={field.name} fullWidth {...field} />
//                     </Fragment>
//                 )}
//             />
//             <Controller
//                 name="color"
//                 control={form.control}
//                 render={({ field }) => (
//                     <Fragment>
//                         <InputLabel htmlFor={field.name}>Color</InputLabel>
//                         <Input type="color" id={field.name} fullWidth {...field} />
//                     </Fragment>
//                 )}
//             />
//             {fields.map((child, index) => {
//                 return (
//                     <CreateRowForm defaultValues={child} key={child.id} onSubmit={(data) => saveChild(index, data)} />
//                 );
//             })}
//             <Button onClick={addChild} type="button">
//                 Add child row
//             </Button>
//             <Button onClick={form.handleSubmit(onSubmit)} type="submit">
//                 Save
//             </Button>
//         </Box>
//     );
// };

// function App() {
//     const [state, dispatch] = useReducer(rowReducer, []);
//     const [isAddRowModalOpen, setIsAddRowModalOpen] = useState(false);
//     const handleOpenAddRowModal = () => setIsAddRowModalOpen(true);
//     const handleCloseAddRowModal = () => setIsAddRowModalOpen(false);

//     const handleCreateRow = (data) => {
//         dispatch({ action: 'CRA' });
//     };

//     return (
//         <div>
//             <Button variant="contained" onClick={handleOpenAddRowModal}>
//                 add new row
//             </Button>
//             <Modal
//                 open={isAddRowModalOpen}
//                 onClose={handleCloseAddRowModal}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style}>
//                     <CreateRowForm onSubmit={handleCreateRow} />
//                 </Box>
//             </Modal>
//         </div>
//     );
// }

// export default App;
