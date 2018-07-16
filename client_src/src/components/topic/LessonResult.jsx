import React from 'react'
import Chart from "../chart/Chart";
import PropTypes from "prop-types";
import QuestionList from "../questions/QuestionList";
import Slide from '@material-ui/core/Slide';
class LessonResult extends React.Component {

    render() {
        var { wrongAnswerWeight, rightAnswersWeight, questions } = this.props
        return <div style={{ color: '#212529', textAlign: 'left', width: '80%', margin: '0 auto' }}>
            <div style={{ width: '50%', float: 'right' }}>
                <div style={{ backgroundColor: 'white' }}>
                    <Chart duration={800} weights={[rightAnswersWeight, wrongAnswerWeight]} style={{ fontColor: '#212529', firstParamColor: '#4CAF50', secondParamColor: '#E57373' }} />
                </div>
            </div>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                <p style={{ fontSize: '30px', fontFamily: '"Roboto", sans-serif' }}>
                    Правильные ответы:   {wrongAnswerWeight}%
            </p>
            </Slide>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                <p style={{ fontSize: '30px', fontFamily: '"Roboto", sans-serif' }}>
                    Неправильные ответы:   {rightAnswersWeight} %
            </p>
            </Slide>
            <QuestionList questions={questions} />

        </div>
    }
}

LessonResult.propTypes = {
    wrongAnswerWeight: PropTypes.number,
    rightAnswersWeight: PropTypes.number,
    questions: PropTypes.array
}
export default LessonResult
