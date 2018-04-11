import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import UserInfo from './UserInfo';
class NavBarCustom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
        }
    };

    render() {
        return (
            <Router>
                <Navbar>
                    <NavbarBrand>
                        <strong>NavBar</strong>
                    </NavbarBrand>
                    {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
                    <Collapse isOpen={this.state.collapse} navbar />
                    <NavbarNav left>
                        <NavItem>
                            <NavLink to="#">Home</NavLink>
                        </NavItem>
                    </NavbarNav>
                    <NavbarNav right>
                        <NavItem>
                            <UserInfo />
                        </NavItem >
                    </NavbarNav>
                </Navbar>
            </Router>);
    }
}

export default NavBarCustom; 