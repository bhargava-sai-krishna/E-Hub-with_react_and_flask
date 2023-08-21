import React, { Component } from 'react';
import PostForm from './PostForm';
import ListProjects from './ListProjects';
import FormProject from './FormProject';

class Client extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      loggedIn: true,
      userId:props.userId,
      name:props.name,
      view_project:false,
      request_project:false,
    }
  }

  logouter = (e) => {
    this.setState({ loggedIn: false });
  };

 project_view_handler=(e)=>{
  this.setState({
    view_project:true,
    request_project:false
  })
 }

 request_project_handler=(e)=>{
  this.setState({
    view_project:false,
    request_project:true
  })
 }

 

  render() {
    const { loggedIn, userId ,name, view_project, request_project } = this.state;

    return (
      <div>
        {loggedIn ? (
          <div>
            <h1>Welcome {userId} {name}</h1>
            <button onClick={this.project_view_handler}>view projects</button>
            <button onClick={this.request_project_handler}>request projects</button>
            <button onClick={this.logouter}>Logout</button>
            {view_project && <ListProjects userId={userId}/> }
            {request_project && <FormProject userId={userId}/>}
          </div>
        ) : (
          <PostForm />
        )}
      </div>
    );
  }
}

export default Client;
