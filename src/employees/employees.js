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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        // Employee created successfully, fetch updated data
        fetchData();
        // Reset form fields
        setName("");
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

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <button type="submit">Create Employee</button>
        </form>
      </div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default Employees;












































// import React, { useState, useEffect } from 'react';

// const employeesUrl = "https://rocky-temple-83495.herokuapp.com/employees";

// const Employees = () => {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchData();
//   }, [currentPage]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${employeesUrl}?_page=${currentPage}&_limit=10`);
//       const jsonData = await response.json();
//       setData(jsonData);
//       // Extract total number of pages from response headers
//       const totalCount = response.headers.get('X-Total-Count');
//       const totalPagesCount = Math.ceil(totalCount / 10);
//       setTotalPages(totalPagesCount);
//     } catch (error) {
//       console.log('Error fetching data:', error);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//       {data.map((item) => (
//         <div key={item.id}>{item.name}</div>
//       ))}
//     </div>
//   );
// };

// export default Employees;
