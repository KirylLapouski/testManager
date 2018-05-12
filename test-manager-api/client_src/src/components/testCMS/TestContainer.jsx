import React from 'react'
import PropTypes from 'prop-types'
import EditableTest from './EditableTest'
import Accordion from '../decorators/Accordion'
import { connect } from 'react-redux'
import { loadQuestion } from '../../redux/AC/question'
class TestContainer extends React.Component {
    componentWillMount() {
        this.props.getQuestions(this.props.match.params.topicId)
    }
    render() {
        return <div className="z-depth-1 container" style={{ padding: '0px' }}>
            {this.props.questions.map((item, i) => {
                //TODO: normal key and id
                return <EditableTest key={i + 1} id={i + 1} testType="checkbox" editing={this.props.openedItem === i + 1 ? true : false} question={item} toggleOpenItem={this.props.toggleOpenItem} />
            })}
        </div>
    }
}

this.propTypes = {
    questions: PropTypes.array,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string
        })
    ),
    getQuestions: PropTypes.func,
    //accordion
    toggleOpenItem: PropTypes.func,
    openedItem:PropTypes.number
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