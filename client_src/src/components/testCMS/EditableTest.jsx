import React from 'react'
import PropTypes from 'prop-types'
import Answer from '../Answer'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Button from '@material-ui/core/Button'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import TypeOfAnswerSelect from './TypeOfAnswerSelect'
import { connect } from 'react-redux'
import { loadAnswers, addAnswer, updateAnswer } from '../../redux/AC/answers'
import { deleteQuestion, updateQuestion } from '../../redux/AC/question'
import DeleteIcon from '@material-ui/icons/Delete'
import toastr from 'toastr'
//TODO: refactor test cms
class Test extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isRadiosSelected: [],
            answersTitle: [],
            questionTitle: ''
        }
        this.getAnswers = this.getAnswers.bind(this)
        this.begginEdit = this.begginEdit.bind(this)
    }

    componentWillMount() {
        this.props.getAnswers(this.props.question.id)
    }

    handleClickRadio = (number, e) => {
        var checked = e.target.checked
        this.setState((prevState) => {
            var newisRadiosSelected = [...prevState.isRadiosSelected]
            newisRadiosSelected[number] = checked
            return {
                isRadiosSelected: newisRadiosSelected
            }
        })
    }

    handleAnswerTitleChange = (number) => (e) => {
        var value = e.target.value
        this.setState((prevState) => {
            var newAnswersTitle = [...prevState.answersTitle]
            newAnswersTitle[number] = value
            return {
                answersTitle: newAnswersTitle
            }
        })
    }

    getAnswersNessecaryInfo = () => {
        return this.props.answers.map(answer => {
            return { text: answer.text, id: answer.id }
        })
    }

    componentWillReceiveProps(newProps) {
        if (!this.state.answersTitle.length)
            this.setState({
                answersTitle: newProps.answers.map(value => value.text)
            })
        if (!this.state.isRadiosSelected.length)
            this.setState({
                isRadiosSelected: newProps.answers.map(value => value.isRight)
            })
    }

    getAnswers(ansersText, editable = false) {
        return ansersText.map((answer, i) => {
            return <Answer key={i} editable={editable} onChange={editable ? this.handleAnswerTitleChange(i) : null} typeOfAnswer={this.props.testType} onClick={editable ? this.handleClickRadio.bind(this, i) : null} checked={this.state.isRadiosSelected[i]} text={this.state.answersTitle[i]} id={answer.id} serialNumber={editable && i + 1} />
        })
    }

    deleteQuestionHandler = () => {
        this.props.deleteQuestion(this.props.question.id)
    }

    begginEdit = () => {
        this.props.toggleOpenItem(this.props.question.id)
    }

    endEdit = () => {
        this.props.toggleOpenItem(-1)
    }

    addNewAnswer = () => {
        this.props.addAnswer()
    }

    handleSubmit = () => {
        if(!this.state.answersTitle.every(value => value.trim())){
            toastr.error('Все варианты ответов должны быть заполнены')
            return
        }

        if (!this.state.isRadiosSelected.some(value => value)) {
            toastr.error('Надо отметить хотя бы один ответ как правильный')
            return
        }else {
            toastr.success('Текст ответов сохранён', 'Вопрос обновлен')

            this.state.isRadiosSelected.map((value, i) => {
                this.props.updateAnswer(this.props.answers[i].id, this.state.answersTitle[i], this.state.isRadiosSelected[i])
            })

        }

        if (this.state.questionTitle) {
            this.props.updateQuestion(this.props.question.id, this.state.questionTitle)
            //TODO: check if updated
            toastr.success('Текст вопроса успешно обновлен', 'Вопрос обновлен')

        }

        this.endEdit()
    }

    onChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    render() {
        var { editing } = this.props
        var answersText = this.getAnswersNessecaryInfo()
        var answers = this.getAnswers(answersText, editing)
        if (editing) {
            return <div className="mx-auto z-depth-1-half container" style={{ borderLeft: '3px solid indigo', color: '#263238', display: 'flex', flexDirection: 'column', paddingTop: '20px', paddingRight: '20px', paddingLeft: '20px' }} >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField label="Вопрос" onChange={this.onChange('questionTitle')} style={{ marginLeft: '27px', width: '50%' }} />
                    <TypeOfAnswerSelect style={{ width: '300px', marginRight: '25px' }} />
                </div>
                {answers}
                <Button onClick={this.addNewAnswer} >Добавить вариант</Button>
                <Divider inset={true} style={{ position: 'relative', left: '-5%', width: '100%', marginTop: '30px' }} />
                <FormGroup row style={{ position: 'relative', paddingTop: '10px', minHeight: '60px' }}>
                    <FormControlLabel style={{ position: 'absolute', right: '320px', paddingRight: '10px', borderRight: '1px solid grey' }} control={<Button onClick={this.deleteQuestionHandler}> <DeleteIcon /></Button>} />
                    <FormControlLabel style={{ position: 'absolute', right: '0' }} control={<Button onClick={this.handleSubmit} color='primary'> Принять изменения</Button>} />
                    <FormControlLabel style={{ position: 'absolute', right: '200px' }} control={<Button onClick={this.endEdit}>Свернуть</Button>} />
                </FormGroup>
            </div>
        } else {
            return (<div className="mx-auto container" onClick={this.begginEdit} style={{ color: '#263238', borderBottom: '1px  solid rgba(0,0,0,0.12)' }} >
                <div style={{ background: 'rgba(0,0,0,0.1)', overflow: 'hidden' }}><h3>{this.props.question.title}</h3></div>
                {answers}
            </div>)
        }
    }
}
//TODO: update right answer in test cms, display right answer
Test.propTypes = {
    question: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        weight: PropTypes.number,
        topicId: PropTypes.number
    }),
    editing: PropTypes.bool,
    toggleOpenItem: PropTypes.func,
    //redux
    getAnswers: PropTypes.func,
    deleteQuestion: PropTypes.func,
    updateQuestion: PropTypes.func,
    updateAnswer: PropTypes.func,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            //TODO: !!!!!!!!!!!!!!!!! count answer type
            isRight: PropTypes.bool
        })
    )
}

const mapStateToProps = (state, ownProps) => {
    var res = []
    for (var key in state.answers) {
        if (Number(ownProps.question.id) === state.answers[key].questionId) {
            res.push(state.answers[key])
        }
    }
    return { answers: res }
}

const mapDispatchtToProps = (dispatch, ownProps) => {
    return {
        getAnswers(questionId) {
            dispatch(loadAnswers(questionId))
        },
        addAnswer() {
            dispatch(addAnswer(ownProps.question.id))
        },
        deleteQuestion(questionId) {
            dispatch(deleteQuestion(questionId))
        },
        updateQuestion(questionId, title) {
            dispatch(updateQuestion(questionId, title))
        },
        updateAnswer(answerId, text, isRight) {
            dispatch(updateAnswer(answerId, text, isRight))
        }
    }
}
export default connect(mapStateToProps, mapDispatchtToProps)(Test)
