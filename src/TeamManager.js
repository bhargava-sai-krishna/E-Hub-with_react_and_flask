import React, { useState, useEffect } from 'react'
import axios from 'axios';

function TeamManager(props) {
  const [AdmId] = useState(props.userId);
  const [projectData, setProjectData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [dropdownCount, setDropdownCount] = useState(1);
  const [editedMembers, setEditedMembers] = useState([]);
  const [EmployeeList, setEmployeeData] = useState([]);
  const [editedProjectLeader, setEditedProjectLeader] = useState("");

  useEffect(() => {
    const getTeamList = () => {
      axios.post('https://bhargavasaikrishna.pythonanywhere.com/GetTeamDetails').then((response) => {
        setProjectData(JSON.parse(response.data));
      }).catch((error) => {
        console.log(error);
      });
    }
    getTeamList();
  }, [AdmId])

  const getEmployeeList = () => {
    axios.post('https://bhargavasaikrishna.pythonanywhere.com/getEmployeeListDropDown')
      .then((response) => {
        setEmployeeData(JSON.parse(response.data));
      });
  }
  useEffect(() => {
    getEmployeeList();
  }, []);

  const handleEdit = (row) => {
    setSelectedProject(row);
    setEditedMembers(row.members.split(','));
    setDropdownCount(row.members.split(',').length || 1);
    setEditedProjectLeader(row.project_leader);
  };

  const handleAddMember = () => {
    setDropdownCount(prevCount => prevCount + 1);
    setEditedMembers(prevMembers => [...prevMembers, ""]);
  };

  const handleRemoveMember = () => {
    setDropdownCount(prevCount => prevCount - 1);
    setEditedMembers(prevMembers => prevMembers.slice(0, -1));  
  };

  const handleCommitChanges = () => {
    console.log('Project ID:', selectedProject.project_id);
    console.log('Project Leader:', editedProjectLeader);
    console.log('Members:', editedMembers.join(','));
    const updates={
      project_id:selectedProject.project_id,
      project_leader:editedProjectLeader,
      members:editedMembers.join(',')
    }
    const updatesJSON=JSON.stringify(updates);
    axios.post('https://bhargavasaikrishna.pythonanywhere.com/UpdateProjDetsInDB',JSON.parse(updatesJSON)).then((response)=>{
      console.log(response.data)
    }).catch((error)=>{
      console.log(error);
    })
};


  return (
    <div>
      returns option to edit the Teams
      {projectData && (
        <table>
          <thead>
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
                <td><button onClick={() => { handleEdit(row) }}>edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedProject && (
        <div>
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
          <button type="button" onClick={handleAddMember}>Add Member</button>
          {dropdownCount > 1 && <button type="button" onClick={handleRemoveMember}>Remove Member</button>}
          <button onClick={handleCommitChanges}>Commit Changes</button>
        </div>
      )}
    </div>
  )
}

export default TeamManager;
