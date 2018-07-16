import React from 'react'
import CourseResult from './CourseResult'
import { getUserTestsResultsForLesson } from '../../../redux/AC/users'
import { loadLessons } from '../../../redux/AC/lessons'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class CourseResultContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            testsOfCourseResult: [],
            titles: []
        }
    }
    componentDidMount() {
        var { userId, courseId } = this.props

        var lessons = loadLessons(courseId || this.props.match.params.courseId)(() => { })
        lessons
            .then(values => {
                return Promise.all(values.map(value => { return getUserTestsResultsForLesson(value.id, userId)(() => { }) }))
            })
            .then(values => {
                return values.map(value => {
                    return value.reduce((acc, value) => {
                        acc.summWeight += value.weight;
                        acc.rightWeight += value.isRightAnswered ? value.weight : 0
                        return acc
                    }, { summWeight: 0, rightWeight: 0 })
                }
                )
            })
            .then(values => {
                this.setState({
                    testsOfCourseResult: values.map(value => (value.rightWeight * 100) / value.summWeight)
                })
            })
        lessons.then(values =>
            this.setState({
                titles: values.map(({ title }) => title)
            })
        )
    }
    render() {
        return <CourseResult titles={this.state.titles} data={this.state.testsOfCourseResult} />
    }
}


CourseResultContainer.propTypes = {
    userId: PropTypes.number.isRequired,
    courseId: PropTypes.number,
}
export default withRouter(CourseResultContainer)
