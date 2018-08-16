import React from "react";
import { connect } from "react-redux";
import CourseList from "./CourseList";
import { loadCoursesForUser } from "../../redux/AC/courses";
import { addloggedInUser } from "../../redux/AC/users";

class CourseListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpened: false
        };
    }

    componentDidMount() {
        this.props.getCourses(this.props.match.params.userId);
        this.props.addloggedInUser();
    }

    handleModalOpen = modalName => {
        this.setState({ [modalName]: true });
    };

    handleModalClose = modalName => {
        this.setState({ [modalName]: false });
    };

    render() {
        return (
            <CourseList
                handleModalClose={this.handleModalClose}
                handleModalOpen={this.handleModalOpen}
                {...this.state}
                {...this.props}
            />
        );
    }
}
const mapStateToProps = state => {
    let res = [];
    for (let key in state.courses) {
        res.push(state.courses[key]);
    }
    return { courses: res };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    let result = {};

    result.getCourses = userId => {
        dispatch(loadCoursesForUser(userId));
    };
    result.addloggedInUser = ownProps.match.params.userId
        ? () => {
              dispatch(addloggedInUser(ownProps.match.params.userId));
          }
        : () => {};
    return result;
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseListContainer);
