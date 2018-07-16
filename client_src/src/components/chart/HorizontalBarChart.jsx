import { HorizontalBar } from 'react-chartjs-2'
import React from 'react'
import PropTypes from 'prop-types'
//TODO: titles and data should be same lenght? No should not
class HorizontalBarChart extends React.Component {
    render() {
        var { titles, data, minValue, maxValue = 100, style, duration, height, width } = this.props
        return <HorizontalBar width={width} height={height}
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
                labels: titles,
                datasets: [{
                    label: 'Результат пройденных тестов',
                    data: [...data, maxValue, minValue],
                    backgroundColor: 'rgba(165, 214, 167, 0.5)',
                    borderColor: '#4CAF50',
                    borderWidth: 3
                }]
            }}
        />
    }
}
HorizontalBarChart.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number),
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    style: PropTypes.shape({
        fontColor: PropTypes.string,
        firstParamColor: PropTypes.string,
        secondParamColor: PropTypes.string
    }),
    width: PropTypes.number,
    height: PropTypes.number,
}

HorizontalBarChart.defaultProps = {
    minValue: 0,
    maxvalue: 100,
    style: {}
}

export default HorizontalBarChart
