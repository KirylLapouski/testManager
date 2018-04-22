import React, { Component } from 'react';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/mdbreact/dist/css/mdb.css';
import '../node_modules/toastr/build/toastr.css';
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
