import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, NavItem, NavLink } from 'mdbreact';
import UserInfo from './UserInfo';
import { Link } from 'react-router-dom';
import Add from '@material-ui/icons/Add';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import SimpleModal from './Modal.jsx'
import AttachToCourseModal from './AttachToCourseModal'
import { connect } from "react-redux";
import PropTypes from "prop-types";
class NavBarCustom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false,
            menu: null,
            open: false,
            attachCourseModalOpened: false
        }

        this.toggle = this.toggle.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
    };

    handleModalOpen = (modalName) => {
        this.setState({ [modalName]: true });
        this.handleMenuClose()
    };

    handleModalClose = (modalName) => {
        
        this.setState({ [modalName]: false });
        this.handleMenuClose()
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
    handleMenuClick(event) {
        this.setState({ menu: event.currentTarget });
    }
    handleMenuClose() {
        this.setState({ menu: null });
    };

    handle = () => {
        this.handleMenuClose()
        this.handleModalOpen()
    }

    render() {
        var { menu } = this.state;
        return (
            <Navbar color="indigo" dark expand="md" scrolling>
                <NavbarBrand>
                    <strong><Link to='/'>Home</Link></strong>
                </NavbarBrand>
                <NavbarNav left>
                    <NavItem>
                        <NavLink to={`/cources/${this.props.userId}`}>Мои курсы</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/profile">Профиль</NavLink>
                    </NavItem>
                </NavbarNav>
                <NavbarNav right>
                    <NavItem style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Button color="primary" style={{ color: "white" }} aria-label="add" aria-owns={menu ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleMenuClick}>
                            <Add style={{ width: "30px", height: "30px" }} />
                        </Button>
                        <Menu id="simple-menu" anchorEl={menu} open={Boolean(menu)} style={{ display: "relative", top: "40px" }} onClose={this.handleMenuClose}>
                            <MenuItem onClick={this.handleModalOpen.bind(this,'attachCourseModalOpened')}>Присоединиться</MenuItem>
                            <MenuItem onClick={this.state.open ? this.handleModalClose : this.handleModalOpen.bind(this,'open')}>Создать курс</MenuItem>
                        </Menu>
                    </NavItem>
                    <NavItem>
                        <UserInfo userId={this.props.userId} />
                    </NavItem >
                </NavbarNav>
                <SimpleModal open={this.state.open} handleClose={this.handleModalClose.bind(this, 'open')} />
                <AttachToCourseModal open={this.state.attachCourseModalOpened} handleClose={this.handleModalClose.bind(this, 'attachCourseModalOpened')} />
                {!this.state.isWideEnough && <NavbarToggler onClick={this.handleClick} />}
            </Navbar>
       );
    }
}

NavBarCustom.propTypes = {
    //redux
    userId: PropTypes.number
} 

const mapStateToProps = state =>{
    return {
        userId: state.users.loggedIn && state.users.loggedIn.id
    }
}

export default connect(mapStateToProps)(NavBarCustom); 
