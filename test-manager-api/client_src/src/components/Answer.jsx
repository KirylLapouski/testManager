import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'mdbreact';

class Answer extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        text: PropTypes.string.isRequired
    }
    render() {
        return <label><input style={{display:"inline"}}  onClick={this.props.onClick} type="checkbox"/>{this.props.text}</label>
    }
}

export default Answer;