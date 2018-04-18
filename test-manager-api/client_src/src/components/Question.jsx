import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Answer from './Answer';
import { Button } from 'mdbreact';

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: []
        }

        this.renderAnswers = this.renderAnswers.bind(this);
    }
    static propTypes = {
        question: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string
        }).isRequired
    }

    componentWillMount() {
        axios.get("http://localhost:3000/api/Questions/" + this.props.question.id + "/answers")
            .then(response => {
                this.setState({
                    answers: response.data
                }
                )
            })
    }

    renderAnswers() {
        debugger;
        return this.state.answers.map((value, i, array) => {
            return <Answer key={value.text} text={value.text} />
        });
    }
    render() {
        return <form action="" >
            <h3>{this.props.question.title}</h3>
            <p>{this.props.question.description}</p>
            {this.renderAnswers()}
            <Button>Submit</Button>
        </form>
    }
}

export default Question;