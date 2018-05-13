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
const modalStyles = {  width:'840px',height:'320px', color: 'black', padding: 20, boxShadow:'inset 0px 0px 5px rgba(154, 147, 140, 0.5)',display:'flex',justifyContent:'center', alignItems:'center', textAlign:'center' };

class TopicModal extends React.Component {
    handleDrop = (files, event) => {
        console.log(files, event);
    }
    render() {
        return (<div>
            <Modal open={this.props.open} onClose={this.props.handleClose}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '400px', width: '900px', position: 'absolute', left: '50%', marginLeft: `-${900 / 2}px`, top: '50%', marginTop: `-${400 / 2}px`, background: 'white', paddingLeft: '30px', paddingBottom: '30px', paddingRight: '30px' }}>
                    <div style={{ width: '900px', backgroundColor: '#757ce8', height: '40px',marginLeft:'-30px' }}>
                        <Button style={{ float:'right'}} onClick={this.props.handleClose}>
                            <ClearIcon style={{ color: 'white' }} />
                        </Button>
                    </div>
                    <h3>Создать топик</h3>

                    <div id="react-file-drop-demo" style={modalStyles}>
                        <FileDrop onDrop={this.handleDrop}>
                            Перетащите файлы сюда<br/>
                            или<br/>
                            <Button style={{backgroundColor:'#CFD8DC'}}>Выберите файл на компьютере</Button>
                        </FileDrop>
                    </div>
                    <div style={{ display: 'flex', alignSelf: 'flex-end', marginTop: '45px',width:'100%',justifyContent:'flex-end' }}>
                        <div style={{margin:'auto',marginLeft:'0px'}}>
                        <Button ><ClipIcon/></Button>
                        <Button ><i class="fa fa-youtube-play" style={{fontSize:'2em'}} aria-hidden="true"></i></Button>
                        <Button ><i class="fa fa-soundcloud"  style={{fontSize:'2em'}} aria-hidden="true"></i></Button>
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
    handleClose: PropTypes.func
}

export default TopicModal
