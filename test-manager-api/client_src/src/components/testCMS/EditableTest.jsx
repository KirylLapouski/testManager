import React from 'react';
import PropTypes from 'prop-types';
import { RadioButtonGroup } from 'material-ui/RadioButton';
import IconButton from 'material-ui/IconButton';
import MuiDecorator from '../decorators/MaterialDesignReactDecorator';
import Create from 'material-ui/svg-icons/content/create'
import Answer from '../Answer';
import TextField from 'material-ui/TextField';
import EditableAnswer from './EditableAnswer';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

class Test extends React.Component {
    constructor(props) {
        super(props);

        this.getAnswers = this.getAnswers.bind(this);
        this.getAnswersText = this.getAnswersText.bind(this);
        this.begginEdit = this.begginEdit.bind(this)
    }

    getAnswersText() {
        return this.props.answers.map(answer => {
            return answer.text
        });
    }

    //NEEEEEED TO CORRECT
    getAnswers(ansersText) {
        return ansersText.map((answer, i) => {
            return <Answer key={i} typeOfAnswer={this.props.testType} text={answer} />;
        })
    }

    getAnswersInputs(answersText){
        return answersText.map(answer=>{
            return <EditableAnswer text={answer}/>
        })
    }
    begginEdit() {
        this.props.toggleOpenItem(this.props.id);
    }
    render() {
        var { editing } = this.props;
        if (editing) {
            var answers = this.getAnswersInputs(this.getAnswersText());

            return <div className="mx-auto z-depth-1-half container" style={{borderLeft:"3px solid indigo",color: "#263238",display:'flex',flexDirection:'column',padding:"20px"}} >
                <TextField hintText={this.props.question && 'Question'} />
                {answers}
                <RaisedButton label="Primary" primary={true}  />
                <Divider inset={true} style={{position:"relative",left:"-5%",width:"100%"}}/>
                <Toggle label={"Обязательный вопрос"} style={{width:"20%", alignSelf:"flex-end",marginRight:"30px"}}></Toggle>
            </div>
        
        }

        var answers = this.getAnswers(this.getAnswersText());
        
        return (<div className="mx-auto container"  onClick={this.begginEdit} style={{ color: "#263238" }} >
            <h3>{this.props.question}</h3>
            {answers}
          
        </div>)
    }
}

Test.propTypes = {
    question: PropTypes.string,
    // answers: PropTypes.arrayOf(
    //     PropTypes.object.shape({
    //         text: PropTypes.string
    //     })
    // ),
    testType: PropTypes.string,
    editing: PropTypes.bool
}


export default MuiDecorator(Test);
