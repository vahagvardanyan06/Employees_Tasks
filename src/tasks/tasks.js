import React, { useState, useEffect } from 'react';

const tasksUrl = "https://rocky-temple-83495.herokuapp.com/tasks";
const employeesUrl = "https://rocky-temple-83495.herokuapp.com/employees";

const Tasks = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(employeesUrl);
      const jsonData = await response.json();
      setEmployees(jsonData);
    } catch (error) {
      console.log('Error fetching employees:', error);
    }
  };

  const createTask = async () => {
    const newTask = {
      name,
      description,
      startDate,
      endDate,
      employeeId,
    };

    try {
      const response = await fetch(tasksUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        // Task created successfully
        setName("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        setEmployeeId("");
        alert("Task created successfully!");
      } else {
        console.log('Error creating task:', response.status);
      }
    } catch (error) {
      console.log('Error creating task:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask();
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <label>
          Employee:
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name} {employee.surname}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default Tasks;
