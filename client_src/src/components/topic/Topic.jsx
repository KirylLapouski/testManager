import React from 'react'
import Test from '../Test'
import PropTypes from 'prop-types'

import MyEditor from '../editor/index'
class Topic extends React.Component {
    render() {

        return <div style={{ color: 'black', width: '80%', margin: '30px auto' }}>
            {/* {(this.props.type === 'video' || this.props.type === 'audio') && <Media src={this.props.path} />} */}
            <MyEditor topicId={this.props.id} currentData={this.props.path} readOnly={this.props.readOnly} />
            {this.props.hasTests && <Test key={this.props.id} topicId={this.props.id} />}
        </div>
    }
}

Topic.propTypes = {
    id: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    hasTests: PropTypes.bool
}


export default Topic
