import React from 'react'
import PropTypes from 'prop-types'
import { attachUserToCource } from '../../../redux/AC/users'
import { connect } from "react-redux";
import ModalBase from "../ModalBase";
import SingleTextField from '../modal-content/SingleTextField'
class AttachToCourseModal extends React.Component {
    constructor(props){
        super(props)

        this.state ={
            secretWord:''
        }
    }
    handleSubmit = (e) => {
        //TODO: toastr after ac done
        e.preventDefault()
        this.props.attachUserToCource(this.props.userId, this.state.secretWord)
        this.props.handleClose()
    }

    onChangeHandler = (e) => {
        var { value } = e.target
        this.setState({
            secretWord: value
        })
    }
    render() {
        var {open,handleClose} = this.props
        return <ModalBase title={'Присоединится к курсу'}  width='350px' minHeight="250px" open={open} handleClose={handleClose}>
            <SingleTextField handleClose={handleClose} onChangeHandler={this.onChangeHandler} handleSubmit={this.handleSubmit}/>
        </ModalBase>
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
export default connect(mapStateToProps, mapDispatchToProps)(AttachToCourseModal)
