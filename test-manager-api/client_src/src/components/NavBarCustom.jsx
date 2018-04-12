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

        this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
    };

    onClick() {
        this.setState({
            collapse: !this.state.collapse
        })
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }
    render() {
        return (
            <Router>
                <Navbar color="indigo" dark expand="md" scrolling>
                    <NavbarBrand>
                        <strong>NavBar</strong>
                    </NavbarBrand>
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
                    {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
                </Navbar>
            </Router>);
    }
}

export default NavBarCustom; 