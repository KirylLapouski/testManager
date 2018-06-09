import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import PropTypes from 'prop-types'
//TODO: write % when hover chart
class Chart extends React.Component {
    render() {
        var {unpassWeight} = this.props
        var labels = unpassWeight?['Правильные ответы', 'Неправильные ответы','Не отвечено']: ['Правильные ответы', 'Неправильные ответы'] 
        return <Doughnut
            options={{
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        fontColor: 'white',
                        fontSize:20
                    }
                }
            }}
            data={{
                labels: labels,
                datasets: [{
                    label: '% of Votes',
                    data: [this.props.rightAnswersWeight*100/(this.props.rightAnswersWeight+this.props.wrongAnswersWeight+(unpassWeight?unpassWeight:0)), this.props.wrongAnswersWeight*100/(this.props.rightAnswersWeight+this.props.wrongAnswersWeight+(unpassWeight?unpassWeight:0)), unpassWeight? unpassWeight*100/(this.props.rightAnswersWeight+this.props.wrongAnswersWeight+unpassWeight): null],
                    backgroundColor: [
                        '#3f51b5',
                        'white',
                        unpassWeight? '#FFEB3B':null
                    ],
                    borderColor: [
                        'white',
                    ],
                    borderWidth: 3
                }]
            }} />
    }
}
Chart.propTypes = {
    rightAnswersWeight: PropTypes.number,
    wrongAnswersWeight: PropTypes.number,
    unpassWeight: PropTypes.number
}

export default Chart
