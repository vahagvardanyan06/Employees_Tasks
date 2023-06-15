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

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Name:
          <input type="text" name="name_like" onChange={handleSearchChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description_like" onChange={handleSearchChange} />
        </label>
        <label>
          Start Date:
          <input type="text" name="startDate" onChange={handleSearchChange} />
        </label>
        <label>
          End Date:
          <input type="text" name="endDate" onChange={handleSearchChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <p>Name: {task.name}</p>
            <p>Description: {task.description}</p>
            <p>Start Date: {task.startDate}</p>
            <p>End Date: {task.endDate}</p>
            <p>Employee ID: {task.employeeId}</p>
            <hr />
          </div>
        ))}
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
