import React from 'react'
import PropTypes from 'prop-types'
import { RadioGroup as RadioButtonGroup } from 'material-ui/Radio'
import IconButton from 'material-ui/IconButton'
import Answer from '../Answer'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Switch from 'material-ui/Switch'
import Button from '@material-ui/core/Button'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import TypeOfAnswerSelect from './TypeOfAnswerSelect'
import { connect } from 'react-redux'
import { loadAnswers, addAnswer } from '../../redux/AC/answers'
import { deleteQuestion,updateQuestion  } from '../../redux/AC/question'
import DeleteIcon from '@material-ui/icons/Delete'
import { relative } from 'path'
import toastr from 'toastr'
//TODO: refactor test cms
class Test extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedRadio: [],
            questionTitle: ''
        }
        this.getAnswers = this.getAnswers.bind(this)
        this.begginEdit = this.begginEdit.bind(this)
        this.handleClickRadio = this.handleClickRadio.bind(this)
    }

    componentWillMount() {
        this.props.getAnswers(this.props.question.id)
    }
    handleClickRadio(number) {
        this.setState((prevState) => {
            var newState = [...prevState]
            newState[number] = true
            return {
                selectedRadio: newState
            }
        })
    }
    getAnswersNessecaryInfo = () => {
        return this.props.answers.map(answer => {
            return { text: answer.text, id: answer.id }
        })
    }

    getAnswers(ansersText, editable = false) {
        return ansersText.map((answer, i) => {
            return <Answer key={i} editable={editable} typeOfAnswer={this.props.testType} onClick={editable ? this.handleClickRadio.bind(this, i) : null} checked={editable ? this.state.selectedRadio[i] : null} text={answer.text} id={answer.id} serialNumber={editable && i + 1} />
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

    handleSubmit = ()=>{
        if(this.state.questionTitle)  {  
            this.props.updateQuestion(this.props.question.id,this.state.questionTitle)
            toastr.success('Текст вопроса успешно обновлен','Вопрос обновлен')
            }
    }

    onChange= (name)=> (e)=>{

        this.setState({
            [name]:e.target.value
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
        updateQuestion(questionId,title){
            dispatch(updateQuestion(questionId,title))
        }
    }
}
export default connect(mapStateToProps, mapDispatchtToProps)(Test)
