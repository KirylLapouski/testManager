import React from 'react'
import { connect } from 'react-redux'
import CourseList from './CourseList'
import { loadCoursesForUser } from '../../redux/AC/courses'
import { assignloggedInUser } from '../../redux/AC/users'

class CourseContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpened: false,
        }
    }

    componentDidMount() {
        this.props.getCourses(this.props.match.params.userId)
        this.props.assignloggedInUser()
    }


    handleModalOpen = (modalName) => {
        this.setState({ [modalName]: true });
    };

    handleModalClose = (modalName) => {
        this.setState({ [modalName]: false });
    };

    render() {
        return <CourseList handleModalClose={this.handleModalClose} handleModalOpen={this.handleModalOpen} {...this.state} {...this.props} />
    }
}
const mapStateToProps = state => {
    var res = []
    for (var key in state.courses) {
        res.push(state.courses[key])
    }
    return { courses: res }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    var result = {}

    result.getCourses = (userId) => { dispatch(loadCoursesForUser(userId)) }
    result.assignloggedInUser = ownProps.match.params.userId ? () => { dispatch(assignloggedInUser(ownProps.match.params.userId)) } : () => { }
    return result

}
export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer)
