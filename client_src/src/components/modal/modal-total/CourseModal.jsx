import React from 'react'
import ModalBase from "../ModalBase";
import SingleTextField from '../modal-content/SingleTextField'
import { connect } from 'react-redux'
import { addLesson ,loadLessons} from '../../../redux/AC/lessons';
import PropTypes from 'prop-types';
class CourseModal extends React.Component {
    constructor(props){
        super(props)

        this.state ={
            lessonTitle:''
        }
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        this.props.addNewLesson(this.state.lessonTitle,this.props.courseId);
        this.props.handleClose();
    }
    onChangeHandler= (e)=> {
        var {value } = e.target;

        this.setState({
            lessonTitle: value
        });
    }
    render() {
        var {open,handleClose} = this.props
        return <ModalBase title={'Создать урок'} open={open} handleClose={handleClose}>
            <SingleTextField handleClose={handleClose} onChangeHandler={this.onChangeHandler} handleSubmit={this.handleSubmit}/>
        </ModalBase>
    }
}

CourseModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    addNewLesson: PropTypes.func,
    courseId: PropTypes.string
}
const mapDispatchToProps = dispatch => {
    return {
        addNewLesson(title,disciplineId) {
            dispatch(addLesson(title,disciplineId))
        },
        getLessons(){
            dispatch(loadLessons())
        }
    }
}

export default connect(null, mapDispatchToProps)(CourseModal)
