import React, { Component } from 'react'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import '../node_modules/mdbreact/dist/css/mdb.css'
import '../node_modules/toastr/build/toastr.css'
import Header from './components/routes/Header'
import Main from './components/routes/Main'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Header />
                        <Main />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App
