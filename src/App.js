import React, { Component } from 'react';
import './App.css';
import { Game } from './components/Game';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
