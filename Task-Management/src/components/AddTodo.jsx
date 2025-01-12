import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { addTask, getNotes } from '../features/todoSlice';

const AddTodo = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(false);
    const [taskDescription, setTaskDescription] = useState('');

    useEffect(() => {
        dispatch(getNotes());
        // eslint-disable-next-line
    }, [value]);

    const handleClick = () => {
        if (taskDescription) {
            dispatch(addTask(taskDescription));
            setValue(!value);
            setTaskDescription('');
        }
    };

    return (
        <div className="flex flex-col sm:flex-row justify-center items-center px-5 py-3 gap-5">
            {/* Task Input */}
            <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Enter the preferred task"
                onChange={(e) => setTaskDescription(e.target.value)}
                className="w-full sm:w-3/4 px-2"
                value={taskDescription}
            />
            {/* Add Task Button */}
            <Button
                disabled={taskDescription.trim().length === 0}
                variant="contained"
                className="w-full sm:w-auto bg-gradient-to-r from-green-800 to-teal-200 text-white"
                onClick={handleClick}
            >
                Add Task
            </Button>
        </div>
    );
};

export default AddTodo;