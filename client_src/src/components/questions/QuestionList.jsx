import React from 'react'
import PropTypes from "prop-types";
import Question from './Question'
class QuestionList extends React.Component {
    render() {
        console.log(this.props.questions)
        return <React.Fragment>
            {this.props.questions.map(value => {
                return <Question right={value.rightAnswered} title={value.title} description={value.description} weight={value.weight} />
            })}
        </React.Fragment>
    }
}

QuestionList.propTypes = {
    questions: PropTypes.arrayOf({
        rightAnswered: PropTypes.bool,
        title: PropTypes.string,
        description: PropTypes.string,
        weight: PropTypes.number
    })
}

export default QuestionList
