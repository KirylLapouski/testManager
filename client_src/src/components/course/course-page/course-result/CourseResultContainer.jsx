import React from 'react'
import CourseResult from './CourseResult'
import { getUserTestsResultsForLesson } from '../../../../redux/AC/users'
import { loadLessons } from '../../../../redux/AC/lessons'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
//TODO: redraw
class CourseResultContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            testsOfCourseResult: [],
            titles: [],
            redraw: false,
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.userId !== prevProps.userId) {
            //same as componentDidUpdate do
            var { userId, courseId } = this.props

            var lessons = loadLessons(courseId || this.props.match.params.courseId)(() => { })
            lessons
                .then(values => {
                    return Promise.all(values.map(value => { return getUserTestsResultsForLesson(value.id, userId)(() => { }) }))
                })
                .then(values => {
                    return values.map(value => {
                        if (value.includes(undefined)) {
                            return
                        }
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
                        testsOfCourseResult: values.map(value => value ? (value.rightWeight * 100) / value.summWeight : null)
                    })
                })
            lessons.then(values => {
                this.setState({
                    titles: values.map(({ title }) => title),
                    redraw: true
                })
            }
            )
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
                    if (value.includes(undefined)) {
                        return
                    }
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
                    testsOfCourseResult: values.map(value => value ? (value.rightWeight * 100) / value.summWeight : null)
                })
            })
        lessons.then(values =>
            this.setState({
                titles: values.map(({ title }) => title)
            })
        )
    }
    render() {
        return <CourseResult redraw={this.state.redraw} titles={this.state.titles} data={this.state.testsOfCourseResult} />
    }
}


CourseResultContainer.propTypes = {
    userId: PropTypes.number.isRequired,
    courseId: PropTypes.number,
}
export default withRouter(CourseResultContainer)