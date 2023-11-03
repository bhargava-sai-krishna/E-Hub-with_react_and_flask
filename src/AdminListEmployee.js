import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEmployee from './CreateEmployee';

function AdminListEmployee() {

  const [EmployeeList, setEmployeeData] = useState([]);
  const [showCreateEmployee, setShowCreateEmployee] = useState(false);

  const getEmployeeList = () => {
    axios.post('/getEmployeeListToEdit')
      .then((response) => {
        console.log(JSON.parse(response.data));
        setEmployeeData(JSON.parse(response.data));
      });
  }
  useEffect(() => {
    getEmployeeList();
  }, []);

  const handleEdit = (row) => {
    console.log(row)
    axios.post('/RemoveEmployee',JSON.parse(JSON.stringify(row))).then((response)=>{
      console.log(response.data)
    }).catch((error)=>{
      console.log(error);
    })
  };

  const handleAddEmployee = () => {
    setShowCreateEmployee(true);
  };

  return (
    <div>
      <button onClick={handleAddEmployee}>Add Employee</button>
      {showCreateEmployee && <CreateEmployee />}
      {EmployeeList && (
      <table>
        <thead>
          <th>Employee Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </thead>
        <tbody>
          {
            EmployeeList.map((row,index)=>(
              <tr key={index}>
                <td>{row.emp_id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td><button onClick={()=>handleEdit(row)}>Remove</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>)}
    </div>
  )
}

export default AdminListEmployee;
