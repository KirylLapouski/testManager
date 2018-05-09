import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, NavItem, NavLink } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import UserInfo from './UserInfo';
import { Link } from 'react-router-dom';
import Add from '@material-ui/icons/Add';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
class NavBarCustom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false,
            menu:null
        }

        //this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this)
    };

    handleClick() {
        this.setState({
            collapse: !this.state.collapse
        })
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    handleMenuClick(event){
        this.setState({ menu: event.currentTarget });
    }
    handleMenuClose(){
        this.setState({ menu: null });
      };
    render() {
        var {menu} = this.state;
        return (
            <Router>
                <Navbar color="indigo" dark expand="md" scrolling>
                    <NavbarBrand>
                        <strong>NavBar</strong>
                    </NavbarBrand>
                    <NavbarNav left>
                        <NavItem>
                            <NavLink to="/cources">Home</NavLink>
                        </NavItem>
                    </NavbarNav>
                    <NavbarNav right>
                        <NavItem style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Button color="primary" style={{ color: "white" }} aria-label="add" aria-owns={menu ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleMenuClick}>
                                <Add style={{ width: "30px", height: "30px" }} />
                            </Button>
                            <Menu id="simple-menu" anchorEl={menu} open={Boolean(menu)} style={{display:"relative",top:"40px"}} onClose={this.handleMenuClose}>
                                <MenuItem onClick={this.handleClose}>Присоединиться</MenuItem>
                                <MenuItem onClick={this.handleClose}>Создать курс</MenuItem>
                            </Menu>
                        </NavItem>
                        <NavItem>
                            <UserInfo />
                        </NavItem >
                    </NavbarNav>
                    {!this.state.isWideEnough && <NavbarToggler onClick={this.handleClick} />}
                </Navbar>
            </Router>);
    }
}

export default NavBarCustom; 