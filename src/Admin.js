import React, { Component } from 'react'
import PostForm from './PostForm';
import AdminListProjects from './AdminListProjects';
import AdminListClient from './AdminListClient';
import AdminListEmployee from './AdminListEmployee';

class Admin extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      loggedIn: true,
      userId:props.userId,
      name:props.name,
      view_project:false,
      view_client:false,
      view_employee:false
    }
  }

  project_view_handler=(e)=>{
    this.setState({
      view_project:true,
      view_client:false,
      view_employee:false
    })
   }

   client_view_handler=(e)=>{
    this.setState({
      view_project:false,
      view_client:true,
      view_employee:false
    })
   }

   employee_view_handler=(e)=>{
    this.setState({
      view_project:false,
      view_client:false,
      view_employee:true
    })
   }


  logouter = (e) => {
    this.setState({ loggedIn: false });
  };
  render() {
    const { loggedIn, userId, name, view_project, view_client,view_employee } = this.state;
    return (
      <div>
        {loggedIn?(
          <div>
            <h1>Welcome {userId} {name}</h1>
            <button onClick={this.employee_view_handler}>Manage Employee</button>
            <button onClick={this.client_view_handler}>Manage Client</button>
            <button onClick={this.project_view_handler}>Manage Project</button>
            <button>Manage Teams</button>
            <button onClick={this.logouter}>Logout</button>
            {view_project && <AdminListProjects userId={userId}/> }
            {view_client && <AdminListClient /> }
            {view_employee && <AdminListEmployee /> }
          </div>
        ):(<PostForm/>)}
      </div>
    )
  }
}

export default Admin
