import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Answer from './Answer';
import { Button } from 'mdbreact';

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: [],
            choosen: []
        }

        this.renderAnswers = this.renderAnswers.bind(this);
        this.handleAnswerClick = this.handleAnswerClick.bind(this);
        this.checkCorrectAnswers = this.checkCorrectAnswers.bind(this);
    }
    static propTypes = {
        onRightAnswer: PropTypes.func.isRequired,
        question: PropTypes.shape({
            id: PropTypes.number.isRequired,
            weight: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string
        }).isRequired
    }

    componentWillMount() {
        axios.get("http://localhost:3000/api/Questions/" + this.props.question.id + "/answers")
            .then(response => {
                this.setState({
                    answers: response.data,
                    choosen: new Array(response.data.length).fill(false)
                })
            })
    }

    checkCorrectAnswers() {
        var answers = this.state.answers;
        var choosen = this.state.choosen;
        var res = answers.every((answer, i) => {
            if (answer.isRight) {
                if (choosen[i] != true)
                    return false
            } else {
                if (choosen[i] == true)
                    return false
            }
            return true;
        });
        if (res) {
            this.props.onRightAnswer();
        }
    }

    handleAnswerClick(i) {
        return () => {
            this.setState(prevState => {
                var res = prevState.choosen;
                res[i] = !res[i];
                return { choosen: res }
            })
        }
    }

    renderAnswers() {
        return this.state.answers.map((value, i, array) => {
            return <Answer onClick={this.handleAnswerClick(i)} id={value.id} key={value.id} text={value.text} />
        });
    }
    render() {
        return <form action="" style={{ color: "black", display:"flex",flexDirection:"column", textAlign:"left" }}>
            <h3>{this.props.question.title}</h3>
            <p>{this.props.question.description}</p>
                {this.renderAnswers()}
            <Button className="align-self-end" onClick={this.checkCorrectAnswers}>Submit</Button>
        </form>
    }
}

export default Question;