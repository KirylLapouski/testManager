import React from 'react'
import LineChart from '../../chart/HorizontalBarChart'
import Fade from '@material-ui/core/Fade';
import PropTypes from "prop-types";
class CourseResult extends React.Component {
    render() {
        var { titles, data } = this.props
        return <Fade in={true}>
            <div style={{ width: '400px', marginLeft: 'auto', marginRight: '50px' }}>
                <LineChart style={{ fontColor: 'black' }} titles={titles} data={data} height='400' />
            </div>
        </Fade>
    }
}

CourseResult.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number)
}
export default CourseResult
