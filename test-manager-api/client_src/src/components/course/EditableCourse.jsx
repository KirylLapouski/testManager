import React from 'react';
import CourseHeader from './CourseHeader';
import { withStyles } from 'material-ui/styles';
import UserInfo from '../UserInfo';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import CourseModal from './CourseModal';
import LessonContainer from '../LessonContainer';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
class EditableCourse extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpened: false
        }
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
    render() {
        return <div>
            <CourseHeader backgroundSrc='https://lh6.googleusercontent.com/-691E4HHlPjM/VN0ohuHpXiI/AAAAAAAAASM/OsvrdNM5yZw/w984-h209-no/06_bubbles.jpg' name='test1' teacherName="Test" teacherLastName="Test">
                <UserInfo disabled={true} userId={this.props.userId}/>
            </CourseHeader>

            <Button onClick={this.toggleModal} variant="fab" color="primary" aria-label="add" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <AddIcon />
            </Button>
            {/* TODO: How to deliver route to child? */}
            <LessonContainer courseId={this.props.match.params.courseId}/>
            <CourseModal open={this.state.modalOpened} courseId={this.props.match.params.courseId} handleClose={this.handleModalClose}/>
        </div>
    }
}

EditableCourse.propTypes = {
    //redux
    userId: PropTypes.number
}
const mapStateToProps = state =>{
    return {
        userId: state.users.loggedIn && state.users.loggedIn.id
    }
}
export default connect(mapStateToProps)(EditableCourse)