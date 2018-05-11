import React from 'react'
import Course from './Course'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {loadCourses} from '../redux/AC/courses'
class CourseContainer extends React.Component {

    componentWillMount(){
        this.props.getCourses()
    }
    render() {
        var { courses } = this.props
        if (courses) {
            var courses = courses.map((value, index, array) => {
                return (<div key={value.id} className="col-xl-3 col-lg-4 col-md-6"><Course id={value.id} title={value.title} /></div>)
            })
        }

        return (
            <div className="z-depth-1 container-fluid" style={{ maxWidth: '1300px' }}>
                <div className="row">
                    {courses}
                </div>
            </div>
        )
    }
}

CourseContainer.propTypes = {
    recordsInRows: PropTypes.number,
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired
        })
    ),
    getCourses: PropTypes.func
}
CourseContainer.defaultProps = {
    recordsInRows: 4
}

const mapStateToProps = state => {
    var res = []
    for (var key in state.courses) {
        res.push(state.courses[key])
    }
    return {courses: res}
}

const mapDispatchToProps = dispatch =>{
    return {
        getCourses(){
            dispatch(loadCourses())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CourseContainer)