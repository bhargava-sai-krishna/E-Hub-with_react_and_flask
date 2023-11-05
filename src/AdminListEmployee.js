import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEmployee from './CreateEmployee';

function AdminListEmployee() {

  const [EmployeeList, setEmployeeData] = useState([]);
  const [showCreateEmployee, setShowCreateEmployee] = useState(false);

  const getEmployeeList = () => {
    axios.post('http://127.0.0.1:5000/getEmployeeListToEdit')
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
    axios.post('http://127.0.0.1:5000/RemoveEmployee',JSON.parse(JSON.stringify(row))).then((response)=>{
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
      <button onClick={handleAddEmployee}><span></span>Add Employee</button>
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
                <td><button onClick={()=>handleEdit(row)}><span></span>Remove</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>)}
    </div>
  )
}

export default AdminListEmployee;
