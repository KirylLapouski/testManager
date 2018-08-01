import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import UserInfoContainer from '../user/user-info/UserInfoContainer';
import { Link } from 'react-router-dom';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from '@material-ui/core/IconButton';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NewCourseModal from '../modal/modal-total/NewCourseModal'
import AttachToCourseModal from '../modal/modal-total/AttachToCourseModal'
import Hidden from '@material-ui/core/Hidden';
import NavSidebar from "./NavSidebar";
class NavBarCustom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: null,
            sideBarOpened: false,
            open: false,
            attachCourseModalOpened: false
        }

    };

    handleModalOpen = (modalName) => {
        this.setState({ [modalName]: true });
        this.handleMenuClose()
    };

    handleModalClose = (modalName) => {

        this.setState({ [modalName]: false });
        this.handleMenuClose()
    };
    handleMenuClick = (event) => {
        this.setState({ menu: event.currentTarget });
    }
    handleMenuClose = () => {
        this.setState({ menu: null });
    };

    handle = () => {
        this.handleMenuClose()
        this.handleModalOpen()
    }
    handleSideBarButtonClick = (e) => {
        this.setState((prevState) => {
            return { sideBarOpened: !prevState.sideBarOpened }
        })
    }

    render() {
        var { menu, open, attachCourseModalOpened } = this.state;
        var { userId } = this.props
        return (<AppBar position="static">
            <Toolbar>
                <IconButton onClick={this.handleSideBarButtonClick} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Hidden only={["xs"]}>
                    <Link style={{ marginLeft: '20px' }} to={`/cources/${userId}`}>Мои курсы</Link>
                    <Link style={{ marginLeft: '20px' }} to="/profile">Профиль</Link>
                </Hidden>

                <div style={{ flexGrow: 1000 }}>
                </div>

                <Button color="primary" style={{ color: "white" }} aria-label="add" aria-owns={menu ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleMenuClick}>
                    <Add style={{ width: "30px", height: "30px" }} />
                </Button>
                <Menu id="simple-menu" anchorEl={menu} open={!!menu} style={{ display: "relative", top: "40px" }} onClose={this.handleMenuClose}>
                    <MenuItem onClick={this.handleModalOpen.bind(this, 'attachCourseModalOpened')}>Присоединиться</MenuItem>
                    <MenuItem onClick={open ? this.handleModalClose : this.handleModalOpen.bind(this, 'open')}>Создать курс</MenuItem>
                </Menu>
                <UserInfoContainer userId={this.props.userId} />

            </Toolbar>
            <NewCourseModal open={open} handleClose={this.handleModalClose.bind(this, 'open')} />
            <AttachToCourseModal open={attachCourseModalOpened} handleClose={this.handleModalClose.bind(this, 'attachCourseModalOpened')} />
            {this.state.sideBarOpened && <NavSidebar userId={userId} onClose={this.handleSideBarButtonClick} />}
        </AppBar>
            // <Navbar color="indigo" dark expand="md" scrolling>
            //     <NavbarBrand>
            //         <Link to='/'><strong>Home</strong></Link>
            //     </NavbarBrand>
            //     <NavbarNav left>
            //         <NavItem>
            //             <NavLink to={`/cources/${this.props.userId}`}>Мои курсы</NavLink>
            //         </NavItem>
            //         <NavItem>
            //             <NavLink to="/profile">Профиль</NavLink>
            //         </NavItem>
            //     </NavbarNav>
            //     <NavbarNav right>
            //         <NavItem style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            //             <Button color="primary" style={{ color: "white" }} aria-label="add" aria-owns={menu ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleMenuClick}>
            //                 <Add style={{ width: "30px", height: "30px" }} />
            //             </Button>
            //             <Menu id="simple-menu" anchorEl={menu} open={Boolean(menu)} style={{ display: "relative", top: "40px" }} onClose={this.handleMenuClose}>
            //                 <MenuItem onClick={this.handleModalOpen.bind(this, 'attachCourseModalOpened')}>Присоединиться</MenuItem>
            //                 <MenuItem onClick={this.state.open ? this.handleModalClose : this.handleModalOpen.bind(this, 'open')}>Создать курс</MenuItem>
            //             </Menu>
            //         </NavItem>
            //         <NavItem>
            //             <UserInfoContainer userId={this.props.userId} />
            //         </NavItem >
            //     </NavbarNav>
            //     <NewCourseModal open={this.state.open} handleClose={this.handleModalClose.bind(this, 'open')} />
            //     <AttachToCourseModal open={this.state.attachCourseModalOpened} handleClose={this.handleModalClose.bind(this, 'attachCourseModalOpened')} />
            //     {!this.state.isWideEnough && <NavbarToggler onClick={this.handleClick} />}
            // </Navbar>
        );
    }
}

NavBarCustom.propTypes = {
    //redux
    userId: PropTypes.number
}

const mapStateToProps = state => {
    return {
        userId: state.users.loggedIn && state.users.loggedIn.id
    }
}

export default connect(mapStateToProps)(NavBarCustom);
