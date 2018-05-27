import React from 'react'
import PropTypes from 'prop-types'
import Answer from './Answer'
import { Button } from 'mdbreact'
import { connect } from 'react-redux'
import { loadAnswers } from '../redux/AC/answers'
import RadioGroup from '@material-ui/core/RadioGroup'
class Question extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            choosen: [],
            testType: 'checkbox'
        }

        this.renderAnswers = this.renderAnswers.bind(this)
        this.checkCorrectAnswers = this.checkCorrectAnswers.bind(this)
    }


    componentWillMount() {
        this.props.getAnswers(this.props.question.id)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.answers.length) {
            var numberOfRightAnswers = 0
            newProps.answers.map((value) => {
                if (value.isRight)
                    numberOfRightAnswers++
            })
            if (numberOfRightAnswers > 1)
                this.setState({
                    testType: 'checkbox'
                })
            if (numberOfRightAnswers === 1) {
                this.setState({
                    testType: 'radio'
                })
            }
        }
    }
    checkCorrectAnswers() {
        var answers = this.state.answers
        var choosen = this.state.choosen
        var res = answers.every((answer, i) => {
            if (answer.isRight) {
                if (choosen[i] != true)
                    return false
            } else {
                if (choosen[i] == true)
                    return false
            }
            return true
        })
        if (res) {
            this.props.onRightAnswer()
        }
    }

    handleAnswerClick = (i) => (e) => {
        this.setState(prevState => {
                var res = prevState.choosen
                res[i] = !res[i]
                return { choosen: res }
            })
    }

    handleRadioClick = (i)=>(e)=>{
        this.setState((prevState)=>{
            var res = new Array(prevState.choosen.length).fill(false)
            res[i] = true
            return {choosen: res}
        })
    }
    renderAnswers() {
        return this.props.answers.map((value, i) => {
            return <Answer typeOfAnswer={this.state.testType} checked={this.state.choosen[i] || false} onClick={this.state.testType==='radio'?this.handleRadioClick(i):this.handleAnswerClick(i)} id={value.id} key={value.id} text={value.text} />
        })
    }
    render() {
        return <form action="" style={{ color: 'black', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <h3>{this.props.question.title}</h3>
            <p>{this.props.question.description}</p>
            {this.renderAnswers()}
            <Button className="align-self-end" onClick={this.checkCorrectAnswers}>Submit</Button>
        </form>
    }
}

Question.propTypes = {
    onRightAnswer: PropTypes.func.isRequired,
    question: PropTypes.shape({
        id: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string
    }).isRequired,
    //redux
    getAnswers: PropTypes.func,
    answers: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state, ownProps) => {
    var res = []
    for (var key in state.answers) {
        if (Number(ownProps.question.id) === Number(state.answers[key].questionId))
            res.push(state.answers[key])
    }

    return { answers: res }
}

const mapDispatchToProps = dispatch => {
    return {
        getAnswers(questionId) {
            dispatch(loadAnswers(questionId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Question)