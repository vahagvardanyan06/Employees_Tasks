import React, { useState, useEffect } from 'react';

const employeesUrl = "https://rocky-temple-83495.herokuapp.com/employees";

const Employees = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(employeesUrl);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const createEmployee = async () => {
    const newEmployee = {
      name,
      surname,
      email,
      position,
    };

    try {
      const response = await fetch(employeesUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        // Employee created successfully
        fetchData(); // Refresh the employee list
        setName(""); // Reset form input fields
        setSurname("");
        setEmail("");
        setPosition("");
      } else {
        console.log('Error creating employee:', response.status);
      }
    } catch (error) {
      console.log('Error creating employee:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEmployee();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${employeesUrl}/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // Employee deleted successfully, fetch updated data
        fetchData();
      } else {
        console.log("Error deleting employee:", response.status);
      }
    } catch (error) {
      console.log("Error deleting employee:", error);
    }
  };
  

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`${employeesUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        // Employee updated successfully, fetch updated data
        fetchData();
      } else {
        console.log('Error updating employee:', response.status);
      }
    } catch (error) {
      console.log('Error updating employee:', error);
    }
  };

  return (
    <div>
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
          Surname:
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Position:
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Employee</button>
      </form>
      <div>
        {data.map((employee) => (
          <div key={employee.id}>
            <span>{employee.name} {employee.surname}</span>
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
            <button
              onClick={() => {
                const updatedData = {
                  name: "Updated Name",
                  surname: "Updated Surname",
                  email: "updated@email.com",
                  position: "Updated Position"
                };
                handleUpdate(employee.id, updatedData);
              }}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
