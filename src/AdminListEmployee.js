import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEmployee from './CreateEmployee';

function AdminListEmployee() {

  const [EmployeeList, setEmployeeData] = useState([]);
  const [showCreateEmployee, setShowCreateEmployee] = useState(false);

  const getEmployeeList = () => {
    axios.post('https://bhargavasaikrishna.pythonanywhere.com/getEmployeeListToEdit')
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
    axios.post('https://bhargavasaikrishna.pythonanywhere.com/RemoveEmployee',JSON.parse(JSON.stringify(row))).then((response)=>{
      console.log(response.data)
    }).catch((error)=>{
      console.log(error);
    })
  };

  const handel2=(row)=>{
    axios.post('https://bhargavasaikrishna.pythonanywhere.com/PremoteEmployee',JSON.parse(JSON.stringify(row))).then((responce)=>{
      console.log(responce.data)
    }).catch((error)=>{
      console.log(error)
    })
  }

  const handel3=(row)=>{
    axios.post('https://bhargavasaikrishna.pythonanywhere.com/demoteEmployee',JSON.parse(JSON.stringify(row))).then((responce)=>{
      console.log(responce.data)
    }).catch((error)=>{
      console.log(error)
    })
  }

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
          <th>role</th>
          <th>Action</th>
        </thead>
        <tbody>
          {
            EmployeeList.map((row,index)=>(
              <tr key={index}>
                <td>{row.emp_id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.role}</td>
                <td><button onClick={()=>handleEdit(row)}><span></span>Remove</button></td>
                {(row.role==='crew')?<td><button onClick={()=>handel2(row)}>promote</button></td>:<td><button onClick={()=>handel3(row)}>demote</button></td>}
              </tr>
            ))
          }
        </tbody>
      </table>)}
    </div>
  )
}

export default AdminListEmployee;
