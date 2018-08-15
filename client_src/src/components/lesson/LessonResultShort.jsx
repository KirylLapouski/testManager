import React from 'react'
import PropTypes from 'prop-types'

class LessonResultShort extends React.Component {

    render() {
        return <div style={{ color: this.props.passed ? 'teal' : 'grey', marginRight: 'auto' }}>{this.props.title}</div>
    }

}

LessonResultShort.propTypes = {
    passed: PropTypes.bool,
    title: PropTypes.string
}
export default LessonResultShort
