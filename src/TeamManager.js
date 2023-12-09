import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TableStyler.css';
import './FormStyle.css'

function TeamManager(props) {
  const [AdmId] = useState(props.userId);
  const [projectData, setProjectData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [dropdownCount, setDropdownCount] = useState(1);
  const [editedMembers, setEditedMembers] = useState([]);
  const [EmployeeList, setEmployeeData] = useState([]);
  const [editedProjectLeader, setEditedProjectLeader] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const getTeamList = () => {
      axios.post('https://bhargavasaikrishna.pythonanywhere.com/GetTeamDetails').then((response) => {
        setProjectData(JSON.parse(response.data));
      }).catch((error) => {
        console.log(error);
      });
    };
    getTeamList();
  }, [AdmId]);

  const getEmployeeList = () => {
    axios.post('https://bhargavasaikrishna.pythonanywhere.com/getEmployeeListDropDown')
      .then((response) => {
        setEmployeeData(JSON.parse(response.data));
      });
  };
  useEffect(() => {
    getEmployeeList();
  }, []);

  const handleEdit = (row) => {
    setSelectedProject(row);
    setEditedMembers(row.members.split(','));
    setDropdownCount(row.members.split(',').length || 1);
    setEditedProjectLeader(row.project_leader);
    setEditing(true);
  };

  const handleCommitChanges = () => {
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <div  className='frm'>
          <h3>Edit Project details</h3>
          <p>Project id:</p>
          <input type='text' disabled value={selectedProject.project_id}></input>
          <div>
            <p><strong>Project Leader:</strong></p>
            <select
              value={editedProjectLeader}
              onChange={(e) => setEditedProjectLeader(e.target.value)}
            >
              <option value="" disabled>Select Project Leader</option>
              {EmployeeList.map(employee => (
                <option key={employee} value={employee}>
                  {employee}
                </option>
              ))}
            </select>
          </div>
          {[...Array(dropdownCount)].map((_, index) => (
            <div key={index}>
              <p>Member {index + 1}</p>
              <select
                value={editedMembers[index] || ""}
                onChange={(e) => {
                  const updatedMembers = [...editedMembers];
                  updatedMembers[index] = e.target.value;
                  setEditedMembers(updatedMembers);
                }}
              >
                <option value="" disabled>Select Member</option>
                {EmployeeList.map(employee => (
                  <option key={employee} value={employee}>
                    {employee}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button className='btn' type="button" onClick={handleCommitChanges}>Commit Changes</button>
        </div>
      ) : (
        projectData && (
          <table>
            <thead className='header'>
              <tr>
                <th>Project Id</th>
                <th>Project Leader</th>
                <th>members</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projectData.map((row, index) => (
                <tr key={index}>
                  <td>{row.project_id}</td>
                  <td>{row.project_leader}</td>
                  <td>{row.members}</td>
                  <td><button className='btn' onClick={() => { handleEdit(row) }}><span></span>edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}

export default TeamManager;