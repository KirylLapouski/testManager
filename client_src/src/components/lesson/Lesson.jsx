import React from 'react';
import UserInfo from '../UserInfo';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TopicModal from '../modal/modal-total/TopicModal';
import TopicList from './TopicListInLesson'
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
class Lesson extends React.Component {
    handleHeaderInputChange = (e) => {
        e.stopPropagation()
        this.props.handleInputChange(e)
    }

    render() {
        var { id, topics, title, topics, loggedUserId, lessonOwner, topicsOpened, modalOpened, edditing, handleDeleteClick, toggleEdditing, handleModalOpen, description, handleInputChange, handleSubmitEditLesson, handleTopicsClick, handleModalClose, handleCancelEdditingClick, edditing } = this.props
        var readOnlyexpantionPanel = <ExpansionPanelDetails style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '0px', textAlign: 'left' }}>
            {loggedUserId === lessonOwner.id && <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button onClick={handleDeleteClick} style={{ color: 'white', boxShadow: 'none', backgroundColor: 'rgba(0,0,0,0)' }} variant="fab"  >
                    <DeleteIcon />
                </Button>
                <hr style={{ width: '69%', backgroundColor: 'white', margin: '0px', alignSelf: 'center' }} />
                <Button style={{ color: 'white', boxShadow: 'none', backgroundColor: 'rgba(0,0,0,0)' }} variant="fab" onClick={toggleEdditing} >
                    <EditIcon />
                </Button>
                <Button style={{ color: 'white', boxShadow: 'none', backgroundColor: 'rgba(0,0,0,0)' }} variant="fab" onClick={handleModalOpen}  >
                    <AddIcon />
                </Button>
                <div style={{ clear: 'both' }} />
            </div>}
            <Typography style={{ color: 'white', marginLeft: '5px' }}>
                {description}
            </Typography>
        </ExpansionPanelDetails>

        var edditingExpantionPanel = <ExpansionPanelDetails style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', paddingBottom: '0px', textAlign: 'left' }}>
            <TextField name='description' onChange={this.handleHeaderInputChange} InputProps={{ disableUnderline: true }} multiline={true} placeholder='Описание урока' rows='5' style={{ marginLeft: '61px', backgroundColor: 'white', opacity: '0.9', borderRadius: '4px', width: '91%', padding: '10px' }} />
            <div style={{ alignSelf: 'flex-end', marginTop: '10px', marginRight: '3px' }}>
                <Button onClick={handleCancelEdditingClick} style={{ marginRight: '5px' }}>Отмена</Button>
                <Button onClick={handleSubmitEditLesson} variant="raised" color="primary">Создать</Button>
            </div>
        </ExpansionPanelDetails>
        return (<Slide direction="up" in={true} timeout={600} mountOnEnter unmountOnExit>
            <div>
                {/* TODO: expand when edditing */}
                <ExpansionPanel style={{ marginTop: "20px", paddingBottom: '10px', backgroundColor: 'grey', backgroundImage: 'url("https://lh4.googleusercontent.com/-64uhpsHBEZw/VMqrG_6wowI/AAAAAAAAAIE/_Pw_QoP0opU/w1005-h214-no/123_rainbowtriangle_teal.jpg")' }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}>
                        <UserInfo disabled={true} userId={lessonOwner && lessonOwner.id} style={{ float: "left" }} />
                        {/* TODO: спорное решение с Link */}
                        {/* TODO: click lesson click error */}
                        {edditing ? <TextField name='title' onChange={handleInputChange} InputProps={{ disableUnderline: true }} placeholder='Название урока' onClick={this.handleEditableHeaderClick} style={{ backgroundColor: 'white', padding: '10px', opacity: '0.9', borderRadius: '4px', width: '85%' }} /> : <Link to={`/lesson/${id}/topic/${topics[0] ? topics[0].id : null}`} style={{ height: "20px" }}>{title}</Link>}
                    </ExpansionPanelSummary>
                    {edditing ? edditingExpantionPanel : readOnlyexpantionPanel}
                </ExpansionPanel>
                <TopicList lessonId={id} topicsOpened={topicsOpened} handleTopicsClick={handleTopicsClick} topics={topics} />
                <TopicModal open={modalOpened} handleClose={handleModalClose} lessonId={id} />
            </div>
        </Slide>)
    }
}


Lesson.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    lessonOwner: PropTypes.shape({
        id: PropTypes.number
    }),
    loggedUserId: PropTypes.number,
    handleModalClose: PropTypes.func,
    handleModalOpen: PropTypes.func,
    handleTopicsClick: PropTypes.func,
    handleDeleteClick: PropTypes.func,
    toggleEdditing: PropTypes.func,
    handleInputChange: PropTypes.func,
    handleSubmitEditLesson: PropTypes.func,
    handleCancelEdditingClick: PropTypes.func,
    topicsOpened: PropTypes.bool,
    modalOpened: PropTypes.bool,
    edditing: PropTypes.bool
}

export default Lesson