import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TableStyler.css';
import './FormStyle.css'

function ProjectStatus(props) {
  const [EmpId] = useState(props.userId);
  const [projectData, setProjectData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editedLog, setEditedLog] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const getTable = () => {
      axios
        .post('https://bhargavasaikrishna.pythonanywhere.com/getProjectForEmployeeToEditLog', { EmpId })
        .then((response) => {
          setProjectData(JSON.parse(response.data));
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getTable();
  }, [EmpId]);

  const handleEdit = (row) => {
    setSelectedProject(row);
    setEditedLog(row.project_log);
    setShowEditForm(true);
  };

  const handleLogChange = (e) => {
    setEditedLog(e.target.value);
  };

  const commitChanges = () => {
    console.log("Updated project log for Project ID", selectedProject.project_id, ":", editedLog);
    const PostingData = {
      project_id: selectedProject.project_id,
      editedLog: editedLog,
    };
    const PostingDataJson = JSON.stringify(PostingData);
    axios
      .post('https://bhargavasaikrishna.pythonanywhere.com/EditTheseDetailsByEmployee', JSON.parse(PostingDataJson))
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setShowEditForm(false);
  };

  return (
    <div>
      {projectData && !showEditForm && (
        <table>
          <thead className='header'>
            <tr>
              <th>Project_id</th>
              <th>Project_leader</th>
              <th>Client_id</th>
              <th>Project_name</th>
              <th>Project_log</th>
              <th>domain</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projectData.map((row, index) => (
              <tr key={index}>
                <td>{row.project_id}</td>
                <td>{row.project_leader}</td>
                <td>{row.client_id}</td>
                <td>{row.project_name}</td>
                <td>{row.project_log}</td>
                <td>{row.domain}</td>
                <td>
                  <button className='btn' onClick={() => handleEdit(row)}>
                    edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedProject && showEditForm && (
        <div  className='frm'>
          <h3>Edit Project Log:</h3>
          <p>
            <strong>Project ID:</strong> {selectedProject.project_id}
          </p>
          <br></br>
          <label>
            <strong>Project Log:</strong>
            <textarea value={editedLog} onChange={handleLogChange} />
          </label>
          <br/>
          <button className='btn' onClick={commitChanges}>Commit Changes</button>
        </div>
      )}
    </div>
  );
}

export default ProjectStatus;
