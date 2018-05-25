import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Modal from 'material-ui/Modal'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import FileDrop from 'react-file-drop'
import ClearIcon from '@material-ui/icons/Clear'
import ClipIcon from '@material-ui/icons/AttachFile'
import YouTubeIcon from '@material-ui/icons/YoutubeSearchedFor'
import { addTopic } from '../../redux/AC/topic'
import { connect } from 'react-redux'
import toastr from 'toastr'
import isUrl from 'is-url'
import url from 'url'   
var initVideo = '<p style="text-align:center;">\n<iframe width=\"1100\" height=\"600\"  src=\"|https://www.youtube.com/embed/ioC2wj4CKss\|" frameBorder=\"0\"></iframe>\n</p>\n'
const modalStyles = { width: '840px', height: '320px', color: 'black', padding: 20, boxShadow: 'inset 0px 0px 5px rgba(154, 147, 140, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' };

class TopicModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: ' '
        }
    }

    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleDrop = (files, event) => {
        console.log(files, event);
    }

    parseVideoForYouTube(url) {
        const youtube = 'https://www.youtube.com/embed/'
        var videoId = url.split("=")
        var result = youtube.concat(videoId[1])
        return result
    }

    checkIsHostUrl(urlAdress,domen) {
        if(!urlAdress) return false
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
        if( this.checkIsHostUrl(src,'www.youtube.com')){
            var parsedUrl = this.parseVideoForYouTube(src)
            console.log(parsedUrl)
        }else{
            toastr.error('Это видео не принадлежит youtube.com')
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
        if( !this.checkIsHostUrl(src,'soundcloud.com')){
            toastr.error('Это видео не принадлежит soundcloud.com')
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
    render() {
        return (<div>
            <Modal open={this.props.open} onClose={this.props.handleClose}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '400px', width: '900px', position: 'absolute', left: '50%', marginLeft: `-${900 / 2}px`, top: '50%', marginTop: `-${400 / 2}px`, background: 'white', paddingLeft: '30px', paddingBottom: '30px', paddingRight: '30px' }}>
                    <div style={{ width: '900px', backgroundColor: '#757ce8', height: '40px', marginLeft: '-30px' }}>
                        <Button style={{ float: 'right' }} onClick={this.props.handleClose}>
                            <ClearIcon style={{ color: 'white' }} />
                        </Button>
                    </div>
                    <h3>Создать топик</h3>

                    <TextField name='title' onChange={this.handleChange} InputProps={{ disableUnderline: true }} placeholder='Название урока' style={{ width: '840px', color: 'black', padding: '10px', paddingLeft: 20, marginBottom: '20px', boxShadow: 'inset 0px 0px 5px rgba(154, 147, 140, 0.5)' }} />
                    <div id="react-file-drop-demo" style={modalStyles}>
                        <FileDrop onDrop={this.handleDrop}>
                            Перетащите файлы сюда<br />
                            или<br />
                            <Button style={{ backgroundColor: '#CFD8DC' }}>Выберите файл на компьютере</Button>
                        </FileDrop>
                    </div>
                    <div style={{ display: 'flex', alignSelf: 'flex-end', marginTop: '45px', width: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ margin: 'auto', marginLeft: '0px' }}>
                            <Button ><ClipIcon /></Button>
                            <Button ><i className="fa fa-youtube-play" style={{ fontSize: '2em' }} onClick={this.handleYouTubeClick} aria-hidden="true"></i></Button>
                            <Button ><i className="fa fa-soundcloud" style={{ fontSize: '2em' }} onClick={this.handleSoundCloudClick} aria-hidden="true"></i></Button>
                        </div>
                        <Button onClick={this.props.handleClose}>Отмена</Button>
                        <Button variant="raised" color="primary">Создать</Button>
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
    createTopic: PropTypes.func
}

const mapDispatchToProps = dispatch => {
    return {
        createTopic(lessonId, node, title) {
            dispatch(addTopic(lessonId, node, title))
        }
    }
}
export default connect(null, mapDispatchToProps)(TopicModal)
