import React from 'react'
import LineChart from '../../chart/LineChart'
import Fade from '@material-ui/core/Fade';
import PropTypes from "prop-types";
class CourseResult extends React.Component {
    render() {
        var { titles, data } = this.props
        return <Fade in={true}>
            <div style={{ position: 'absolute', width: '100%', top: '210px', zIndex: '3' }}>
                <LineChart style={{ fontColor: 'black' }} titles={titles} data={data} height={100} />
            </div>
        </Fade>
    }
}

CourseResult.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number)
}
export default CourseResult
