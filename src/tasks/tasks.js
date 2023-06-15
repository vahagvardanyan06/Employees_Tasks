import React, { useState, useEffect } from 'react';

const tasksUrl = "https://rocky-temple-83495.herokuapp.com/tasks";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [currentPage, searchParams]);

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams(searchParams);
      const response = await fetch(`${tasksUrl}?_page=${currentPage}&_limit=5&${params}`);
      const jsonData = await response.json();
      setTasks(jsonData);
      setTotalPages(Number(response.headers.get('X-Total-Pages')));
    } catch (error) {
      console.log('Error fetching tasks:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [event.target.name]: event.target.value
    }));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (taskId) => {
    try {
      await fetch(`${tasksUrl}/${taskId}`, { method: "DELETE" });
      fetchTasks();
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };
  

  const handleUpdate = async (taskId, updatedData) => {
    try {
      await fetch(`${tasksUrl}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      fetchTasks();
    } catch (error) {
      console.log('Error updating task:', error);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleSearchSubmit}>
        {/* Search form fields */}
      </form>
      <div>
        {/* Task list */}
        {tasks.map((task) => (
          <div key={task.id}>
            {/* Task details */}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
            <button onClick={() => handleUpdate(task.id, { name: 'Updated Task' })}>Update</button>
            <hr />
          </div>
        ))}
      </div>
      <div>
        {/* Pagination buttons */}
      </div>
    </div>
  );
};

export default Tasks;
