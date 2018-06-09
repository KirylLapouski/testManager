import React from 'react'
import PropTypes from 'prop-types'
import EditableTest from './EditableTest'
import Accordion from '../decorators/Accordion'
import { connect } from 'react-redux'
import { loadQuestion } from '../../redux/AC/question'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Flag from '@material-ui/icons/Flag'
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { withRouter } from 'react-router-dom'
import { addQuestion } from '../../redux/AC/question'
import toastr from 'toastr'
import Button from '@material-ui/core/Button';
import Tooltip from 'material-ui/Tooltip';
import LoadTestModal from './LoadTestModal'
class TestContainer extends React.Component {
    state = {
        title: '',
        description: '',
        weight: 0,
        modalOpened:false
    }
    componentWillMount() {
        this.props.getQuestions(this.props.match.params.topicId)
    }

    handleChange = name => event => {
        if (name == 'weight' && (event.target.value == 1000 || event.target.value == 0))
            toastr.warning('Вес вопроса должен находится в интервале от 0 до 1000')
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmitNewQuestionForm = (e) => {
        e.preventDefault()

        var { title, description, weight } = this.state
        this.props.addQuestion(this.props.match.params.topicId, weight, title, description)
    }

    openModal = () =>{
        this.setState({
            modalOpened:true
        })
    }

    closeModal = ()=>{
        this.setState({
            modalOpened:false
        })
    }
    render() {
        return <div> <div className="z-depth-1 container" style={{ padding: '0px' }}>
            {this.props.questions.map((item, i) => {
                return <EditableTest key={item.id} editing={this.props.openedItem === item.id ? true : false} question={item} toggleOpenItem={this.props.toggleOpenItem} />
            })}
        </div>
            <ExpansionPanel className="z-depth-1 container" style={{ margin: '0 auto' }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ color: 'black' }}>Добавить вопрос</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails >
                    <form onSubmit={this.handleSubmitNewQuestionForm} style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-start' }}>
                        <div style={{ width: '60%', display: 'flex', alignItems: 'center' }}>
                            <TextField label="Вопрос" style={{ width: '90%' }} value={this.state.name} onChange={this.handleChange('title')} />
                            <Flag style={{ color: '#ff7961', width: '20px', height: '20px' }} />
                        </div>
                        <div style={{ width: '60%', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <TextField label="Вес вопроса" inputProps={{ min: '0', max: '1000' }} style={{ width: '90%' }} value={this.state.age} onChange={this.handleChange('weight')} type="number" />
                            <Flag style={{ color: '#ff7961', width: '20px', height: '20px' }} />
                        </div>
                        <TextField label="Пояснение к вопросу" multiline rowsMax="4" value={this.state.description} onChange={this.handleChange('description')} style={{ width: '100%' }} />
                        <Button style={{ alignSelf: 'flex-end', marginTop: '10px' }} type='submit'>Создать вопрос</Button>
                    </form>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <Tooltip id="tooltip-icon" title="Загрузить тест из файла" placement='left'>
                <Button variant="fab" onClick={this.openModal} color="primary" aria-label="add" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '2' }}>
                    <AttachFileIcon />
                </Button>
            </Tooltip>
            <LoadTestModal topicId={this.props.match.params.topicId} handleClose={this.closeModal} open={this.state.modalOpened}/>
        </div>
    }
}

this.propTypes = {
    //redux
    questions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        weight: PropTypes.number,
        topicId: PropTypes.number
    })),
    addQuestion: PropTypes.func,
    getQuestions: PropTypes.func,
    //accordion
    toggleOpenItem: PropTypes.func,
    openedItem: PropTypes.number
}

const mapStateToProps = (state, ownProps) => {
    var res = []
    for (var key in state.questions) {
        if (Number(ownProps.match.params.topicId) === state.questions[key].topicId) {
            res.push(state.questions[key])
        }
    }
    return { questions: res }
}

const mapDispatchToProps = dispatch => {
    return {
        getQuestions(topicId) {
            dispatch(loadQuestion(topicId))
        },
        addQuestion(topicId, weight, title, description) {
            dispatch(addQuestion(topicId, weight, title, description))
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Accordion(TestContainer)))
