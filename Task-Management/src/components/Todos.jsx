import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getNotes } from "../features/todoSlice";
import { useEffect, useState } from "react";

const Todos = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(false);
  const [open, setOpen] = useState(false); // Modal open state
  const [currentTodo, setCurrentTodo] = useState({ id: null, description: "" });

  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getNotes());
    // eslint-disable-next-line
  }, [mode]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!todos) return <div>No todos available</div>;

  // Open modal with current todo
  const openModal = (todo) => {
    setCurrentTodo(todo);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => setOpen(false);

  // Save updated todo
  const handleSave = async () => {
    try {
      // Update task in the backend
      const output = localStorage.getItem("dataWithTokenAndId");
      const localData = JSON.parse(output);
      const { token, user } = localData;
      const response = await fetch(
        `https://task-hub-back-end.onrender.com/api/tasks/updateTasks/${user}/${currentTodo._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ description: currentTodo.description }),
        }
      );
      const data = await response.json();

      if (data) {
        // Refresh the tasks
        dispatch(getNotes());
        setMode(!mode); // Trigger re-render
        setOpen(false); // Close the modal
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    dispatch(getNotes());
    setMode(!mode);
  };

  return (
    <>
      <div className="flex flex-col items-center py-3">
        <h1 className="text-center shadow-lg bg-gradient-to-r from-gray-600 to-violet-500 text-white font-bold py-2 px-4 rounded-lg w-2/4 mb-4">
          Tasks
        </h1>
        {todos?.map((todo, index) => (
          <div
            className="flex my-3 shadow-md rounded-lg text-center w-2/4 justify-between px-4 py-2 bg-gradient-to-r from-green-800 to-teal-300 items-center"
            key={index}
          >
            <p className="text-lg font-medium">{todo.description}</p>
            <div className="flex space-x-3">
              <button
                onClick={() => openModal(todo)}
                className="text-blue-500 hover:text-blue-700"
                aria-label="Edit Task"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Delete Task"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-task-title"
        >
          <div className="bg-teal-500 rounded-lg w-96 p-6 shadow-lg">
            <h2 id="edit-task-title" className="text-lg font-bold mb-4">
              Edit Task
            </h2>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              value={currentTodo.description}
              onChange={(e) =>
                setCurrentTodo({ ...currentTodo, description: e.target.value })
              }
              aria-label="Task Description"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="bg-gray-300 text-gray-800 py-1 px-4 rounded-md hover:bg-gray-400"
                aria-label="Cancel Edit Task"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"
                aria-label="Save Edited Task"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Todos;
