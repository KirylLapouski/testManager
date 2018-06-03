import React from 'react'
import PropTypes from 'prop-types'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact'
import { connect } from 'react-redux'
import { getUserById } from '../redux/AC/users'
import Menu, { MenuItem } from 'material-ui/Menu'
import Button from 'material-ui/Button'
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie'
class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: false
        }
    }

    componentWillMount() {
        if (this.props.userId)
            this.props.getUser(this.props.userId)
        
    }

    handleMenuClick = event => {
        this.setState({ menu: event.currentTarget });
    };
    handleMenuClose = () => {
        this.setState({ menu: null })
    }
    goToUrl = (url) => () => {
        this.props.history.push(url)
    }
    logOut = ()=>{
        var cookies = new Cookies()
        cookies.remove('loopbackToken',{path:'/'})
        cookies.remove('yandexToken',{path:'/'})
        
        window.localStorage.setItem('redux','')

        this.props.history.push(`/`)
    }
    render() {
        return (<div style={Object.assign({}, { display: 'inline-block', position: 'relative' }, this.props.style)}>
                    <Button color="primary" aria-owns={this.state.menu ? 'simple-menu2' : null} aria-haspopup="true" onClick={this.handleMenuClick}>
                        <img width="50px" height="50px" style={{ backgroundColor: 'white' }} src={this.props.imageSrc || 'https://globalblueproject.org/wp-content/uploads/2016/07/blank-profile-picture.png'} />
                    </Button>
                {this.props.disabled || 
                        <Menu open={Boolean(this.state.menu)} id="simple-menu2" anchorEl={this.state.menu} style={{position:'absolute', top:'40px'}} onClose={this.handleMenuClose}>
                            <MenuItem onClick={this.goToUrl('/profile')}>Профиль</MenuItem>
                            <MenuItem onClick={this.goToUrl(`/cources/${this.props.userId}`)}>Мои курсы</MenuItem>
                            <hr/>
                            <MenuItem onClick={this.logOut}>Выйти</MenuItem>
                        </Menu>
                }
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
    if (ownProps.userId) {
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