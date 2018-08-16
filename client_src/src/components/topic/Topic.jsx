import React from 'react'
import Test from '../Test'
import PropTypes from 'prop-types'
import MyEditor from '../editor/index'
class Topic extends React.Component {
    render() {
        return (
            <div style={{ color: 'black', width: '80%', margin: '30px auto' }}>
                <MyEditor
                    topicId={this.props.id}
                    currentData={this.props.path}
                    readOnly={this.props.readOnly}
                    ownerId={this.props.ownerId}
                />
                {this.props.hasTests && (
                    <Test key={this.props.id} topicId={this.props.id} />
                )}
            </div>
        )
    }
}

Topic.propTypes = {
    id: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    hasTests: PropTypes.bool,
    ownerId: PropTypes.number
}

export default Topic
