import React from 'react';
import Paginator from './Paginator';
import Topic from './Topic';
import axios from 'axios';
class TopicContainer extends React.Component {
    constructor(props){
        super(props);

        this.state={
            currenTopic:1,
            topics: []
        }

        this.handlePaginatorClick = this.handlePaginatorClick.bind(this);
        this.takeTopics = this.takeTopics.bind(this);
    }

    handlePaginatorClick(i){
        this.setState({
            currenTopic: i
        })
    }
    componentWillMount(){
        this.takeTopics();
    }
    takeTopics(){
        var self = this;
        axios.get("http://localhost:3000/api/Lessons/" +this.props.match.params.lessonId +'/topics')
            .then(response => {
                self.setState({
                    topics: response.data
                })
            })
    }

    render() {
        if(JSON.stringify(this.state.topics) != "[]"){
            var topic =  this.state.topics[this.state.currenTopic-1]
            var elem = <Topic path={topic.path}/>
        }

        return (<div>
                    <Paginator length={this.state.topics.length} onClick={this.handlePaginatorClick}/>
                    {elem}
                </div>
        )
    }
}

export default TopicContainer;