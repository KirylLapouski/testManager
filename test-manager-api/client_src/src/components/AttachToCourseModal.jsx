import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear'
import Modal from '@material-ui/core/Modal'
class AttachToCourseModal extends React.Component {

    render() {
        return <Modal open={this.props.open} onClose={this.props.handleClose} >
            <div style={{ display: 'flex', flexDirection: 'column', height: '400px', width: '400px', position: 'absolute', left: '50%', marginLeft: `-${900 / 2}px`, top: '50%', marginTop: `-${400 / 2}px`, background: 'white', paddingLeft: '30px', paddingBottom: '30px', paddingRight: '30px' }}>
                <div style={{ width: '100%', backgroundColor: '#757ce8', height: '40px', marginLeft: '-30px' }}>
                    <Button style={{ float: 'right' }} onClick={this.props.handleClose}>
                        <ClearIcon style={{ color: 'white' }} />
                    </Button>
                </div>
                <h3>Присоединится к курсу</h3>

                <TextField name='title' onChange={this.handleChange} InputProps={{ disableUnderline: true }} placeholder='Код курса' style={{ width: '80%', color: 'black', padding: '10px', paddingLeft: 20, marginBottom: '20px', boxShadow: 'inset 0px 0px 5px rgba(154, 147, 140, 0.5)' }} />

                <div style={{ display: 'flex' }}>
                    <Button onClick={this.props.handleClose}>Отмена</Button>
                    <Button variant="raised" color="primary">Присоединится</Button>
                </div>

            </div>
        </Modal>
    }
}

AttachToCourseModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
}
export default AttachToCourseModal