import React, { Component } from 'react';
import axios from 'axios';
import PostForm from './PostForm';

export class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userName: '',
          company: '',
          password: '',
          email: '',
          signup: 'False',
        }
      };
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };
    submitHandler=(e)=>{
        e.preventDefault();
        console.log(this.state);
        const stateJson = JSON.stringify(this.state);
        axios.post('http://127.0.0.1:5000/signup',JSON.parse(stateJson)).then((response)=>{
            console.log(response.data);

        }).catch((error)=>{
            console.log(error);
        })
    };
    toPostForm=(e)=>{
        e.preventDefault();
        this.setState({signup:'True'})
    };
  render() {
    const {userName, company, email, password, signup}=this.state;
    if(signup === "True")
    {
        return <PostForm />
    }
    return (
      <div>
        <form onSubmit={this.submitHandler} action='POSTS'>
          <div>
            <p>Enter name</p>
            <input type='text' name='userName' value={userName} onChange={this.changeHandler} />
          </div>
          <div>
            <p>company name</p>
            <input type='text' name='company' value={company} onChange={this.changeHandler} />
          </div>
          <div>
            <p>Email</p>
            <input type='text' name='email' value={email} onChange={this.changeHandler} />
          </div>
          <div>
            <p>Enter password</p>
            <input type='text' name='password' value={password} onChange={this.changeHandler} />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
      </form>
      <div>
        <button onClick={this.toPostForm}>Signin</button>
      </div>
      </div>
    )
  }
}

export default Signup
