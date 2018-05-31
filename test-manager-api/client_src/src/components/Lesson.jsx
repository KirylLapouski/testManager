import React from 'react';
import UserInfo from './UserInfo';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TopicModal from './topic/TopicModal';
import TopicList from './TopicList'
import { connect } from 'react-redux'
import { loadTopics } from '../redux/AC/topic'
import { deleteLesson, editLesson } from '../redux/AC/lessons'
import toastr from 'toastr'
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
class Lesson extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topicsOpened: false,
            modalOpened: false,
            edditing: false,
            title: '',
            description: '' 
        }
    }

    componentWillMount() {
        this.props.getTopics(this.props.id)
    }
    handleModalClose = () => {
        this.setState({
            modalOpened: false
        })
    }
    handleModalOpen = () => {
        this.setState({
            modalOpened: true
        })
    }
    handleTopicsClick = () => {
        this.setState({ topicsOpened: !this.state.topicsOpened });
    };

    handleDeleteClick = () => {
        this.props.deleteLesson(this.props.id)
        toastr.success('Урок успешно удалён')
    }
    handleEditableHeaderClick = (e) => {
        e.preventDefault()
    }

    toggleEdditing = () => {
        this.setState(prevState => {
            return {
                edditing: !prevState.edditing
            }
        })
    }

    handleInputChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmitEditLesson = () => {
        this.props.editLesson(this.props.id,this.state.title, this.state.description)
        //TODO:: rewrite on refs
        //TODO: need new reducer that check that change 
        toastr.success('Урок изменён')
        this.toggleEdditing()
    }
    render() {
        var readOnlyexpantionPanel = <ExpansionPanelDetails style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '0px', textAlign: 'left' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button onClick={this.handleDeleteClick} style={{ color: 'white', boxShadow: 'none', backgroundColor: 'rgba(0,0,0,0)' }} variant="fab"  >
                    <DeleteIcon />
                </Button>
                <hr style={{ width: '69%', backgroundColor: 'white', margin: '0px', alignSelf: 'center' }} />
                <Button style={{ color: 'white', boxShadow: 'none', backgroundColor: 'rgba(0,0,0,0)' }} variant="fab" onClick={this.toggleEdditing} >
                    <EditIcon />
                </Button>
                <Button style={{ color: 'white', boxShadow: 'none', backgroundColor: 'rgba(0,0,0,0)' }} variant="fab" onClick={this.handleModalOpen}  >
                    <AddIcon />
                </Button>
                <div style={{ clear: 'both' }} />
            </div>
            <Typography style={{ color: 'white', marginLeft: '5px' }}>
                {this.props.description}
            </Typography>
        </ExpansionPanelDetails>

        var edditingExpantionPanel = <ExpansionPanelDetails style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', paddingBottom: '0px', textAlign: 'left' }}>
            <TextField name='description' onChange={this.handleInputChange}  InputProps={{ disableUnderline: true }} multiline={true} placeholder='Описание урока' rows='5' style={{ marginLeft: '61px', backgroundColor: 'white', opacity: '0.9', borderRadius: '4px', width: '91%', padding: '10px' }} />
            <div style={{ alignSelf: 'flex-end', marginTop: '10px', marginRight: '3px' }}>
                <Button onClick={this.toggleEdditing} style={{ marginRight: '5px' }}>Отмена</Button>
                <Button onClick={this.handleSubmitEditLesson} variant="raised" color="primary">Создать</Button>
            </div>
        </ExpansionPanelDetails>

        return ( <Slide direction="up" in={true} timeout={600} mountOnEnter unmountOnExit>
            <div>
            <ExpansionPanel style={{ marginTop: "20px", paddingBottom: '10px', backgroundColor: 'grey', backgroundImage: 'url("https://lh4.googleusercontent.com/-64uhpsHBEZw/VMqrG_6wowI/AAAAAAAAAIE/_Pw_QoP0opU/w1005-h214-no/123_rainbowtriangle_teal.jpg")' }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}>
                    <UserInfo disabled={true} style={{ float: "left" }} />
                    {/* TODO: спорное решение с Link */}
                    {/* TODO: click lesson click error */}
                    {this.state.edditing ? <TextField name='title' onChange={this.handleInputChange} InputProps={{ disableUnderline: true }} placeholder='Название урока' onClick={this.handleEditableHeaderClick} style={{ backgroundColor: 'white', padding: '10px', opacity: '0.9', borderRadius: '4px', width: '85%' }} /> : <Link to={`/lesson/${this.props.id}/topic/${this.props.topics[0] ? this.props.topics[0].id : null}`} style={{ height: "20px" }}>{this.props.title}</Link>}
                </ExpansionPanelSummary>
                {this.state.edditing ? edditingExpantionPanel : readOnlyexpantionPanel}
            </ExpansionPanel>
            <TopicList lessonId={this.props.id} topicsOpened={this.state.topicsOpened} handleTopicsClick={this.handleTopicsClick} topics={this.props.topics} />
            <TopicModal open={this.state.modalOpened} handleClose={this.handleModalClose} lessonId={this.props.id} />
            </div>
        </Slide>)
    }
}


Lesson.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    //redux
    topics: PropTypes.arrayOf(PropTypes.object),
    getTopics: PropTypes.func,
    deleteLesson: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var res = []
    for (var key in state.topics) {
        if (Number(ownProps.id) === state.topics[key].lessonId) {
            res.push(state.topics[key])
        }
    }
    return { topics: res }
}

const mapDispatchToProps = dispatch => {
    return {
        getTopics(lessonID) {
            dispatch(loadTopics(lessonID))
        },
        deleteLesson(lessonId) {
            dispatch(deleteLesson(lessonId))
        },
        editLesson(lessonId, title, desctiption) {
            dispatch(editLesson(lessonId, title, desctiption))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson)