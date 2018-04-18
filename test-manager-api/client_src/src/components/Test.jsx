import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Question from './Question';
import { Button } from 'mdbreact';

class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            rightAnswersWeight: 0
        }

        this.handleRightAnswer = this.handleRightAnswer.bind(this);
    }

    static propTypes = {
        onTestSubmit: PropTypes.func.isRequired,
        topicId: PropTypes.number.isRequired
    }

    handleRightAnswer(weight) {
        return () => {
            this.setState(prevState => {
              return {rightAnswersWeight: prevState.rightAnswersWeight + weight}
            })
        }
    }

    getQuestions(topicId){
        axios.get("http://localhost:3000/api/Topics/" + topicId + "/questions")
            .then(response => {
                console.log(response.data);
                this.setState({
                    questions: response.data
                })

                return response.data;
            })
    }
    componentWillMount(){
       this.getQuestions(this.props.topicId)
    }
    componentWillUpdate(nextProps) {
       this.getQuestions(nextProps.topicId);
    }

    render() {

        var weight = 0;
        var questions = this.state.questions.map((value, index) => {
             weight += value.weight
            return <Question onRightAnswer={this.handleRightAnswer(value.weight)} key={value.id} question={value} />
        })

        return <div>
            {questions}
            <Button onClick={this.props.onTestSubmit(this.state.rightAnswersWeight,weight)}>Submit Test</Button>
        </div>
    }
}

export default Test;