import React from 'react'
import PropTypes from 'prop-types'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import LessonResultShort from '../../../lesson/LessonResultShort'
class CourseResultNumbers extends React.Component {

    render() {
        // TODO: display procent of passed course
        // TODO:
        return <ExpansionPanel >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>

                <Typography >{this.props.courseTitle}  </Typography>
                <table style={{ marginLeft: 'auto', marginRight: '50px' }}>
                    <tr>
                        <td style={{ paddingLeft: '10px' }}><Typography style={{ color: 'green' }}> {Math.round((this.props.data.filter(value => !!value).length * 100) / (this.props.titles.length || 1))}%</Typography></td>
                        <td style={{
                            paddingLeft: '10px'
                        }} > <Typography style={{ color: 'teal' }}>{Math.round(this.props.data.filter(value =>
                                !Number.isNaN(value)
                            ).length * 100 / this.props.titles.length)}%</Typography></td>
                    </tr>
                </table>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexDirection: 'column' }} >
                <h3 style={{ marginRight: 'auto' }}>Уроки</h3>
                {
                    this.props.titles.map((title, i) => {
                        return <LessonResultShort title={title} passed={!Number.isNaN(this.props.data[i])} />
                    })
                }
            </ExpansionPanelDetails>
        </ExpansionPanel>
    }

}
CourseResultNumbers.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number),
    redraw: PropTypes.bool,
    courseTitle: PropTypes.string
}

export default CourseResultNumbers
