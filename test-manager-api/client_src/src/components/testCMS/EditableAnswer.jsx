import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'material-ui/Checkbox'
import Radio from 'material-ui/Radio'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import CloseIcon from '@material-ui/icons/Close'

class EditableAnswer extends React.Component {
    getInput(answerType) {
        switch (answerType) {
        case 'checkbox': return <Checkbox style={{ width: '5%' }} />
        case 'radio': return <Radio value="a" onClick={this.props.onClick} checked={this.props.checked} name="radio-button-demo" />
        }
    }
    render() {
        var { answerType, text, serialNumber } = this.props
        var input = this.getInput(answerType)
        return <div style={{ display: 'flex', alignItems: 'center' }}>{serialNumber}.{input}<TextField defaultValue={text} style={{ width: '90%' }} /><CloseIcon /></div>
    }
}

EditableAnswer.protoTypes = {
    answerType: PropTypes.string,
    text: PropTypes.string,
    serialNumber: PropTypes.number,
    onClick: PropTypes.func,
    //for radio
    checked: PropTypes.bool
}

EditableAnswer.defaultProps = {
    answerType: 'checkbox',
    text: 'answer',
    checked: false
}

export default EditableAnswer