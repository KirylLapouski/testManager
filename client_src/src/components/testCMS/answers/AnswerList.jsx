import React from 'react'
import PropTypes from 'prop-types'
import Answer from './Answer'
class AnswerList extends React.Component {
    render() {
        let {
            answers,
            editable,
            onChange,
            typeOfAnswer,
            onClick,
            deleteAnswerHandler
        } = this.props

        return (
            <React.Fragment>
                {answers.map((answer, i) => {
                    return (
                        !answer.wouldBeDeletedAfterSubmit && (
                            <Answer
                                key={i}
                                id={answer.id}
                                editable={editable}
                                onChange={onChange && onChange(i)}
                                typeOfAnswer={typeOfAnswer}
                                onClick={onClick(i)}
                                checked={answers[i].isRight}
                                text={answers[i].text}
                                serialNumber={i + 1}
                                deleteAnswerHandler={
                                    deleteAnswerHandler &&
                                    deleteAnswerHandler(i)
                                }
                            />
                        )
                    )
                })}
            </React.Fragment>
        )
    }
}

AnswerList.propTypes = {
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    typeOfAnswer: PropTypes.string,
    onClick: PropTypes.func,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            text: PropTypes.string,
            //is checked
            isRight: PropTypes.bool
        })
    ),
    id: PropTypes.number,
    serialNumber: PropTypes.number,
    deleteAnswerHandler: PropTypes.func
}
export default AnswerList
