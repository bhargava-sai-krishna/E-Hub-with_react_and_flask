import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ListProjects = (props) => {
  const [userId, setUserId] = useState(props.userId);
  const [projectData, setProjectData] = useState(null);
  
  useEffect(() => {
    setUserId(props.userId);
  }, [props.userId]);
  
  useEffect(() => {
    const getTable = () => {
      console.log('hi');
      axios.post('/getProject', {userId})
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

  return (
    <div>
      {projectData && (
        <table>
          <thead>
            <tr>
              <th>Project_id</th>
              <th>Client_id</th>
              <th>Project_name</th>
              <th>Project_log</th>
              <th>domain</th>
              <th>project_leader</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListProjects;
