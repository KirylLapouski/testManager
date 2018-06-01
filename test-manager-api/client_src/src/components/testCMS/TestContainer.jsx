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
import { Button } from 'material-ui';
class TestContainer extends React.Component {
    state = {
        title: '',
        description: ''
    }
    componentWillMount() {
        this.props.getQuestions(this.props.match.params.topicId)
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return <div> <div className="z-depth-1 container" style={{ padding: '0px' }}>
            {this.props.questions.map((item, i) => {
                return <EditableTest key={item.id} editing={this.props.openedItem === i + 1 ? true : false} question={item} toggleOpenItem={this.props.toggleOpenItem} />
            })}
        </div>
            <ExpansionPanel className="z-depth-1 container" style={{margin:'0 auto'}}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ color: 'black' }}>Добавить вопрос</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails >
                    <form>
                        <TextField
                            id="name"
                            label="Name"
                            value={this.state.name}
                            margin="normal"
                            value={this.state.name}
                            onChange={this.handleChange('title')}
                        />
                        <TextField
                            id="multiline-flexible"
                            label="Multiline"
                            multiline
                            rowsMax="4"
                            value={this.state.multiline}
                            onChange={this.handleChange('description')}
                            margin="normal"
                        />
                        <Button type='submit'>Создать вопрос</Button>
                    </form>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    }
}

this.propTypes = {
    //redux
    questions: PropTypes.arrayOf({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        weight: PropTypes.number,
        topicId: PropTypes.number
    }),
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Accordion(TestContainer))