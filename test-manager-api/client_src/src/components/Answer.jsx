import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CloseIcon from '@material-ui/icons/Close'
import TextField from 'material-ui/TextField'
class Answer extends React.Component {

    getCheckBox(answer, editable,serialNumber) {
        return editable ? <div style={{ display: 'flex', alignItems: 'center' }}>{serialNumber}.<Checkbox onClick={this.props.onClick} style={{ width: '5%' }} /> <TextField defaultValue={answer} style={{ width: '90%' }} /><CloseIcon /></div>: <div style={{ display: 'flex', alignItems: 'center' }}><FormControlLabel control={<Checkbox checked={this.props.checked} label={answer} onClick={this.props.onClick} />} label={answer} /></div>
    }

    getRadioButtons(answer, editable,serialNumber) {
        return editable ? <div style={{ display: 'flex', alignItems: 'center' }}>{serialNumber}.<Radio value="a" onClick={this.props.onClick} checked={this.props.checked} /><TextField defaultValue={answer} style={{ width: '90%' }} /><CloseIcon /></div> : <div style={{ display: 'flex', alignItems: 'center' }}><FormControlLabel control={<Radio checked={this.props.checked} value={answer} onClick={this.props.onClick}/>} label={answer} /></div>

    }
    render() {
        var { typeOfAnswer, text, serialNumber, editable } = this.props

        switch (typeOfAnswer) {
        case 'checkbox': return this.getCheckBox(text, editable,serialNumber)
        case 'radio': return this.getRadioButtons(text, editable,serialNumber)
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
    checked: PropTypes.bool
}

Answer.defaultProps = {
    onClick: f => f,
    typeOfAnswer: 'checkbox',
    editable: false
}

export default Answer