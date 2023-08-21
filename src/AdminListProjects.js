import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CreateForm from './CreateForm';

function AdminListProjects(props) {
  const [userId, setUserId] = useState(props.userId);
  const [projectData, setProjectData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    setUserId(props.userId);
  }, [props.userId]);

  useEffect(() => {
    const getTable = () => {
      console.log('hi');
      axios.post('http://127.0.0.1:5000/getProjectForAdmin', { userId })
        .then((response) => {
          console.log(response);
          setProjectData(JSON.parse(response.data));
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getTable();
  }, [userId]);

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  return (
    <div>
      {showCreateForm ? (
        <CreateForm />
      ) : (
        <>
          <button onClick={toggleCreateForm}>Add project</button>

          {projectData && (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Project_id</th>
                    <th>Client_id</th>
                    <th>Project_name</th>
                    <th>Project_log</th>
                    <th>domain</th>
                    <th>project_leader</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projectData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.project_id}</td>
                      <td>{row.client_id}</td>
                      <td>{row.project_name}</td>
                      <td>{row.project_log}</td>
                      <td>{row.domain}</td>
                      <td>{row.project_leader}</td>
                      <td>
                        <button onClick={() => setSelectedProject(row)}>edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedProject && (
                <div>
                  <h3>Selected Project:</h3>
                  <p><strong>Project ID:</strong> {selectedProject.project_id}</p>
                  <p><strong>Client ID:</strong> {selectedProject.client_id}</p>
                  <p><strong>Project Name:</strong> {selectedProject.project_name}</p>
                  <p><strong>Project Log:</strong> {selectedProject.project_log}</p>
                  <p><strong>Domain:</strong> {selectedProject.domain}</p>
                  <p><strong>Project Leader:</strong> {selectedProject.project_leader}</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default AdminListProjects;
