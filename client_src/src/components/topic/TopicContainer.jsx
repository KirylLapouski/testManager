import React from "react";
import Topic from "./Topic";
import { connect } from "react-redux";
import { addQuestionIdToTopic } from "../../redux/AC/topic";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
//TODO: error handling does not work
class TopicContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    componentDidMount() {
        this.props.getTopicQuestion(this.props.id);
    }
    componentDidCatch(error) {
        this.setState({
            hasError: true
        });
    }
    render() {
        return this.state.hasError ? (
            <div style={{ color: "#212529" }}>Ошибка отображения топика</div>
        ) : (
            <Topic {...this.props} />
        );
    }
}
TopicContainer.propTypes = {
    id: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    ownerId: PropTypes.number,
    //redux
    getTopicQuestion: PropTypes.func,
    hasTests: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
    return {
        hasTests:
            state.topics[ownProps.id] &&
            state.topics[ownProps.id].questions &&
            !!state.topics[ownProps.id].questions.length
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopicQuestion(topicId) {
            dispatch(addQuestionIdToTopic(topicId));
        }
    };
};
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TopicContainer)
);
