import React, { Component } from 'react';
import Signup from './Signup';
import PostForm from './PostForm';

export class Home extends Component {
  state = {
    view: 'home'  // This can be 'home', 'signin' or 'signup'
  };

  signinHandler = () => {
    this.setState({ view: 'signin' });
  }

  signupHandler = () => {
    this.setState({ view: 'signup' });
  }

  renderView = () => {
    switch (this.state.view) {
      case 'signin':
        return <PostForm />;
      case 'signup':
        return <Signup />;
      default:
        return (
          <div>
            Welcome to E-Hub web site
            what do you want to do?
            present user:
            <button onClick={this.signinHandler}>sign in</button>
            new user:
            <button onClick={this.signupHandler}>sign up</button> 
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        {this.renderView()}
      </div>
    )
  }
}

export default Home;
