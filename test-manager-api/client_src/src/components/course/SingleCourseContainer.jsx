import React from 'react'
import {connect} from 'react-redux'
import EditableCourse from './EditableCourse'
import {getCourseOwner} from '../../redux/AC/courses'
import {withRouter} from 'react-router-dom'
import PropTypes from "prop-types";
class SingleCourseContainer extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            modalOpened: false
        }
    }

    componentDidMount(){
        this.props.getCourseOwner(this.props.match.params.courseId)
    }
    toggleModal = () => {
        this.setState((prevState)=>{
            return {
                modalOpened:!prevState.modalOpened
            }
        })
    }
    handleModalClose = ()=>{
        this.setState({
            modalOpened:false
        })
    }
    render(){
        return <EditableCourse
                    toggleModal={this.toggleModal}
                    handleModalClose={this.handleModalClose}
                    {...this.props}
                    {...this.state}/>
    }
}


const mapStateToProps = (state, ownProps) =>{
    return {
        loggedUserId: state.users.loggedIn && state.users.loggedIn.id,
        ownerUser: state.users[state.courses[ownProps.match.params.courseId].ownerId],
        course: state.courses[ownProps.match.params.courseId] 
    }
}

const mapDispatchToProps = (dispatch,ownProps)=>{
    return{
        getCourseOwner(courseId){
            dispatch(getCourseOwner(courseId))
        }
    }
}

SingleCourseContainer.propTypes = {
    ownerUser: PropTypes.shape({
        id: PropTypes.string,
        firstName: PropTypes.string,
        secondName: PropTypes.string
    }),
    course: PropTypes.shape({
        title: PropTypes.string,
        firstName: PropTypes.string,
        secondName: PropTypes.string,
        secretWord: PropTypes.string
    }),
    loggedUserId: PropTypes.number,
    getCourseOwner: PropTypes.func

}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SingleCourseContainer))
