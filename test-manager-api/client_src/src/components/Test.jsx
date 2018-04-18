import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Question from './Question';
import { Button, Collapse } from 'mdbreact';

class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            rightAnswersWeight: 0,
            //bootstrap state
            collapse: false
        }

        this.handleRightAnswer = this.handleRightAnswer.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            collapse: !this.state.collapse
        })
    }
    static propTypes = {
        onTestSubmit: PropTypes.func.isRequired,
        topicId: PropTypes.number.isRequired
    }

    handleRightAnswer(weight) {
        return () => {
            this.setState(prevState => {
                return { rightAnswersWeight: prevState.rightAnswersWeight + weight }
            })
        }
    }

    getQuestions(topicId) {
        axios.get("http://localhost:3000/api/Topics/" + topicId + "/questions")
            .then(response => {
                this.setState({
                    questions: response.data
                })

                return response.data;
            })
    }
    componentWillMount() {
        this.getQuestions(this.props.topicId)
    }
    render() {

        var weight = 0;
        var questions = this.state.questions.map((value, index) => {
            weight += value.weight
            return <Question onRightAnswer={this.handleRightAnswer(value.weight)} key={value.id} question={value} />
        })

        return <div>
            <Button onClick={this.toggle} >Open Tests</Button>
            <Collapse isOpen={this.state.collapse}>
                {questions}
                <Button onClick={this.props.onTestSubmit(this.state.rightAnswersWeight, weight)}>Submit Test</Button>
            </Collapse>
        </div>
    }
}

export default Test;