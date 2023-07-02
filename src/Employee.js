import React, { Component } from 'react'
import PostForm from './PostForm';

class Employee extends Component {
  state = {
    loggedIn: true,
  };

  logouter = (e) => {
    this.setState({ loggedIn: false });
  };
  render() {
    const { loggedIn } = this.state;
    return (
      <div>
        {loggedIn?(
          <div>
            <div>
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
