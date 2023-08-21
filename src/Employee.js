import React, { Component } from 'react'
import PostForm from './PostForm';

class Employee extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      loggedIn: true,
      userId:props.userId,
      name:props.name
    }
  }

  logouter = (e) => {
    this.setState({ loggedIn: false });
  };
  render() {
    const { loggedIn, userId, name } = this.state;
    return (
      <div>
        {loggedIn?(
          <div>
            <div>
              <h1>Welcome {userId} {name}</h1>
              <button>view projects</button>
              <button>project status</button>
              <button onClick={this.logouter}>Logout</button>
            </div>
          </div>
        ):(<PostForm/>)}
      </div>
    )
  }
}

export default Employee
