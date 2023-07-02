import React, { Component } from 'react';
import PostForm from './PostForm';

class Client extends Component {
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
        {loggedIn ? (
          <div>
            <button>view projects</button>
            <button>request projects</button>
            <button onClick={this.logouter}>Logout</button>
          </div>
        ) : (
          <PostForm />
        )}
      </div>
    );
  }
}

export default Client;
