import React from 'react';
import {Route,Switch,BrowserRouter as Router} from 'react-router-dom';
import NavBarCustom from '../NavBarCustom';
class Header extends React.Component{
    render(){
        return (
            <Router >
                <Switch>
                    <Route path="/" exact render={()=>{ return null}}/>  
                    <Route path="/signUp" exact render={()=>{ return null}}/>
                    <Route path="/" component={NavBarCustom} />           
                </Switch>
            </Router>
        )
    }
}

export default Header