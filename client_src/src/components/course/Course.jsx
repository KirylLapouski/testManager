import React from "react";
import PropTypes from "prop-types";
import UserInfoContainer from "../user/user-info/UserInfoContainer";
import { Link } from "react-router-dom";
import Grow from "@material-ui/core/Grow";
import DeleteIcon from "@material-ui/icons/Delete";
import OutIcon from "@material-ui/icons/PowerSettingsNew";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import {
    untieUserFromCourseAndDeleteCourse,
    untieUserFromCourse
} from "../../redux/AC/users";
import { connect } from "react-redux";
import { getCourseOwner } from "../../redux/AC/courses";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from '@material-ui/core/styles'
const styles = {
    courseContainer: { height: "400px", width: "270px", color: "white", marginBottom: "20px", backgroundSize: "cover", },
    courseHeader: { background: "rgba(0,0,0,0.1)", overflow: "hidden", marginBottom: "290px" },
    openCourse: { color: "white", float: "right", marginTop: "5px" }
}
class Course extends React.Component {
    handleOpenClick = () => {
        this.props.history.push(`/${this.props.id}/lessons`);
    };
    handleDeleteClick = () => {
        this.props.untieFromCourseOwner(this.props.loggedUserId);
    };

    handleUntieClick = () => {
        this.props.untieFromCourse(this.props.loggedUserId);
    };
    componentWillMount() {
        this.props.getCourseOwner(this.props.id);
    }
    render() {
        let { loggedUserId, ownerId, backgroundUrl, id, title, classes } = this.props;
        return (
            <Grow timeout={800} in={true}>
                <div className={"z-depth-2 " + classes.courseContainer} style={{ backgroundImage: `url(${backgroundUrl})` }}>
                    <div className={classes.courseHeader}>
                        <UserInfoContainer disabled={true} userId={ownerId} style={{ float: "left" }} />
                        <Link to={"/" + id + "/lessons"}>
                            {" "}
                            {title}
                        </Link>
                    </div>

                    {loggedUserId === ownerId ? (
                        <Tooltip title="Удалить курс" placement="bottom">
                            <Button onClick={this.handleDeleteClick} style={{ float: "left" }}>
                                <DeleteIcon style={{ color: "white", marginTop: "5px" }} />
                            </Button>
                        </Tooltip>
                    ) : (
                            <Tooltip title="Покинуть курс" placement="bottom">
                                <Button onClick={this.handleUntieClick} style={{ float: "left" }}>
                                    <OutIcon style={{ color: "white" }} />
                                </Button>
                            </Tooltip>
                        )}
                    <Button onClick={this.handleOpenClick} className={classes.openCourse}>
                        Открыть
                    </Button>
                </div>
            </Grow>
        );
    }
}

Course.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    backgroundUrl: PropTypes.string,
    //redux
    untieFromCourse: PropTypes.func,
    untieFromCourseOwner: PropTypes.func,
    getCourseOwner: PropTypes.func,
    loggedUserId: PropTypes.number,
    ownerId: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
    return {
        loggedUserId: state.users.loggedIn && state.users.loggedIn.id,
        ownerId:
            state.courses[ownProps.id] && state.courses[ownProps.id].ownerId
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        untieFromCourseOwner(userId) {
            dispatch(untieUserFromCourseAndDeleteCourse(userId, ownProps.id));
        },
        getCourseOwner(courseId) {
            dispatch(getCourseOwner(courseId));
        },
        untieFromCourse(userId) {
            dispatch(untieUserFromCourse(userId, ownProps.id));
        }
    };
};
export default withStyles(styles)(withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Course)
));
