import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        }

        this.toggle = this.toggle.bind(this);
    }

    static defaultProps = {
        disabled: false,
        style:{}
    }

    static propTypes = {
        disabled: PropTypes.bool,
        style: PropTypes.object
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    getDropdown() {
        return (<DropdownMenu>
            <DropdownItem href="#">Action</DropdownItem>
            <DropdownItem href="#">Action 2</DropdownItem>
            <DropdownItem href="#">Action 3</DropdownItem>
            <DropdownItem href="#">Action 4</DropdownItem>
            <DropdownItem href="#">Action 5</DropdownItem>
        </DropdownMenu>)
    }
    render() {
        var dropdown = this.disabled ? null : this.getDropdown();

        return (
            <Dropdown style={this.props.style} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle style={{ padding: "0px" }}>
                    <img width="50px" height="50px" src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" />
                </DropdownToggle>
                {dropdown}
            </Dropdown>
        )
    }
}

export default UserInfo;