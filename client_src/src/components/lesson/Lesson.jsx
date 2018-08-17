import React from "react";
import UserInfoContainer from "../user/user-info/UserInfoContainer";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails
} from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TopicModal from "../modal/modal-total/TopicModal";
import TopicList from "./TopicListInLesson";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import Flag from "@material-ui/icons/Flag";
import Tooltip from "@material-ui/core/Tooltip";
class Lesson extends React.Component {

    render() {
        let {
            id,
            title,
            loggedUserId,
            lessonOwner,
            topicsOpened,
            topics,
            modalOpened,
            description,
            handleInputChange,
            handleTopicsClick,
            handleModalClose,
            edditing,
            sidebar,
            edditingNode
        } = this.props;

        let readOnlyexpantionPanel = (
            <ExpansionPanelDetails className={this.props.classes.lessonDetails}>
                {(loggedUserId === (lessonOwner && lessonOwner.id)) &&
                     sidebar
                }
                <Typography style={{ color: "white", marginLeft: "5px" }}>
                    {description}
                </Typography>
            </ExpansionPanelDetails>
        )

        let edditingExpantionPanel = (
            <ExpansionPanelDetails
                className={this.props.classes.editingLessonDetails}
            >
                {edditingNode}
            </ExpansionPanelDetails>
        );
        return (
            <Slide
                direction="up"
                in={true}
                timeout={600}
                mountOnEnter
                unmountOnExit
            >
                <div>
                    {/* TODO: expand when edditing */}
                    <ExpansionPanel className={this.props.classes.lesson}>
                        <ExpansionPanelSummary
                            expandIcon={
                                <ExpandMoreIcon style={{ color: "white" }} />
                            }
                        >
                            <UserInfoContainer
                                className={this.props.classes.userInfoContainer}
                                disabled={true}
                                userId={lessonOwner && lessonOwner.id}
                            />
                            {/* TODO: спорное решение с Link */}
                            {/* TODO: click lesson click error */}
                            {edditing ? (
                                <TextField
                                    name="title"
                                    onChange={handleInputChange}
                                    InputProps={{ disableUnderline: true }}
                                    placeholder="Название урока"
                                    onClick={this.handleEditableHeaderClick}
                                    style={{
                                        backgroundColor: "white",
                                        padding: "10px",
                                        opacity: "0.9",
                                        borderRadius: "4px",
                                        width: "85%"
                                    }}
                                />
                            ) : topics.length ? (
                                <Link
                                    to={`/lesson/${id}/topic/${
                                        topics[0] ? topics[0].id : null
                                        }`}
                                    style={{ height: "20px" }}
                                >
                                    {title}
                                </Link>
                            ) : (
                                        <React.Fragment>
                                            <Tooltip
                                                title="Урок не содержит топиков"
                                                placement="left"
                                            >
                                                <Flag
                                                    className={this.props.classes.flag}
                                                />
                                            </Tooltip>{" "}
                                            title
                                </React.Fragment>
                                    )}
                        </ExpansionPanelSummary>
                        {edditing
                            ? edditingExpantionPanel
                            : readOnlyexpantionPanel}
                    </ExpansionPanel>
                    <TopicList
                        lessonId={id}
                        topicsOpened={topicsOpened}
                        handleTopicsClick={handleTopicsClick}
                        topics={topics}
                    />
                    <TopicModal
                        open={modalOpened}
                        handleClose={handleModalClose}
                        lessonId={id}
                    />
                </div>
            </Slide>
        );
    }
}

Lesson.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    lessonOwner: PropTypes.shape({
        id: PropTypes.number
    }),
    loggedUserId: PropTypes.number,
    sidebar: PropTypes.node,
    edditingNode: PropTypes.node,
    handleModalClose: PropTypes.func,
    handleTopicsClick: PropTypes.func,
    handleInputChange: PropTypes.func,
    topicsOpened: PropTypes.bool,
    modalOpened: PropTypes.bool,
    edditing: PropTypes.bool
}

const styles = {
    lesson: {
        marginTop: "20px",
        paddingBottom: "10px",
        backgroundColor: "grey",
        backgroundImage:
            'url(" https://lh4.googleusercontent.com/-64uhpsHBEZw/VMqrG_6wowI/AAAAAAAAAIE/_Pw_QoP0opU/w1005-h214-no/123_rainbowtriangle_teal.jpg")'
    },
    userInfoContainer: { float: "left" },
    lessonDetails: {
        display: "flex",
        justifyContent: "flex-start",
        paddingBottom: "0px",
        textAlign: "left"
    },
    editingLessonDetails: {
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        paddingBottom: "0px",
        textAlign: "left"
    },
    flag: {
        color: "#ff7961"
    }
};
export default withStyles(styles)(Lesson);
