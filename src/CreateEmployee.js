import axios from 'axios';
import React, { useState } from 'react';

function CreateEmployee() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfJoin, setDateOfJoin] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({
      name,
      email,
      password,
      dateOfJoin,
      yearsOfExperience
    });
    const data={
        name:name,
        email:email,
        password:password,
        dateOfJoin:dateOfJoin,
        experience:yearsOfExperience
    }
    const dataJson=JSON.stringify(data);
    axios.post('http://127.0.0.1:5000/CreateNewEmployee',JSON.parse(dataJson)).then((response)=>{
        console.log(response.data);
    }).catch((error)=>{
        console.log(error)
    })
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <p>Name:</p>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <p>Email:</p>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        <p>Password</p>
        <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
        <p>Date of Join</p>
        <input type='date' value={dateOfJoin} onChange={(e) => setDateOfJoin(e.target.value)} />
        <p>Years of Experience</p>
        <input type='text' value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} />
        <br></br>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default CreateEmployee;
