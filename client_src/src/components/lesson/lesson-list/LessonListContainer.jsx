import React from "react";
import LessonList from "./LessonList";
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { loadLessons } from '../../../redux/AC/lessons'
class LessonListContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listNumber: 1
        }
    }
    componentWillMount() {
        this.props.getLessons(this.props.courseId)
    }
    handlePaginatorClick = paginatorPos => {
        this.setState({
            listNumber: paginatorPos
        })
    }
    render() {
        return <LessonList handlePaginatorClick={this.handlePaginatorClick} {...this.props} {...this.state} />
    }
}

const mapStateToProps = (state, ownProps) => {
    let res = []
    for (let key in state.lessons) {
        if (Number(ownProps.courseId) === state.lessons[key].disciplineId)
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

LessonListContainer.propTypes = {
    courseId: PropTypes.number,
    lessonsOwner: PropTypes.object,
    loggedUserId: PropTypes.number,
    //redux
    lessons: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string
    })),
    getLessons: PropTypes.func
}


export default connect(mapStateToProps, mapDispatchToProps)(LessonListContainer)
