import React from 'react'
import ModalBase from "../ModalBase";
import SingleTextField from '../modal-content/SingleTextField'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {addCourse} from '../../../redux/AC/courses'
class NewCourseModal extends React.Component {
    constructor(props){
        super(props)

        this.state ={
            CourseTitle:''
        }
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        this.props.addCource(this.props.userId,this.state.CourseTitle)
        this.props.handleClose()
    }
    onChangeHandler= (e)=> {
        let {value } = e.target;

        this.setState({
            CourseTitle: value
        });
    }
    render() {
        let {open,handleClose} = this.props
        return <ModalBase title={'Создать курс'}  width='300px' minHeight="250px" open={open} handleClose={handleClose}>
            <SingleTextField handleClose={handleClose} onChangeHandler={this.onChangeHandler} handleSubmit={this.handleSubmit}/>
        </ModalBase>
    }
}

NewCourseModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    //redux
    userId: PropTypes.number,
    addCource: PropTypes.func
}
const mapStateToProps = (state) => {
    return {
        userId: state.users.loggedIn && state.users.loggedIn.id,
    }
}

const mapDispatchToProps = (dispatch)  =>{
    return{
        addCource(userId,title){
            dispatch(addCourse(userId,title))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCourseModal)
