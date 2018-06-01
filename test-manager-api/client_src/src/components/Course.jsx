import React from 'react'
import PropTypes from 'prop-types'
import UserInfo from './UserInfo'
import { Link } from 'react-router-dom'
import Grow from '@material-ui/core/Grow'
import Divider from '@material-ui/core/Divider'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'
import {untieUserFromCourse} from '../redux/AC/users'
import { connect } from "react-redux";
class Course extends React.Component {
    handleOpenClick = ()=>{
        this.props.history.push(`/${this.props.id}/lessons`)
    }
    handleUntieClick = ()=>{
        this.props.untieFromCourse(this.props.loggedUserId)
    }
    render() {
        return (
            <Grow timeout={800} in={true}>
                <div className="z-depth-2" style={{ height: '400px', width: '270px', color: 'white',marginBottom:'20px', backgroundImage: 'url("https://lh4.googleusercontent.com/-64uhpsHBEZw/VMqrG_6wowI/AAAAAAAAAIE/_Pw_QoP0opU/w1005-h214-no/123_rainbowtriangle_teal.jpg")' }}>
                    <div style={{ background: 'rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                        <UserInfo disabled={true} style={{ float: 'right' }} />
                        <Link to={'/' + this.props.id + '/lessons'}> {this.props.title}</Link>
                    </div>
                    <Divider inset={true} style={{ marginLeft:'0px',marginTop:'290px',backgroundColor:'rgba(0,0,0,0)',  width: '100%'}} />
                    <Button onClick={this.handleUntieClick} style={{float:'left'}}><DeleteIcon style={{color:'white',marginTop:'5px'}}/></Button>
                    <Button onClick={this.handleOpenClick} style={{color:'white',float:'right',marginTop:'5px'}}>Открыть</Button>
                </div>
            </Grow>
        )
    }
}

Course.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    //redux
    untieFromCourse: PropTypes.func,
    loggedUserId: PropTypes.number
}

const mapStateToProps = state=>{
    return {
        loggedUserId: state.users.loggedIn && state.users.loggedIn.id,
    }
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    return{
        untieFromCourse(userId){
            dispatch(untieUserFromCourse(userId,ownProps.id))
        }
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Course))