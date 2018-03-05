import React, { Component } from 'react';
import Orgrel from './Components/Orgrel'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Orgrel</h1>
          <h3>Organizational Relationship keeper!</h3>
          <div className="link-to-git">
            <a href="https://github.com/Wyzardsleeves/orgrelapp" target="_blank">
              <i className="ion-social-github"></i>
              <p>Orgrel (React) on Github</p>
            </a>
          </div>
        </header>
        <div className="orgrel-contain">
          <Orgrel />
        </div>
      </div>
    );
  }
}

export default App;
