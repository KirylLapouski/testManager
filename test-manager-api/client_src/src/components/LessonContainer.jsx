import React from 'react'
import Lesson from './Lesson'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadLessons } from '../redux/AC/lessons'
import Paginator from './Paginator'
class LessonContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            listNumber: 1
        }
    }
    componentWillMount() {
        this.props.getLessons(this.props.courseId)
    }
    handlePaginatorClick = paginatorPos =>{
        this.setState({
            listNumber:paginatorPos
        })
    }
    render() {
        const LESSONS_IN_LIST = 10;
        if (this.props.lessons) {
            var lessons = this.props.lessons.slice((this.state.listNumber-1)*LESSONS_IN_LIST, this.state.listNumber*LESSONS_IN_LIST).map((value, index, array) => {
                return (<Lesson id={value.id} title={value.title} description={value.description} />)
            })
        }


        return (
            <div className="container" style={{ marginTop: '20px', maxWidth: '800px' }}>
                {lessons}
                <Paginator length={Math.ceil(this.props.lessons.length/LESSONS_IN_LIST)} onClick={this.handlePaginatorClick}/>
            </div>
        )
    }
}

LessonContainer.propTypes = {
    lessons: PropTypes.arrayOf({
        id: PropTypes.number,
        title: PropTypes.string
    }),
    getLessons: PropTypes.func,
    courseId: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
    var res = []
    for (var key in state.lessons) {
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
export default connect(mapStateToProps, mapDispatchToProps)(LessonContainer)