import React from 'react';
import axios from 'axios';
import Paginator from './Paginator';
import Topic from './Topic';
import toastr from 'toastr';
class TopicContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currenTopic: this.props.match.params.topicId?this.props.match.params.topicId:1,
            topics: [],
            rightAnswersWeight: 0,
            allAnswersWeight: 0
        }

        this.handlePaginatorClick = this.handlePaginatorClick.bind(this);
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
            toastr.info("Test result: " + rightAnswersWeight * 100 / allAnswersWeight + "%");
            this.setState(prevState => {
                return {
                    rightAnswersWeight: prevState.rightAnswersWeight + rightAnswersWeight,
                    allAnswersWeight: prevState.allAnswersWeight + allAnswersWeight
                }
            })
        }
    }
    componentWillMount() {
        axios.get("http://localhost:3000/api/Lessons/" + this.props.match.params.lessonId + '/topics')
            .then(response => {
                console.log(this.setState);
                this.setState({
                        topics: response.data
                })
            });
    }

    render() {
        if ((JSON.stringify(this.state.topics) !== "[]")) {
            var topic = this.state.topics[this.state.currenTopic - 1]
            var elem = <Topic handleTestSubmit={this.handleTestSubmit} path={topic.path} id={topic.id} />
        }

        return (<div>
            <Paginator initCurrentPos={Number(this.props.match.params.topicId)?Number(this.props.match.params.topicId):null} length={this.state.topics.length} onClick={this.handlePaginatorClick} />
            {elem}
        </div>
        )
    }
}

export default TopicContainer;