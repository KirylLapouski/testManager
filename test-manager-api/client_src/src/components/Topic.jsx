import React from 'react';
import Test from './Test'
import PropTypes from 'prop-types';

class Topic extends React.Component {
   
    static propTypes = {
        path: PropTypes.string.isRequired
    }
    render() {
        return <div>Topic
            <span style={{color:"black"}}>{this.props.path}</span>
            <Test/>
        </div> 
    }
}

export default Topic;   