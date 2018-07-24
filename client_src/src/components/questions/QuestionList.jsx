import React from 'react'
import PropTypes from "prop-types";
import QuestionSmall from './QuestionSmall'
class QuestionList extends React.Component {
    render() {
        return <React.Fragment>
            {this.props.questions.map(value => {
                return <QuestionSmall key={value.title} right={value.rightAnswered} title={value.title} description={value.description} weight={value.weight} />
            })}
        </React.Fragment>
    }
}

QuestionList.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.shape({
        rightAnswered: PropTypes.bool,
        title: PropTypes.string,
        description: PropTypes.string,
        weight: PropTypes.number
    }))
}

export default QuestionList
