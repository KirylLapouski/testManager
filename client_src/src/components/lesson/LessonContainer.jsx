import React from "react";
import toastr from "toastr";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTopics } from "../../redux/AC/topic";
import Lesson from "./Lesson";
import { deleteLesson, editLesson } from "../../redux/AC/lessons";
import LessonEdditingFields from './LessonEdditingFields'
import LessonSidebar from './LessonSideBar'
import TopicModal from "../modal/modal-total/TopicModal";
import TopicList from "./TopicListInLesson";
class LessonContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topicsOpened: false,
            modalOpened: false,
            edditing: false,
            title: props.title,
            description: props.description
        };
    }

    componentWillMount() {
        this.props.getTopics(this.props.id);
    }

    handleOpen = name => value => () => {
        this.setState({
            [name]: value
        });
    };

    handleDeleteClick = () => {
        this.props.deleteLesson(this.props.id).then(() => {
            toastr.success("Урок успешно удалён");
        });
    };

    toggleState = name => () => {
        this.setState(prevState => {
            return {
                [name]: !prevState[name]
            };
        });
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmitEditLesson = () => {
        this.props
            .editLesson(this.props.id, this.state.title, this.state.description)
            .then(() => {
                toastr.success("Урок изменён");
            });
        //TODO:: rewrite on refs
        //TODO: need new reducer that check that change

        this.toggleState("edditing")();
    };

    handleCancelEdditingClick = () => {
        this.setState({
            title: this.props.title,
            description: this.props.description
        });
        this.toggleState("edditing")();
    };
    render() {
        return (
            <React.Fragment>
                <Lesson
                    handleInputChange={this.handleInputChange}
                    sidebar={<LessonSidebar
                        onDeleteClick={this.handleDeleteClick}
                        toggleEdditing={this.toggleState("edditing")}
                        onModalOpen={this.handleOpen("modalOpened")(true)}
                    />}
                    edditingNode={
                        <LessonEdditingFields
                            onCancelEdditingClick={this.handleCancelEdditingClick}
                            onSumbitEditLesson={this.handleSubmitEditLesson}
                            onInputChange={this.handleInputChange} />}
                    topicsNode={
                        <TopicList
                            lessonId={this.props.id}
                            topicsOpened={this.state.topicsOpened}
                            handleTopicsClick={this.toggleState("topicsOpened")}
                            topics={this.props.topics}
                        />
                    }
                    {...this.props}
                    {...this.state}
                />
                <TopicModal
                    open={this.state.modalOpened}
                    handleClose={this.handleOpen("modalOpened")(false)}
                    lessonId={this.props.id}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let res = [];
    for (let key in state.topics) {
        if (Number(ownProps.id) === state.topics[key].lessonId) {
            res.push(state.topics[key]);
        }
    }
    return {
        topics: res
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopics(lessonID) {
            return dispatch(addTopics(lessonID));
        },
        deleteLesson(lessonId) {
            return dispatch(deleteLesson(lessonId));
        },
        editLesson(lessonId, title, desctiption) {
            return dispatch(editLesson(lessonId, title, desctiption));
        }
    };
};

LessonContainer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    lessonOwner: PropTypes.shape({
        id: PropTypes.number
    }),
    loggedUserId: PropTypes.number,
    //redux
    topics: PropTypes.arrayOf(PropTypes.object),
    getTopics: PropTypes.func,
    deleteLesson: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LessonContainer);
