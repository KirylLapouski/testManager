import React from 'react';
import {Input} from 'mdbreact';
import PropTypes from 'prop-types';

class Answer extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired
    }
    render() {
        return <Input label={this.props.text} type="checkbox"/>
    }
}

export default Answer;