import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import PropTypes from 'prop-types'
//TODO: write % when hover chart
class Chart extends React.Component {
    render() {
        let { unpassWeight, width, height, style = {}, duration, weights, titles } = this.props
        let summWeight = weights.reduce((acc, value) => acc + value, 0)
        let labels = titles
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
                    duration: duration || 1000
                }
            }}
            data={{
                labels: labels,
                datasets: [{
                    label: '% of Votes',
                    data: weights.map(value => value * 100 / summWeight),
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
    duration: PropTypes.number,
    style: PropTypes.shape({
        fontColor: PropTypes.string,
        firstParamColor: PropTypes.string,
        secondParamColor: PropTypes.string
    }),
    unpassWeight: PropTypes.number,
    titles: PropTypes.arrayOf(PropTypes.string),
    weights: PropTypes.arrayOf(PropTypes.number)
}

Chart.defaultProps = {
    titles: ['Правильные ответы', 'Неправильные ответы']
}
export default Chart
