import './App.css';

import React from 'react';
import Employees from './employees/employees';
import Tasks from './tasks/tasks';

const App = () => {
  return (
    <div>
      <h1>Employee Management System</h1>
      <Employees />
      <Tasks />
    </div>
  );
};

export default App;
