import React from 'react'
import PropTypes from 'prop-types'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact'
import { connect } from 'react-redux'
import { getUserById } from '../redux/AC/users'
import Menu, { MenuItem } from 'material-ui/Menu'
import Button from 'material-ui/Button'
import { withRouter } from 'react-router-dom'

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: false
        }

        this.toggle = this.toggle.bind(this)
    }

    componentWillMount() {
        if (this.props.userId)
            this.props.getUser(this.props.userId)
    }

    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }))
    }

    handleMenuClick = (event) => {
        this.setState({ menu: event.currentTarget })
    }
    handleMenuClose = () => {
        this.setState({ menu: null })
    }
    goToUrl = (url) => () => {
        this.props.history.push(url)
    }
    render() {
        return (<div style={Object.assign({}, { display: 'inline-block' }, this.props.style)}>
            <Button color="primary" aria-label="add" onClick={this.handleMenuClick}>
                <img width="50px" height="50px" style={{ backgroundColor: 'white' }} src={this.props.imageSrc || 'https://globalblueproject.org/wp-content/uploads/2016/07/blank-profile-picture.png'} />
            </Button>
            {this.props.disabled || <Menu open={Boolean(this.state.menu)} style={{ display: 'relative', top: '40px' }} onClose={this.handleMenuClose}>
                <MenuItem onClick={this.goToUrl('/profile')}>Profile</MenuItem>
                <MenuItem onClick={this.goToUrl(`/cources/${this.props.userId}`)}>My Courses</MenuItem>
            </Menu>}
        </div>
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
    style: {}
}

const mapStateToProps = (state, ownProps) => {
    var imageSrc
    if (ownProps.userId){
        imageSrc = state.users[ownProps.userId] && state.users[ownProps.userId].imageUrl
    }
    return {
        imageSrc
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser(userId) {
            dispatch(getUserById(userId))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo))