import React from 'react'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
import SubmitAndCancel from "./SubmitAndCancel";
class SingleTextField extends React.Component {
    render() {
        var { onChangeHandler, handleClose, handleSubmit,textFieldTitle,autoFocus } = this.props
        return <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width:'100%' }}>
            <TextField autoFocus={autoFocus} style={{ width: '100%' }} onChange={onChangeHandler} id="name" label={textFieldTitle?textFieldTitle:'Название урока'} name="title" margin="normal" />
            <SubmitAndCancel handleClose={handleClose}/>
        </form>
    }
}

SingleTextField.propTypes = {
    onChangeHandler: PropTypes.func,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    textFieldTitle: PropTypes.string,
    autoFocus: PropTypes.bool
}
export default SingleTextField
