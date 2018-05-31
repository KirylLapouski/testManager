import React from 'react'
import PropTypes from 'prop-types'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact'
import { connect } from 'react-redux'
import {getUserById} from '../redux/AC/users'
class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false
        }

        this.toggle = this.toggle.bind(this)
    }

    componentWillMount(){
        if(this.props.userId)
            this.props.getUser(this.props.userId)
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
    userId: PropTypes.number,
    //redux
    imageSrc: PropTypes.string,
    getUser: PropTypes.func
}

UserInfo.defaultProps = {
    disabled: false,
    style:{}
}

const mapStateToProps = (state, ownProps)=>{
    var imageSrc
    if(ownProps.userId)
        imageSrc = state.users[ownProps.userId] && state.users[ownProps.userId].imageUrl
    if(!imageSrc)
        imageSrc = 'https://globalblueproject.org/wp-content/uploads/2016/07/blank-profile-picture.png'
    if(!ownProps.userId)
        imageSrc = state.users.loggedIn?state.users.loggedIn.imageUrl || 'https://globalblueproject.org/wp-content/uploads/2016/07/blank-profile-picture.png':'https://globalblueproject.org/wp-content/uploads/2016/07/blank-profile-picture.png'
    return {
        imageSrc
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        getUser(userId){
            dispatch(getUserById(userId))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserInfo)