import React, { Component } from 'react'
import PostForm from './PostForm';
import AdminListProjects from './AdminListProjects';
import AdminListClient from './AdminListClient';
import AdminListEmployee from './AdminListEmployee';
import TeamManager from './TeamManager';

class Admin extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      loggedIn: true,
      userId:props.userId,
      name:props.name,
      view_project:false,
      view_client:false,
      view_employee:false,
      view_team_manager:false
    }
  }

  project_view_handler=(e)=>{
    this.setState({
      view_project:true,
      view_client:false,
      view_employee:false,
      view_team_manager:false
    })
   }

   client_view_handler=(e)=>{
    this.setState({
      view_project:false,
      view_client:true,
      view_employee:false,
      view_team_manager:false
    })
   }

   employee_view_handler=(e)=>{
    this.setState({
      view_project:false,
      view_client:false,
      view_employee:true,
      view_team_manager:false
    })
   }

   Team_manager_handler=(e)=>{
    this.setState({
      view_project:false,
      view_client:false,
      view_employee:false,
      view_team_manager:true
    })
   }

  logouter = (e) => {
    this.setState({ loggedIn: false });
  };
  render() {
    const { loggedIn, userId, name, view_project, view_client,view_employee,view_team_manager } = this.state;
    return (
      <div>
        <div>
          {loggedIn?(
            <div className='AdmBdy'>
              <h1>Welcome {userId} {name}</h1>
              <button onClick={this.employee_view_handler}><span></span>Manage Employee</button>
              <button onClick={this.client_view_handler}><span></span>Manage Client</button>
              <button onClick={this.project_view_handler}><span></span>Manage Project</button>
              <button onClick={this.Team_manager_handler}><span></span>Manage Teams</button>
              <button onClick={this.logouter}><span></span>Logout</button>
              {view_project && <AdminListProjects userId={userId}/> }
              {view_client && <AdminListClient userId={userId}/> }
              {view_employee && <AdminListEmployee userId={userId}/> }
              {view_team_manager && <TeamManager userId={userId}/>}
            </div>
          ):(<PostForm/>)}
        </div>
      </div>
    )
  }
}

export default Admin
