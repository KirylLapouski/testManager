import React from 'react'
import LoginIn from './LoginIn'
import toastr from 'toastr'
import { withRouter } from 'react-router-dom'
import LoadingIndicator from '../decorators/LoadingIndicator'
import PropTypes from 'prop-types'
import { loginUser } from '../../redux/AC/users'
import { connect } from 'react-redux'
import mediator from '../../mediator/mediator'
toastr.options.closeButton = true
class LoginInContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mail: '',
            password: ''
        }
    }

    onChangeHandler = (e) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    //TODO: rewrite on reducers
    onSubmitHandler = (e) => {
        e.preventDefault()

        let res = mediator.publish('LOGIN', this.state.mail, this.state.password)
        Promise.all(res)
            .then((values) => {
                let userInfo = values.filter(value => {
                    if (value && (value.type === 'USER_INFO'))
                        return true
                })[0].payload

                this.props.toggleLoading()
                if (userInfo)
                    this.props.history.push(`/cources/${userInfo.id}`)
            })
        this.props.toggleLoading()
    }

    render() {
        return <LoginIn
            onSubmitHandler={this.onSubmitHandler}
            onChangeHandler={this.onChangeHandler}
            {...this.state}
            {...this.props} />
    }
}
//TODO: show in propTypes props by withRoutes?

LoginInContainer.propTypes = {
    loading: PropTypes.bool,
    toggleLoading: PropTypes.func,
    // redux
    loginUser: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser(email, password) {
            return dispatch(loginUser(email, password))
        }
    }
}
export default withRouter(LoadingIndicator(connect(null, mapDispatchToProps)(LoginInContainer)))
