import React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
class SingleTextField extends React.Component {
    render() {
        var { onChangeHandler, handleClose, handleSubmit } = this.props
        return <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width:'100%' }}>
            <TextField style={{ width: '100%' }} onChange={onChangeHandler} id="name" label="Название урока" name="title" margin="normal" />
            <div style={{ display: 'flex', alignSelf: 'flex-end', position: 'relative', bottom: '-10px', marginTop: '25px' }}>
                <Button onClick={handleClose}>Отмена</Button>
                <Button variant="raised" type='submit' color="primary">Принять</Button>
            </div>
        </form>
    }
}

SingleTextField.propTypes = {
    onChangeHandler: PropTypes.func,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func
}
export default SingleTextField
