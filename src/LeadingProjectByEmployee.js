import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TableStyler.css';

function LeadingProjectByEmployee(props) {
    const [EmpId] = useState(props.userId);
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        const getTable = () => {
            axios.post('https://bhargavasaikrishna.pythonanywhere.com/getProjectLedByEmployee', { EmpId })
                .then((response) => {
                    setProjectData(JSON.parse(response.data));
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        getTable();
    }, [EmpId]);
  return (
    <div>
      {projectData && (
                <table>
                    <thead className='header'>
                        <tr>
                            <th>Project_id</th>
                            <th>Project_leader</th>
                            <th>Client_id</th>
                            <th>Project_name</th>
                            <th>Project_log</th>
                            <th>domain</th>
                            <th>Members</th>
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
                                <td>{row.members}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
    </div>
  )
}

export default LeadingProjectByEmployee
