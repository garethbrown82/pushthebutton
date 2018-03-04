import React, { Component } from 'react';
import './App.css';
import { Game } from './components/Game';

class App extends Component {
  render() {
    return (
      <div className="container mt-3">
        <div className="row">
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
