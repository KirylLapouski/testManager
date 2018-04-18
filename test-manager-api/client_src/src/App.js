import React, { Component } from 'react';
import './App.css';
import NavBarCustom from './components/NavBarCustom';
import Main from './components/Main'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBarCustom />
        <Main/>
      </div>
    );
  }
}

export default App;
