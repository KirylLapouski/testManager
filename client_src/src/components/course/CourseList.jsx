import React from 'react'
import Course from './Course'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import NewCourseModal from '../modal/modal-total/NewCourseModal'
//TODO: can rewrite on function
class CourseList extends React.Component {
    render() {
        let { courses,handleModalClose ,modalOpened,handleModalOpen} = this.props
        if (courses) {
            courses = courses.map((value) => {
                return (<div key={value.id} className="col-xl-3 col-lg-4 col-md-6"><Course {...value} /></div>)
            })
        }

        return (
            <div className="container-fluid" style={{ maxWidth: '1300px', marginTop: '30px' }}>
                <div className="row">
                    {courses}
                    <Button onClick={handleModalOpen} variant="fab" color="primary" aria-label="add" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '2' }}>
                        <AddIcon />
                    </Button>
                    {/* TODO: why bind works? */}
                    <NewCourseModal open={modalOpened} handleClose={handleModalClose} />
                </div>
            </div>
        )
    }
}

CourseList.propTypes = {
    recordsInRows: PropTypes.number,
    modalOpened: PropTypes.bool,
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired
        })
    ),
    handleModalOpen: PropTypes.func,
    handleModalClose: PropTypes.func
}
CourseList.defaultProps = {
    recordsInRows: 4
}

export default CourseList
