import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Modal from '@material-ui/core/Modal';
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Files from 'react-files'
import ClearIcon from '@material-ui/icons/Clear'
import ClipIcon from '@material-ui/icons/AttachFile'
import YouTubeIcon from '@material-ui/icons/YoutubeSearchedFor'
import { addTopic } from '../../redux/AC/topic'
import {addFileToUser} from '../../redux/AC/users'
import { connect } from 'react-redux'
import toastr from 'toastr'
import isUrl from 'is-url'
import url from 'url'
var initVideo = '<p style=\"text-align:center\">\n<iframe width=\"100%\"  height=\"600\"  src=\"|https://www.youtube.com/embed/ioC2wj4CKss\|" frameBorder=\"0\"></iframe>\n</p>\n'
const modalStyles = { width: '840px', height: '320px', color: 'black', padding: 20, boxShadow: 'inset 0px 0px 5px rgba(154, 147, 140, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' };

class TopicModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            file: {}
        }
    }

    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleDrop = (files) => {
        this.setState({
            file:files[0]
        },()=>{
            console.log(this.state.file )
        })
    }

    filesRemoveAll = () => {
        this.refs.files.removeFiles()
    }

    upload = () => {
        // if (!filefield.files[0].type.match('image.*'))
        //     throw new Error('Фотография пользователя должна быть изображением','Ошибка отправки формы');
        if(!this.state.title){
            toastr.error('Поле заголовка является обязательным','Ошибка отправки формы')
            return
        }

        if(Object.keys( this.state.file).length === 0 ){
            toastr.error('Выберите файл','Ошибка отправки формы')
            return
        }

        
        var { userId, addFileToUser } = this.props
        var sendingForm = new FormData()
        sendingForm.append('file', this.state.file)
        addFileToUser(userId, sendingForm)
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

    parseVideoForYouTube(url) {
        const youtube = 'https://www.youtube.com/embed/'
        var videoId = url.split("=")
        var result = youtube.concat(videoId[1])
        return result
    }

    checkIsHostUrl(urlAdress, domen) {
        if (!urlAdress) return false
        var parsedUrl = url.parse(urlAdress)
        if (parsedUrl.host == domen)
            return true
        return false
    }
    handleYouTubeClick = () => {
        //TODO: check that is youtube video and validate
        const src = window.prompt('Введите URL видео с youtube:')
        if (!src)
            return
        if (!isUrl(src)) {
            toastr.error('Введённая строка не является url')
            return
        }
        if (this.checkIsHostUrl(src, 'www.youtube.com')) {
            var parsedUrl = this.parseVideoForYouTube(src)
        } else {
            toastr.error('Это видео не принадлежит youtube.com')
            return
        }
        if(!this.state.title){
            toastr.error('Поле заголовка является обязательным','Ошибка отправки формы')
            return
        }
        var node = initVideo
        var node = node.split('|')
        node[1] = parsedUrl
        //TODO: new reducer
        this.props.createTopic(this.props.lessonId, node.join(''), this.state.title)
        this.props.handleClose()
        toastr.success('Новый топик был успешно добавлен')
    }

    handleSoundCloudClick = () => {
        //TODO: check that is youtube video and validate
        const src = window.prompt('Введите URL с sound cloud:')
        if (!src) return
        if (!isUrl(src)) {
            toastr.error('Введённая строка не является url')
            return
        }
        if (!this.checkIsHostUrl(src, 'soundcloud.com')) {
            toastr.error('Это видео не принадлежит soundcloud.com')
            return
        }
        if(!this.state.title){
            toastr.error('Поле заголовка является обязательным','Ошибка отправки формы')
            return
        }

        var node = initVideo
        var node = node.split('|')
        node[1] = src
        //TODO: new reducer
        this.props.createTopic(this.props.lessonId, node.join(''), this.state.title)
        this.props.handleClose()
        toastr.success('Новый топик был успешно добавлен')
    }

    handleClose = ()=>{
        this.setState({
            title:'',
            files:[]
        })
        this.props.handleClose()
    }
    render() {
        var {file} = this.state
        return (<div>
            <Modal open={this.props.open} onClose={this.handleClose}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '400px', width: '900px', position: 'absolute', left: '50%', marginLeft: `-${900 / 2}px`, top: '50%', marginTop: `-${400 / 2}px`, background: 'white', paddingLeft: '30px', paddingBottom: '30px', paddingRight: '30px' }}>
                    <div style={{ width: '900px', backgroundColor: '#757ce8', height: '40px', marginLeft: '-30px' }}>
                        <Button style={{ float: 'right' }} onClick={this.props.handleClose}>
                            <ClearIcon style={{ color: 'white' }} />
                        </Button>
                    </div>
                    <h3>Создать топик</h3>

                    <TextField name='title' onChange={this.handleChange} InputProps={{ disableUnderline: true }} placeholder='Название урока' style={{ width: '840px', color: 'black', padding: '10px', paddingLeft: 20, marginBottom: '20px', boxShadow: 'inset 0px 0px 5px rgba(154, 147, 140, 0.5)' }} />
                    <div id="react-file-drop-demo" style={{ border: '1px dashed grey', textAlign: 'center' }}>

                        {
                            Object.keys(this.state.file).length !== 0
                                ? <div className='files-list' style={{ width: '840px', display:'flex', justifyContent:'center', alignItems:'center', height: '168px'}}>
                                    <ul style={{listStyle:'none'}}>{Object.keys(file).length !== 0 &&
                                        <li className='files-list-item' key={file.id}>
                                            <div className='files-list-item-preview'>
                                                {file.preview.type === 'image'
                                                    ? <img className='files-list-item-preview-image' src={file.preview.url} />
                                                    : <div className='files-list-item-preview-extension'>{file.extension}</div>}
                                            </div>
                                            <div className='files-list-item-content'>
                                                <div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
                                                <div className='files-list-item-content-item files-list-item-content-item-2'>{file.sizeReadable}</div>
                                            </div>
                                        </li>
                                    }</ul>
                                </div>
                                : <Files ref='files' onChange={this.handleDrop} onError={this.onFilesError} maxFiles={1} style={{ cursor: 'pointer', width: '840px', height: '168px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} accepts={['image/*', 'audio/*', 'video/*', 'text/html']} clickable>
                                    Перетащите файлы сюда<br />
                                    или<br />
                                    Выберите файл на компьютере
                            </Files>
                        }
                    </div>
                    <div style={{ display: 'flex', alignSelf: 'flex-end', marginTop: '45px', width: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ margin: 'auto', marginLeft: '0px' }}>
                            <Button onClick={this.handleYouTubeClick}><i className="fa fa-youtube-play" style={{ fontSize: '2em' }}  aria-hidden="true"></i></Button>
                            <Button onClick={this.handleSoundCloudClick} ><i className="fa fa-soundcloud" style={{ fontSize: '2em' }}  aria-hidden="true"></i></Button>
                        </div>
                        <Button onClick={this.handleClose}>Отмена</Button>
                        <Button onClick={this.upload} variant="raised" color="primary">Создать</Button>
                    </div>

                </div>
            </Modal>
        </div>
        )
    }
}

TopicModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    lessonId: PropTypes.number,
    //redux
    createTopic: PropTypes.func,
    addFileToUser: PropTypes.func
}

const mapDispatchToProps = dispatch => {
    return {
        createTopic(lessonId, node, title) {
            dispatch(addTopic(lessonId, node, title))
        },
        addFileToUser(userId, form){
            dispatch(addFileToUser(userId, form))
        }
    }
}
export default connect(null, mapDispatchToProps)(TopicModal)
