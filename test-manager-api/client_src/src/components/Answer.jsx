import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import Radio from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';
const styles = {
    block: {
        maxWidth: 250,
    }
};

class Answer extends React.Component {
    constructor(props) {
        super(props);

    }
    getCheckBox(answer) {
        return  <FormControlLabel control={ <Checkbox label={answer} />} label={answer}/>
    }

    getRadioButtons(answer) {
        return <FormControlLabel
            control={
                <Radio value={answer} />
            }
            label={answer}
        />

    }

    render() {
        var { typeOfAnswer, text } = this.props;
        switch (typeOfAnswer) {
            case 'checkbox': return this.getCheckBox(text);
            case 'radio': return this.getRadioButtons(text);
        }
        return null;
        // return <label><input style={{ display: "inline" }} onClick={this.props.onClick} type="checkbox" />{this.props.text}</label>
    }
}

Answer.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string.isRequired,
    typeOfAnswer: PropTypes.string,
    onClick: PropTypes.func
}

Answer.defaultProps = {
    onClick: f => f,
    typeOfAnswer: "checkbox"
}

export default Answer;