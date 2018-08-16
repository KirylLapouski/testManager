import React from 'react'
import LineChart from '../../../chart/HorizontalBarChart'
import Slide from '@material-ui/core/Slide'
import PropTypes from 'prop-types'
class CourseResult extends React.Component {
    render() {
        let { titles, data, redraw } = this.props
        return <Slide direction='left' in={true}>
            <div style={{ width: '400px', marginLeft: 'auto', marginRight: '70px' }}>
                <LineChart style={{ fontColor: 'black' }} redraw={redraw} titles={titles} data={data} height={400} />
            </div>
        </Slide>
    }
}

CourseResult.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number),
    redraw: PropTypes.bool
}
export default CourseResult
