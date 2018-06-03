import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CloseIcon from '@material-ui/icons/Close'
import TextField from 'material-ui/TextField'
import {deleteAnswer} from '../redux/AC/answers'
import { connect } from "react-redux";
import { Button } from 'material-ui';
class Answer extends React.Component {

    deleteAnswerHandler = ()=>{
        this.props.deleteAnswer(this.props.id)
    }

    getCheckBox(answer, editable, serialNumber) {
        return editable ? <div style={{ display: 'flex', alignItems: 'center' }}>{serialNumber < 10 ? '0' + serialNumber : serialNumber}.<Checkbox onClick={this.props.onClick} style={{ width: '5%' }} /> <TextField defaultValue={answer} style={{ width: '90%' }} /><Button onClick={this.deleteAnswerHandler}><CloseIcon /></Button></div> : <div style={{ display: 'flex', alignItems: 'center' }}><FormControlLabel control={<Checkbox checked={this.props.checked} label={answer} onClick={this.props.onClick} />} label={answer} /></div>
    }

   
    getRadioButtons(answer, editable, serialNumber) {
        return editable ? <div style={{ display: 'flex', alignItems: 'center' }}>{serialNumber < 10 ? '0' + serialNumber : serialNumber}.<Radio value="a" onClick={this.props.onClick} checked={this.props.checked} /><TextField defaultValue={answer} style={{ width: '90%' }} /><Button onClick={this.deleteAnswerHandler}><CloseIcon /></Button></div> : <div style={{ display: 'flex', alignItems: 'center' }}><FormControlLabel control={<Radio checked={this.props.checked} value={answer} onClick={this.props.onClick} />} label={answer} /></div>

    }
    render() {
        var { typeOfAnswer, text, serialNumber, editable } = this.props

        switch (typeOfAnswer) {
        case 'checkbox': return this.getCheckBox(text, editable, serialNumber)
        case 'radio': return this.getRadioButtons(text, editable, serialNumber)
        }
    }
}

Answer.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string.isRequired,
    typeOfAnswer: PropTypes.string,
    onClick: PropTypes.func,
    editable: PropTypes.bool,
    serialNumber: PropTypes.number,
    checked: PropTypes.bool,
    //redux
    deleteAnswer: PropTypes.func
}

Answer.defaultProps = {
    onClick: f => f,
    typeOfAnswer: 'checkbox',
    editable: false
}

const mapDispatchToProps = dispatch =>{
    return {
        deleteAnswer(answerId){
            dispatch(deleteAnswer(answerId))
        }
    }
}
export default connect(null,mapDispatchToProps)( Answer)