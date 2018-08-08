import React from "react";
import { connect } from "react-redux";
import TopicPage from "./TopicPage";
import { loadTopics } from "../../../redux/AC/topic";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
//TODO: write
class TopicPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currenTopicId: +this.props.match.params.topicId
                ? +this.props.match.params.topicId
                : 1,
            readOnly: true
        };
    }

    handleTopicBeginEditClick = () => {
        this.setState({
            readOnly: false
        });
    };

    handleTopicEndEditClick = () => {
        this.setState({
            readOnly: true
        });
    };

    handlePaginatorClick = i => {
        var { topics } = this.props;
        // if (topics[i - 1].id === topics[topics.length - 1].id) {
        //     this.setState({
        //         currenTopicId: 0 //special value for result topic (need to fix) by send current paginator position instead of currentTopicId
        //     });
        //     // this.props.history.push(`/lesson/${this.props.match.params.lessonId}/topic/result`)
        //     return;
        // }

        this.setState({
            currenTopicId: this.props.topics[i].id
        });
        this.props.history.push(
            `/lesson/${this.props.match.params.lessonId}/topic/${
                this.props.topics[i].id
            }`
        );
    };

    componentWillMount() {
        this.props.getTopics(this.props.match.params.lessonId);
    }

    render() {
        return (
            <TopicPage
                handlePaginatorClick={this.handlePaginatorClick}
                handleTopicEndEditClick={this.handleTopicEndEditClick}
                handleTopicBeginEditClick={this.handleTopicBeginEditClick}
                {...this.props}
                {...this.state}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    var res = [];
    for (var key in state.topics) {
        if (
            Number(ownProps.match.params.lessonId) ===
            state.topics[key].lessonId
        ) {
            res.push(state.topics[key]);
        }
    }
    return {
        topics: res,
        loggedUserId: state.users.loggedIn && state.users.loggedIn.id,
        userOwnerId:
            state.courses[
                state.lessons[ownProps.match.params.lessonId].disciplineId
            ].ownerId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopics(lessonID) {
            dispatch(loadTopics(lessonID));
        }
    };
};

TopicPageContainer.propTypes = {
    topics: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            path: PropTypes.string
        })
    ),
    loggedUserId: PropTypes.number,
    userOwnerId: PropTypes.number,
    getTopics: PropTypes.func
};
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TopicPageContainer)
);
