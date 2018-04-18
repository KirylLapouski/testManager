import React from 'react';
import Paginator from './Paginator';
import Topic from './Topic';
import axios from 'axios';
import toastr from 'toastr';
class TopicContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currenTopic: 1,
            topics: [],
            rightAnswersWeight: 0,
            allAnswersWeight: 0
        }

        this.handlePaginatorClick = this.handlePaginatorClick.bind(this);
        this.takeTopics = this.takeTopics.bind(this);
        this.handleTestSubmit = this.handleTestSubmit.bind(this);
    }

    handlePaginatorClick(i) {
        this.setState({
            currenTopic: i
        })
        window.history.pushState(null, null, "/lesson/" + this.props.match.params.lessonId + "/topic/" + this.state.topics[i - 1].id);
    }

    handleTestSubmit(rightAnswersWeight, allAnswersWeight) {
        return () => {
            toastr.info("Test result: " + rightAnswersWeight*100/allAnswersWeight +"%");
            this.setState(prevState => {
                return {
                    rightAnswersWeight: prevState.rightAnswersWeight + rightAnswersWeight,
                    allAnswersWeight: prevState.allAnswersWeight + allAnswersWeight
                }
            })
        }
    }
    componentWillMount() {
        this.takeTopics();
    }
    takeTopics() {
        var self = this;
        axios.get("http://localhost:3000/api/Lessons/" + this.props.match.params.lessonId + '/topics')
            .then(response => {
                self.setState({
                    topics: response.data
                })
            })
    }

    render() {
        if (JSON.stringify(this.state.topics) != "[]") {
            var topic = this.state.topics[this.state.currenTopic - 1]
            var elem = <Topic handleTestSubmit={this.handleTestSubmit} path={topic.path} id={topic.id} />
        }

        return (<div>
            <Paginator length={this.state.topics.length} onClick={this.handlePaginatorClick} />
            {elem}
        </div>
        )
    }
}

export default TopicContainer;