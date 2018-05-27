import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import PropTypes from 'prop-types'
class Chart extends React.Component {
    render() {
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
                labels: ['Правильные ответы', 'Неправильные ответы'],
                datasets: [{
                    label: '% of Votes',
                    data: [this.props.rightAnswersWeight, this.props.wrongAnswersWeight],
                    backgroundColor: [
                        '#3f51b5',
                        'white',
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
    wrongAnswersWeight: PropTypes.number
}

export default Chart