import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'material-ui/Checkbox'
import Radio from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'
import CloseIcon from '@material-ui/icons/Close'
import TextField from 'material-ui/TextField'
class Answer extends React.Component {

    getCheckBox(answer, editable,serialNumber) {
        return editable ? <div style={{ display: 'flex', alignItems: 'center' }}>{serialNumber}.<Checkbox style={{ width: '5%' }} /> <TextField defaultValue={answer} style={{ width: '90%' }} /><CloseIcon /></div>: <div style={{ display: 'flex', alignItems: 'center' }}><FormControlLabel control={<Checkbox label={answer} />} label={answer} /></div>
    }

    getRadioButtons(answer, editable,serialNumber) {
        return editable ? <div style={{ display: 'flex', alignItems: 'center' }}>{serialNumber}.<Radio value="a" onClick={this.props.onClick} checked={this.props.checked} name="radio-button-demo" /><TextField defaultValue={answer} style={{ width: '90%' }} /><CloseIcon /></div> : <div style={{ display: 'flex', alignItems: 'center' }}><FormControlLabel control={<Radio value={answer} />} label={answer} /></div>

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
}

Answer.defaultProps = {
    onClick: f => f,
    typeOfAnswer: 'checkbox',
    editable: false
}

export default Answer