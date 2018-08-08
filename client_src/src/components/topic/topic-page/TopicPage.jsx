import React from "react";
import TopicContainer from "../TopicContainer";
import PropTypes from "prop-types";
import EditButton from "../../EditButton";
import LessonResultContainer from "../lesson-result/LessonResultContainer";
import toastr from "toastr";
import Stepper from "../../stepper/Stepper";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { withStyles } from "@material-ui/core/styles";
//TODO: can rewrite on function
class TopicPage extends React.Component {
    handleTopicEditClick = readOnly => {
        return this.props.readOnly
            ? () => {
                  toastr.info("Режим редактирования");
                  this.props.handleTopicBeginEditClick();
              }
            : () => {
                  toastr.info("Режим просмотра");
                  this.props.handleTopicEndEditClick();
              };
    };
    render() {
        var { loggedUserId, userOwnerId, currenTopicId, topics } = this.props;
        var paginatorSerialNumber;
        if (JSON.stringify(topics) !== "[]") {
            //TODO:instead of receive currentTopicId just take current paginator position
            for (var i = 0; i < topics.length; i++) {
                if (Number(currenTopicId) === topics[i].id) {
                    var topic = topics[i];
                    paginatorSerialNumber = i + 1;
                }
            }

            var elem;
            if (currenTopicId !== 0) {
                elem = (
                    <TopicContainer
                        key={this.props.match.params.topicId}
                        readOnly={this.props.readOnly}
                        path={topic && topic.path}
                        id={topic && topic.id}
                    />
                );
            }
        }

        return (
            <div>
                {topics.length + 1 && (
                    <Stepper
                        onChange={this.props.handlePaginatorClick}
                        stepsTitles={topics.map(value => {
                            return value.title;
                        })}
                        initCurrentPos={paginatorSerialNumber - 1}
                        displayWhenComplete={<LessonResultContainer />}
                        nextButton={
                            <IconButton
                                className={this.props.classes.nextTopicButton}
                            >
                                <KeyboardArrowRight
                                    className={this.props.classes.icon}
                                />
                            </IconButton>
                        }
                        backButton={
                            <IconButton
                                className={this.props.classes.backTopicButton}
                            >
                                <KeyboardArrowLeft
                                    className={this.props.classes.icon}
                                />
                            </IconButton>
                        }
                    />
                )}
                {elem}
                {loggedUserId === userOwnerId && (
                    <EditButton
                        onTopicEditClick={this.handleTopicEditClick(
                            this.props.readOnly
                        )}
                    />
                )}
            </div>
        );
    }
}

TopicPage.propTypes = {
    topics: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            path: PropTypes.string
        })
    ),
    loggedUserId: PropTypes.number,
    userOwnerId: PropTypes.number,
    currenTopicId: PropTypes.number,
    readOnly: PropTypes.bool,
    handlePaginatorClick: PropTypes.func,
    handleTopicEndEditClick: PropTypes.func,
    handleTopicBeginEditClick: PropTypes.func
};

const styles = {
    nextTopicButton: {
        position: "absolute",
        width: "100px",
        height: "100px",
        right: "10px"
    },
    icon: {
        width: "100px",
        height: "100px"
    },
    backTopicButton: {
        position: "absolute",
        width: "100px",
        height: "100px",
        left: "10px"
    }
};
export default withStyles(styles)(TopicPage);
