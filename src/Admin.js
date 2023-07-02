import React, { Component } from 'react'
import PostForm from './PostForm';

class Admin extends Component {
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
            <button>Manage Employee</button>
            <button>Manage Client</button>
            <button>Manage Project</button>
            <button onClick={this.logouter}>Logout</button>
          </div>
        ):(<PostForm/>)}
      </div>
    )
  }
}

export default Admin
