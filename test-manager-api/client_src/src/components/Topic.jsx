import React from 'react';
import Test from './Test'
import PropTypes from 'prop-types';

class Topic extends React.Component {
   
    static propTypes = {
        handleTestSubmit: PropTypes.func.isRequired,
        id: PropTypes.number.isRequired,
        path: PropTypes.string.isRequired
    }
    render() {
        return <div>Topic
            <span style={{color:"black"}}>{this.props.path}</span>
            <Test key={this.props.id} onTestSubmit={this.props.handleTestSubmit} topicId={this.props.id}/>
        </div> 
    }
}

export default Topic;   