import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear'
import Modal from '@material-ui/core/Modal'
import { attachUserToCource } from '../redux/AC/users'
import { connect } from "react-redux";
//TODO: куда выносить запросы не меняющие state
class AttachToCourseModal extends React.Component {

    state = {
        title: ''
    }

    handleSubmitClick = () => {
        //TODO: toastr after ac done
        this.props.attachUserToCource(this.props.userId, this.state.title)
        this.props.handleClose()
    }

    onChangeHandler = (e) => {
        var { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    render() {
        return <Modal open={this.props.open} onClose={this.props.handleClose} >
            <div style={{ display: 'flex', flexDirection: 'column', height: '200px', width: '400px', position: 'absolute', left: '50%', marginLeft: `-${400 / 2}px`, top: '50%', marginTop: `-${200 / 2}px`, background: 'white', paddingLeft: '30px', paddingBottom: '30px', paddingRight: '30px' }}>
                <div style={{ width: '400px', backgroundColor: '#757ce8', height: '40px', marginLeft: '-30px' }}>
                    <Button style={{ float: 'right' }} onClick={this.props.handleClose}>
                        <ClearIcon style={{ color: 'white' }} />
                    </Button>
                </div>
                <h3>Присоединится к курсу</h3>

                <TextField name='title' onChange={this.onChangeHandler} InputProps={{ disableUnderline: true }} placeholder='Код курса' style={{ width: '100%', color: 'black', padding: '10px', alignSelf: 'center', paddingLeft: 20, marginBottom: '20px', boxShadow: 'inset 0px 0px 5px rgba(154, 147, 140, 0.5)' }} />

                <div style={{ display: 'flex', alignSelf: 'flex-end' }}>
                    <Button onClick={this.props.handleClose}>Отмена</Button>
                    <Button onClick={this.handleSubmitClick} variant="raised" color="primary">Присоединится</Button>
                </div>

            </div>
        </Modal>
    }
}

AttachToCourseModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    //redux
    userId: PropTypes.number,

}

const mapStateToProps = (state) => {
    return {
        userId: state.users.loggedIn && state.users.loggedIn.id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        attachUserToCource(userId,secretWord){
            dispatch(attachUserToCource(userId,secretWord))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AttachToCourseModal)