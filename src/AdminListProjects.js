import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CreateForm from './CreateForm';
import './TableStyler.css';
import './FormStyle.css'

function AdminListProjects(props) {
    const [userId, setUserId] = useState(props.userId);
    const [projectData, setProjectData] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [EmployeeList, setEmployeeData] = useState([]);
    const [editedMembers, setEditedMembers] = useState([]);
    const [editedLog, setEditedLog] = useState("");
    const [editedProjectLeader, setEditedProjectLeader] = useState("");
    const [dropdownCount, setDropdownCount] = useState(1);

    useEffect(() => {
        setUserId(props.userId);
    }, [props.userId]);

    useEffect(() => {
        const getTable = () => {
            axios.post('https://bhargavasaikrishna.pythonanywhere.com/getProjectForAdmin', { userId })
                .then((response) => {
                    setProjectData(JSON.parse(response.data));
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        getTable();
    }, [userId]);

    const getEmployeeList = () => {
        axios.post('https://bhargavasaikrishna.pythonanywhere.com/getEmployeeListDropDown')
            .then((response) => {
                console.log(response.data);
                setEmployeeData(JSON.parse(response.data));
            });
    }

    useEffect(() => {
        getEmployeeList();
    }, []);

    const commitChanges = () => {
        const membersString = editedMembers.join(',');
        console.log("Project ID:", selectedProject.project_id);
        console.log("Client ID:", selectedProject.client_id);
        console.log("Updated project leader:", editedProjectLeader);
        console.log("Updated project log:", editedLog);
        console.log("Updated project members:", membersString);
        const updates = {
            project_id: selectedProject.project_id,
            client_id: selectedProject.client_id,
            editedProjectLeader: editedProjectLeader,
            editedLog: editedLog,
            membersString: membersString
        }
        const updatesJSON = JSON.stringify(updates);
        
        axios.post('https://bhargavasaikrishna.pythonanywhere.com/UpdateProjectData', JSON.parse(updatesJSON))
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.post('https://bhargavasaikrishna.pythonanywhere.com/getProjectForAdmin', { userId })
            .then((response) => {
                setProjectData(JSON.parse(response.data));
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
        
        setShowEditForm(false);
    };

    const handleTeammateChange = (index, value) => {
        const newTeammates = [...editedMembers];
        newTeammates[index] = value;
        setEditedMembers(newTeammates);
    };

    const handleLogChange = (e) => {
        setEditedLog(e.target.value);
    };

    const toggleCreateForm = () => {
        setShowCreateForm(!showCreateForm);
    };

    const handleEdit = (row) => {
        setSelectedProject(row);
        setEditedMembers(row.members.split(','));
        setEditedLog(row.project_log);
        setDropdownCount(row.members.split(',').length || 1);
        setEditedProjectLeader(row.project_leader);
        setShowEditForm(true);
    };

    return (
        <div>
            {showCreateForm ? (
                <CreateForm />
            ) : (
                <>
                    <button className='btn' onClick={toggleCreateForm}><span></span>Add project</button>
                    <br/>
                    <br/>
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
                                    <th>Members</th>
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
                                        <td>{row.members}</td>
                                        <td>
                                            <button className='btn' onClick={() => handleEdit(row)}>edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {selectedProject && showEditForm && (
                        <div className='frm'>
                            <h3>Edit Project:</h3>
                            <p><strong>Project ID:</strong> {selectedProject.project_id}</p>
                            <p><strong>Client ID:</strong> {selectedProject.client_id}</p>

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

                            <label>
                                <strong>Project Log:</strong>
                                <textarea value={editedLog} onChange={handleLogChange} />
                            </label>

                            {[...Array(dropdownCount)].map((_, index) => (
                                <div key={index}>
                                    <p>Member {index + 1}</p>
                                    <select
                                        value={editedMembers[index] || ""}
                                        onChange={(e) => handleTeammateChange(index, e.target.value)}
                                    >
                                        <option value="" disabled>Select Member</option>
                                        {EmployeeList.map((employee, index) => (
                                            <option key={index} value={employee}>
                                                {employee}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            <button className='btn' type="button" onClick={() => setDropdownCount(prevCount => prevCount + 1)}>Add Member</button>
                            <button className='btn' onClick={commitChanges}>Commit Changes</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default AdminListProjects;
