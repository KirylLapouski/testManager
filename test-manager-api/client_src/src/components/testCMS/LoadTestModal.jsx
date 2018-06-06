import React from 'react'
import Modal from 'material-ui/Modal'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
import Files from 'react-files'
import toastr from "toastr";
import { connect } from "react-redux";
import { createTestFromFile } from '../../redux/AC/question'
//TODO: add first lesson 
class LoadTestModal extends React.Component {
    state = {
        files: []
    }

    onFilesChange = (files) => {
        this.setState({
            files
        })
    }
    filesRemoveOne = (file) => {
        this.refs.files.removeFile(file)
    }

    filesRemoveAll = () => {
        this.refs.files.removeFiles()
    }
    onFilesError = (error, file) => {
        this.filesRemoveAll()
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

    sendFile = (file) => {
        try {
            this.props.uploadFile(this.props.topicId, file)
        }catch(e){
            //TODO: check not for all errors
            toastr.error(e.message)
        }
    }

    handleFilesUpload = () => {
        Object.keys(this.state.files).forEach((key) => {
            this.sendFile(this.state.files[key])
        })
        this.props.handleClose()
    }
    render() {
        return <Modal open={this.props.open} onClose={this.props.handleClose}>
            <div style={{ display: 'flex', minHeight: '360px', flexDirection: 'column', maxHeight: '600px', width: '800px', position: 'absolute', left: '50%', marginLeft: `-${800 / 2}px`, top: '50%', marginTop: `-${600 / 2}px`, background: 'white', padding: '30px' }}>
                <h3>Загрузить тест</h3>
                <Files ref='files' onChange={this.onFilesChange} multiple onError={this.onFilesError} style={{ cursor: 'pointer', width: '100%', height: '168px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed grey', textAlign: 'center' }} accepts={['text/plain']} clickable>
                    Перетащите файлы сюда<br />
                    или<br />
                    Выберите файл на компьютере
                    </Files>
                <Button onClick={this.filesRemoveAll}>Remove All Files</Button>
                {this.state.files.length > 0
                    ? <div style={{ minHeight: '215px', maxHeight: '215px', display: 'flex', overflow: 'scroll' }} className='files-list'>
                        <ul style={{ listStyle: 'none', width: '700px', display: 'flex', flexDirection: 'column', textAlign: 'center', minHeight: '215px', maxHeight: '215px' }}>{this.state.files.map((file) =>
                            <li className='files-list-item' key={file.id}>
                                <div className='files-list-item-preview'>
                                    <div className='files-list-item-preview-extension'>{file.extension}</div>
                                </div>
                                <div className='files-list-item-content'>
                                    <div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
                                    <div className='files-list-item-content-item files-list-item-content-item-2'>{file.sizeReadable}</div>
                                </div>
                                <div
                                    id={file.id}
                                    className='files-list-item-remove'
                                    onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
                                />
                            </li>
                        )}</ul>
                    </div>
                    : <div style={{ maxHeight: '215px' }}></div>
                }
                <div style={{ display: 'flex', alignSelf: 'flex-end', marginTop: '10px' }}>
                    <Button onClick={this.props.handleClose}>Отмена</Button>
                    <Button onClick={this.handleFilesUpload} type="submit" variant="raised" color="primary">Создать</Button>
                </div>
            </div>
        </Modal>
    }
}

LoadTestModal.propTypes = {
    open: PropTypes.bool,
    topicId: PropTypes.number,
    handleClose: PropTypes.func,
    //redux
    uploadFile: PropTypes.func
}

const mapDispatchToProps = dispatch => {
    return {
        uploadFile(topicId, file) {
            dispatch(createTestFromFile(topicId, file))
        }
    }
}
export default connect(null,mapDispatchToProps)(LoadTestModal)