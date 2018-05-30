import React from 'react'
import PropTypes from 'prop-types'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact'
import { connect } from 'react-redux'
class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false
        }

        this.toggle = this.toggle.bind(this)
    }



    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    getDropdown() {
        return (<DropdownMenu>
            {/* TODO: Link error */}
            <DropdownItem ><Link to="/profile">Profile</Link></DropdownItem>
            <DropdownItem ><Link to='/cources'>My Courses</Link></DropdownItem>
        </DropdownMenu>)
    }
    render() {
        var dropdown = this.props.disabled ? null : this.getDropdown()

        return (
            <Dropdown style={this.props.style} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle style={{ padding: '0px' }}>
                    <img width="50px" height="50px" src={this.props.imageSrc} />
                </DropdownToggle>
                {dropdown}
            </Dropdown>
        )
    }
}
UserInfo.propTypes = {
    disabled: PropTypes.bool,
    style: PropTypes.object,
    imageSrc: PropTypes.string
}

UserInfo.defaultProps = {
    disabled: false,
    style:{}
}

const mapStateToProps = (state)=>{
    return {
        imageSrc: state.users.loggedIn?state.users.loggedIn.imageUrl:'https://globalblueproject.org/wp-content/uploads/2016/07/blank-profile-picture.png'
    }
}

export default connect(mapStateToProps)(UserInfo)