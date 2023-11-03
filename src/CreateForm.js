import axios from 'axios';
import React, { useState, useEffect } from 'react';

function CreateForm() {
    const [EmployeeList, setEmployeeData] = useState([]);
    const [projectId, setProjectId] = useState('');
    const [clientId, setClientId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectLog, setProjectLog] = useState('');
    const [domain, setDomain] = useState('');
    const [projectLeader, setProjectLeader] = useState('');
    const [teammates, setTeammates] = useState([]);
    const [dropdownCount, setDropdownCount] = useState(1);
    const [message, setMessage] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = {
            projectId,
            clientId,
            projectName,
            projectLog,
            domain,
            projectLeader,
            teammates: teammates.join(',')
        };
        axios.post('https://bhargavasaikrishna.pythonanywhere.com/AssignProject', formData)
        .then((response) => {
          console.log(response.data);
          setClientId('');
          setProjectName('');
          setProjectLog('');
          setDomain('');
          setProjectLeader('');
          setTeammates([]);
          setDropdownCount(1);
          setMessage('Added successfully');
        });
    }

    const getProjId = () => {
      axios.post('https://bhargavasaikrishna.pythonanywhere.com/getNewProjectId').then((response) => {
        console.log(response.data);
        setProjectId(response.data);
      });
    }

    const getEmployeeList = () => {
        axios.post('https://bhargavasaikrishna.pythonanywhere.com/getEmployeeListDropDown')
        .then((response) => {
            console.log("API Response:", response.data);
            setEmployeeData(JSON.parse(response.data));
        });
    }

    useEffect(() => { 
        getEmployeeList(); 
    }, []);

    useEffect(() => { 
      getProjId(); 
    }, []);

    const handleTeammateChange = (index, value) => {
        const newTeammates = [...teammates];
        newTeammates[index] = value;
        setTeammates(newTeammates);
    }

    return (
      <div>
        {message}
        <form onSubmit={submitHandler}>
          <div>
            <p>Project_id</p>
            <input type='text' readOnly name='Project_id' value={projectId} />
          </div>

          <div>
            <p>Client_id</p>
            <input type='text' name='Client_id' value={clientId} onChange={(e) => setClientId(e.target.value)} />
          </div>

          <div>
            <p>Project_name</p>
            <input type='text' name='Project_name' value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          </div>

          <div>
            <p>Project_log</p>
            <input type='text' name='Project_log' value={projectLog} placeholder='usually team_assgined' onChange={(e) => setProjectLog(e.target.value)} />
          </div>

          <div>
            <p>domain</p>
            <input type='text' name='domain' value={domain} onChange={(e) => setDomain(e.target.value)} />
          </div>

          <div>
            <p>project_leader</p>
            <select name="project_leader" value={projectLeader} onChange={(e) => setProjectLeader(e.target.value)}>
                <option value="" disabled>Select</option>
                {EmployeeList && EmployeeList.map(employee => (
                    <option key={employee} value={employee}>
                        {employee}
                    </option>
                ))}
            </select>
          </div>
          
          {[...Array(dropdownCount)].map((_, index) => (
            <div key={index}>
              <p>Teammate {index + 1}</p>
              <select value={teammates[index] || ""} onChange={(e) => handleTeammateChange(index, e.target.value)}>
                  <option value="" disabled>Select Teammate</option>
                  {EmployeeList && EmployeeList.map(employee => (
                      <option key={employee} value={employee}>
                          {employee}
                      </option>
                  ))}
              </select>
            </div>
          ))}
          
          <button type='button' onClick={() => setDropdownCount(prevCount => prevCount + 1)}>Add Teammate</button>
          <div>
            <button type='submit'>submit</button>
          </div>
        </form>
      </div>
    );
}

export default CreateForm;
