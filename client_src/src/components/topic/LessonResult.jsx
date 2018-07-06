import React from 'react'
import Chart from "../chart/Chart";
import PropTypes from "prop-types";
class LessonResult extends React.Component {

    render() {
        return <div style={{ color: '#212529', textAlign: 'left', width: '80%', margin: '0 auto' }}>
            <div style={{ width: '50%', float: 'right' }}>
                <Chart rightAnswersWeight={10} wrongAnswersWeight={10} style={{ fontColor: '#212529', firstParamColor: '#4CAF50', secondParamColor: '#E57373' }} />
            </div>
            <p>
                Правильные ответы:   80%
            </p>
            <p >
                Неправильные ответы:   20 %
            </p>

        </div>
    }
}

LessonResult.propTypes = {
    wrongAnswerWeight: PropTypes.number,
    rightAnswersWeight: PropTypes.number

}
export default LessonResult
