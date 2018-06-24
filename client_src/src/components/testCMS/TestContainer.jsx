import React from 'react'
import PropTypes from 'prop-types'
import EditableTest from './EditableTest'
import Accordion from '../decorators/Accordion'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Flag from '@material-ui/icons/Flag'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import Button from '@material-ui/core/Button'
import Tooltip from 'material-ui/Tooltip'
import TestFromFileModal from '../modal/modal-total/TestFromFileModal'
//TODO: can rewrite on function
class TestContainer extends React.Component {

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
                <form onSubmit={this.props.handleSubmitNewQuestionForm} style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-start' }}>
                    <div style={{ width: '60%', display: 'flex', alignItems: 'center' }}>
                        <TextField label="Вопрос" style={{ width: '90%' }} value={this.props.name} onChange={this.props.handleChange('title')} />
                        <Flag style={{ color: '#ff7961', width: '20px', height: '20px' }} />
                    </div>
                    <div style={{ width: '60%', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <TextField label="Вес вопроса" inputProps={{ min: '0', max: '1000' }} style={{ width: '90%' }} value={this.props.weight} onChange={this.props.handleChange('weight')} type="number" />
                        <Flag style={{ color: '#ff7961', width: '20px', height: '20px' }} />
                    </div>
                    <TextField label="Пояснение к вопросу" multiline rowsMax="4" value={this.props.description} onChange={this.props.handleChange('description')} style={{ width: '100%' }} />
                    <Button style={{ alignSelf: 'flex-end', marginTop: '10px' }} type='submit'>Создать вопрос</Button>
                </form>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <Tooltip id="tooltip-icon" title="Загрузить тест из файла" placement='left'>
            <Button variant="fab" onClick={this.props.openModal} color="primary" aria-label="add" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '2' }}>
                <AttachFileIcon />
            </Button>
        </Tooltip>
        <TestFromFileModal topicId={this.props.match.params.topicId} handleClose={this.props.closeModal} open={this.props.modalOpened} />
        </div>
    }
}

this.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    weight: PropTypes.number,
    modalOpened: PropTypes.bool,
    handleChange: PropTypes.func,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    handleSubmitNewQuestionForm: PropTypes.func,
    questions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        weight: PropTypes.number,
        topicId: PropTypes.number
    })),
    //accordion
    toggleOpenItem: PropTypes.func,
    openedItem: PropTypes.number
}


export default Accordion(TestContainer)
