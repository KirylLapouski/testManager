import React from 'react'
import ModalBase from "../ModalBase";
import { connect } from 'react-redux'
import DrugnDropFile from "../modal-content/DrugnDropFile";
import PropTypes from 'prop-types';
import { createTestFromFile } from '../../../redux/AC/question'
import toastr from 'toastr'
class TestFromFileModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            files: []
        }
    }
    sendFile = (file) => {
        try {
            this.props.uploadFile(this.props.topicId, file)
        }catch(e){
            //TODO: check not for all errors
            toastr.error(e.message)
        }
    }

    onFilesError =(error)=>{
        switch (error.code) {
            case 1:
                toastr.error('Неправильный тип файла', 'Ошибка при выборе файла')
                return
            case 2:
                toastr.error('Выбранный файл слишком большой', 'Ошибка при выборе файла')
                return
            case 3:
                toastr.error('Выбранный файл слишком маленький', 'Ошибка при выборе файла')
                return
            case 4:
                toastr.error('Превышено максимально допустимое количество файлов', 'Ошибка при выборе файла')
                return
            default:
                toastr.error('Ошибка при загрузке файла')
        }
    }
    handleFilesUpload = () => {
        Object.keys(this.state.files).forEach((key) => {
            this.sendFile(this.state.files[key])
        })
        this.props.handleClose()
    }

    onFilesChange = (files) => {
        this.setState({
            files
        })
    }
    render() {
        var { open, handleClose } = this.props
        return <ModalBase title={'Создать курс'} open={open} width='800px' minHeight='400px' handleClose={handleClose}>
            <DrugnDropFile onFilesChange={this.onFilesChange}
            handleClose={handleClose}
            handleFilesUpload={this.handleFilesUpload}
            onFilesError={this.onFilesError}
            files={this.state.files}/>
        </ModalBase>
    }
}

TestFromFileModal.propTypes = {
    handleClose: PropTypes.func,
    open: PropTypes.bool,
    topicId: PropTypes.string
}
const mapDispatchToProps = dispatch => {
    return {
        uploadFile(topicId, file) {
            dispatch(createTestFromFile(topicId, file))
        }
    }
}

export default connect(null, mapDispatchToProps)(TestFromFileModal)
