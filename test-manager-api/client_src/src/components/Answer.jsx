import React from 'react';
import {Input} from 'mdbreact';
import PropTypes from 'prop-types';

class Answer extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired
    }
    render() {
        return <Input onClick={this.props.onClick} label={this.props.text} type="checkbox"/>
    }
}

export default Answer;