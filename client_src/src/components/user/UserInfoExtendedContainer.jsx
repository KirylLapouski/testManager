import React from 'react'
import UserInfoExtended from './UserInfoExtended'
import PropTypes from 'prop-types'
import CourseResultContainer from "../course/course-page/CourseResultContainer";

class UserInfoExtendedContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showChart: false
        }
    }

    toggleShowChartClick = () => {
        this.setState((prevState) => {
            return { showChart: !prevState.showChart }
        })
    }
    render() {
        return <React.Fragment>
            <UserInfoExtended toggleOpenChart={this.toggleShowChartClick} {...this.props} />
            {this.state.showChart && <CourseResultContainer userId={this.props.userId} />}
        </React.Fragment>
    }
}

UserInfoExtendedContainer.propTypes = {
    firstName: PropTypes.string,
    secondName: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    toggleOpenChart: PropTypes.func,
    buttonClicked: PropTypes.bool
}

export default UserInfoExtendedContainer
