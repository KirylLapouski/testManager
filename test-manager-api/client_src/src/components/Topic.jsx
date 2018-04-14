import React from 'react';
import Test from './Test'
import PropTypes from 'prop-types';

class Topic extends React.Component {
   
    static propTypes = {
        id: PropTypes.number.isRequired,
        path: PropTypes.string.isRequired
    }
    render() {
        return <div>Topic
            <span style={{color:"black"}}>{this.props.path}</span>
            <Test topicId={this.props.id}/>
        </div> 
    }
}

export default Topic;   