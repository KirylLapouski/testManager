import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBarCustom from '../navbar/NavBarCustom'
class Header extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact render={() => { return null }} />
                <Route path="/signUp" exact render={() => { return null }} />
                <Route path="/" component={NavBarCustom} />
            </Switch>
        )
    }
}

export default Header
