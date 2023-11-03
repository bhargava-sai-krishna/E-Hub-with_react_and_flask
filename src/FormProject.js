import React, { useState, useEffect } from 'react';
import axios from 'axios';


const FormProject = (props) => {
  const [clientId] = useState(props.userId);
  const [projectId, setProjectId] = useState('');
  const [message, setMessage] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectLog, setProjectLog] = useState('');
  const [domain, setDomain] = useState('');

  const getProjId = () => {
    axios.post('https://bhargavasaikrishna.pythonanywhere.com/getNewProjectId').then((response) => {
      console.log(response.data);
      setProjectId(response.data);
    });
  }

  useEffect(() => { 
    getProjId(); 
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
        projectId,
        clientId,
        projectName,
        projectLog,
        domain,
    };
    axios.post('https://bhargavasaikrishna.pythonanywhere.com/AssignProjectByClient', formData)
    .then((response) => {
      console.log(response.data);
      setProjectName('');
      setProjectLog('');
      setDomain('');
      setMessage('Added successfully');
    });
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
            <input type='text' readOnly name='Client_id' value={clientId} />
          </div>

          <div>
            <p>Project_name</p>
            <input type='text' name='Project_name' value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          </div>

          <div>
            <p>Project_log</p>
            <input type='text' name='Project_log' value={projectLog} placeholder='usually requested' onChange={(e) => setProjectLog(e.target.value)} />
          </div>

          <div>
            <p>domain</p>
            <input type='text' name='domain' value={domain} onChange={(e) => setDomain(e.target.value)} />
          </div>

          <div>
            <button type='submit'>submit</button>
          </div>
      </form>
    </div>
  )
}

export default FormProject
