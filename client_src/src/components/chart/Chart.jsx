import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import PropTypes from 'prop-types'
//TODO: write % when hover chart
class Chart extends React.Component {
    render() {
        var { unpassWeight, width, height, style = {} } = this.props
        var labels = unpassWeight ? ['Правильные ответы', 'Неправильные ответы', 'Не отвечено'] : ['Правильные ответы', 'Неправильные ответы']
        return <Doughnut width={width} height={height}
            options={{
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        fontColor: style.fontColor || 'white',
                        fontSize: 20
                    }
                },
                animation: {
                    duration: 1000
                }
            }}
            data={{
                labels: labels,
                datasets: [{
                    label: '% of Votes',
                    data: [this.props.rightAnswersWeight * 100 / (this.props.rightAnswersWeight + this.props.wrongAnswersWeight + (unpassWeight ? unpassWeight : 0)), this.props.wrongAnswersWeight * 100 / (this.props.rightAnswersWeight + this.props.wrongAnswersWeight + (unpassWeight ? unpassWeight : 0)), unpassWeight ? unpassWeight * 100 / (this.props.rightAnswersWeight + this.props.wrongAnswersWeight + unpassWeight) : null],
                    backgroundColor: [
                        style.firstParamColor || '#3f51b5',
                        style.secondParamColor || 'white',
                        unpassWeight ? '#FFEB3B' : null
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
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.shape({
        fontColor: PropTypes.string,
        firstParamColor: PropTypes.string,
        secondParamColor: PropTypes.string
    }),
    unpassWeight: PropTypes.number
}

export default Chart
