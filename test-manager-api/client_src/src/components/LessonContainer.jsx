import React from 'react'
import Lesson from './Lesson'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { loadLessons } from '../redux/AC/lessons';
class LessonContainer extends React.Component {
    componentWillMount() {
        this.props.getLessons(this.props.match.params.courseId)
    }
    render() {
        if (this.props.lessons) {
            var lessons = this.props.lessons.map((value, index, array) => {
                return (<Lesson id={value.id} title={value.title} />)
            })
        }


        return (
            <div className="container" style={{ marginTop: "20px", maxWidth: "800px" }}>
                {lessons}
            </div>
        )
    }
}

LessonContainer.propTypes = {
    lessons: PropTypes.arrayOf({
        id: PropTypes.number,
        title: PropTypes.string
    }),
    getLessons: PropTypes.func
}

const mapStateToProps = (state,ownProps) => {
    var res = [];
    for (var key in state.lessons) {
        if(Number(ownProps.match.params.courseId) === state.lessons[key].disciplineId)
            res.push(state.lessons[key])
    }
    return { lessons: res }
}

const mapDispatchToProps = dispatch => {
    return {
        getLessons(disciplineID) {
            dispatch(loadLessons(disciplineID))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LessonContainer);