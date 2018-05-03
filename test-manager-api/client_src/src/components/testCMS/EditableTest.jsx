import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup as RadioButtonGroup } from 'material-ui/Radio';
import IconButton from 'material-ui/IconButton';
import Answer from '../Answer';
import TextField from 'material-ui/TextField';
import EditableAnswer from './EditableAnswer';
import Divider from 'material-ui/Divider';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from "material-ui/Form";
import TypeOfAnswerSelect from './TypeOfAnswerSelect';


class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRadio: -1
        }
        this.getAnswers = this.getAnswers.bind(this);
        this.getAnswersText = this.getAnswersText.bind(this);
        this.begginEdit = this.begginEdit.bind(this);
        this.handleClickRadio = this.handleClickRadio.bind(this);
    }

    handleClickRadio(number){
        this.setState({
            selectedRadio:number
        })
    }
    getAnswersText() {
        return this.props.answers.map(answer => {
            return answer.text
        });
    }

    getAnswers(ansersText) {
        return ansersText.map((answer, i) => {
            return <Answer key={i} typeOfAnswer={this.props.testType} text={answer} />;
        })
    }

    getAnswersInputs(answersText) {
        return answersText.map((answer,i) => {
            return <EditableAnswer text={answer} onClick={this.handleClickRadio.bind(this,i+1)} checked={this.state.selectedRadio===i+1?true:false} answerType={this.props.testType} serialNumber={i+1} />
        })
    }
    begginEdit() {
        this.props.toggleOpenItem(this.props.id);
    }

    addNewAnswer(){
        //AC to add the answer
    }
    render() {
        var { editing } = this.props;
        if (editing) {
            var answers = this.getAnswersInputs(this.getAnswersText());

            return <div className="mx-auto z-depth-1-half container" style={{ borderLeft: "3px solid indigo", color: "#263238", display: 'flex', flexDirection: 'column', padding: "20px" }} >
                <div style={{display:"flex",justifyContent:"space-between"}}><TextField label="Вопрос" style={{marginLeft:"27px",width:"50%"}}/><TypeOfAnswerSelect style={{width:"300px",marginRight:"25px"}}/></div>
                {answers}
                <EditableAnswer text="Добавить вариант" answerType={this.props.testType} onClick={this.addNewAnswer} serialNumber={answers.length+1} />
                <Divider inset={true} style={{ position: "relative", left: "-5%", width: "100%" }} />
                
                <FormGroup row>
                    <FormControlLabel control={<Switch value="checkedC" color="primary" />} label="Обязательный вопрос" />
                </FormGroup>
            </div>

        }

        var answers = this.getAnswers(this.getAnswersText());

        return (<div className="mx-auto container" onClick={this.begginEdit} style={{ color: "#263238" }} >
            <h3>{this.props.question}</h3>
            {answers}

        </div>)
    }
}

Test.propTypes = {
    question: PropTypes.string,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string
        })
    ),
    testType: PropTypes.string,
    editing: PropTypes.bool,
    toggleOpenItem: PropTypes.func,
}


export default Test;
