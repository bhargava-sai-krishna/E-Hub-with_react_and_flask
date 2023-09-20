import React, { Component } from 'react';
import Signup from './Signup';
import PostForm from './PostForm';
import './HomeStyles.css'

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
          <div className='banner'>
            <div className='navbar'>
              <img src='logo.png' className='logoImage' alt='logo'></img>
              <ul>
                <li><button onClick={this.signupHandler}>Signup</button></li>
                <li><button onClick={this.signinHandler}>Signin</button></li>
              </ul>
            </div>
            <div className='content'>
              <h1>Order Your Website</h1>
              <p>Make your websites easily and ready to use</p>
              <div>
                <button onClick={this.signupHandler}><span></span>Signup</button>
                <button onClick={this.signinHandler}><span></span>Signin</button>
              </div>
            </div>
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
