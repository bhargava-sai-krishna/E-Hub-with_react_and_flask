import React, { Component } from 'react';
import axios from 'axios';
import Client from './Client';
import Admin from './Admin';
import Employee from './Employee';
import Signup from './Signup';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
      userRole: '', 
      signup: 'False',
      name: ""
    };
  }

  toSignup=(e)=>{
    e.preventDefault();
    this.setState({signup:'True'})
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    const stateJson = JSON.stringify(this.state);
    axios
      .post('http://127.0.0.1:5000/signin', JSON.parse(stateJson))
      .then((response) => {
        console.log(response.data.flag);
        if (response.data.flag !== 'False') 
        {
          const userId = this.state.userId;
          const jsonData = response.data;
          if (jsonData.flag.charAt(0) === 'C' || userId.charAt(0) === 'c' || userId.charAt(0) === 'C') 
          {
            this.setState({ userRole: 'client', name: jsonData.name });
          } 
          else if (jsonData.flag.charAt(0) === 'A' || userId.charAt(0) === 'a' || userId.charAt(0) === 'A') 
          {
            this.setState({ userRole: 'admin', name: jsonData.name });
          } 
          else if (jsonData.flag.charAt(0) === 'E' || userId.charAt(0) === 'e' || userId.charAt(0) === 'A') 
          {
            this.setState({ userRole: 'employee', name: jsonData.name });
          }
        } else {
          console.log('Enter correct details');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  render() {
    const { userId, password, userRole, signup, name } = this.state;
    if (userRole === 'client') 
    {
      return <Client userId={userId} name={name}/>;
    } 
    else if (userRole === 'admin') 
    {
      return <Admin userId={userId} name={name}/>;
    } 
    else if (userRole === 'employee') 
    {
      return <Employee userId={userId} name={name}/>;
    }
    if(signup === "True")
    {
        return <Signup />
    }
    return (
      <div>
        <form onSubmit={this.submitHandler} action='POSTS'>
          <div>
            <input type='text' name='userId' value={userId} onChange={this.changeHandler} />
          </div>
          <div>
            <input type='text' name='password' value={password} onChange={this.changeHandler} />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
        <div>
          <button onClick={this.toSignup}>Signup</button>
        </div>
      </div>
    );
  }
}

export default PostForm;
