import React, { Component } from 'react'
import PostForm from './PostForm';
import ViewprojectEmployee from './ViewprojectEmployee';
import ProjectStatus from './ProjectStatus';
import LeadingProjectByEmployee from './LeadingProjectByEmployee';
import './TableStyler.css';

class Employee extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      loggedIn: true,
      userId:props.userId,
      name:props.name,
      view_project:false,
      project_status:false,
      LeadingProjects:false
    }
  }

  project_view_handler=(e)=>{
    this.setState({
      view_project:true,
      project_status:false,
      LeadingProjects:false
    })
   }

   project_status_handler=(e)=>{
    this.setState({
      view_project:false,
      project_status:true,
      LeadingProjects:false
    })
   }

   Leader_project_handler=(e)=>{
    this.setState({
      view_project:false,
      project_status:false,
      LeadingProjects:true
    })
   }

  logouter = (e) => {
    this.setState({ loggedIn: false });
  };
  render() {
    const { loggedIn, userId, name, view_project, project_status, LeadingProjects } = this.state;
    return (
      <div>
        {loggedIn?(
          <div>
            <div>
              <h1>Welcome {userId} {name}</h1>
              <button className='btn' onClick={this.project_view_handler}>view projects</button>
              <button className='btn' onClick={this.project_status_handler}>project status</button>
              <button className='btn' onClick={this.Leader_project_handler}>Leading projects</button>
              <button className='btn' onClick={this.logouter}>Logout</button>
              {view_project && <ViewprojectEmployee userId={userId}/> }
              {project_status && <ProjectStatus userId={userId}/>}
              {LeadingProjects && <LeadingProjectByEmployee userId={userId}/>}
            </div>
          </div>
        ):(<PostForm/>)}
      </div>
    )
  }
}

export default Employee
