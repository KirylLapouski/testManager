import React from 'react'
import Lesson from '../LessonContainer'
import PropTypes from 'prop-types'
import Paginator from '../../Paginator'
class LessonList extends React.Component {

    render() {
        const LESSONS_IN_LIST = 10;
        let lessons
        if (this.props.lessons) {
            lessons = this.props.lessons.slice((this.props.listNumber - 1) * LESSONS_IN_LIST, this.props.listNumber * LESSONS_IN_LIST).map(value => {
                return (<Lesson id={value.id} key={value.id} loggedUserId={this.props.loggedUserId} lessonOwner={this.props.lessonsOwner} title={value.title} description={value.description} />)
            })
        }
        return (
            <div style={{ marginTop: '20px', width: '800px', marginLeft: '30px' }}>
                {lessons}
                <Paginator length={Math.ceil(this.props.lessons.length / LESSONS_IN_LIST)} onClick={this.props.handlePaginatorClick} />
            </div>
        )
    }
}

LessonList.propTypes = {
    courseId: PropTypes.number,
    lessonsOwner: PropTypes.object,
    loggedUserId: PropTypes.number,
    listNumber: PropTypes.number,
    lessons: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string
    })),
    getLessons: PropTypes.func,
    handlePaginatorClick: PropTypes.func
}


export default LessonList
