import React from 'react';
import CourseHeader from './CourseHeader';
import {withStyles} from 'material-ui/styles';
import UserInfo from '../UserInfo';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';

class EditableCourse extends React.Component {
    render() {
        return <div>
            <CourseHeader backgroundSrc='https://lh6.googleusercontent.com/-691E4HHlPjM/VN0ohuHpXiI/AAAAAAAAASM/OsvrdNM5yZw/w984-h209-no/06_bubbles.jpg' name='test1' teacherName="Test" teacherLastName="Test">
                <UserInfo />
            </CourseHeader>
            <Button variant="fab" color="primary" aria-label="add" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <AddIcon />
            </Button>
        </div>
    }
}

export default EditableCourse