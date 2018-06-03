import React from 'react'
import Course from './Course'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadCourses, loadCoursesForUser } from '../redux/AC/courses'
import { assignloggedInUser } from '../redux/AC/users'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import SimpleModal from './Modal.jsx'
class CourseContainer extends React.Component {

    state = {
        modalOpened: false,
    }
    componentWillMount() {
        this.props.getCourses()
        this.props.assignloggedInUser()
    }

    handleModalOpen = (modalName) => {
        this.setState({ [modalName]: true });
    };

    handleModalClose = (modalName) => {
        this.setState({ [modalName]: false });
    };

    render() {
        var { courses } = this.props
        if (courses) {
            var courses = courses.map((value) => {
                return (<div key={value.id} className="col-xl-3 col-lg-4 col-md-6"><Course id={value.id} title={value.title} /></div>)
            })
        }

        return (
            <div className="container-fluid" style={{ maxWidth: '1300px', marginTop: '30px' }}>
                <div className="row">
                    {courses}
                    <Button onClick={this.handleModalOpen.bind(this, 'modalOpened')} variant="fab" color="primary" aria-label="add" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '2' }}>
                        <AddIcon />
                    </Button>
                    <SimpleModal open={this.state.modalOpened} handleClose={this.handleModalClose.bind(this, 'modalOpened')} />
                </div>
            </div>
        )
    }
}

CourseContainer.propTypes = {
    recordsInRows: PropTypes.number,
    //redux
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
    return { courses: res }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    var result = {}

    result.getCourses = ownProps.match.params.userId ? () => { dispatch(loadCoursesForUser(ownProps.match.params.userId)) } : () => { dispatch(loadCourses()) }
    result.assignloggedInUser = ownProps.match.params.userId ? () => { dispatch(assignloggedInUser(ownProps.match.params.userId)) } : () => { }
    return result
}
export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer)