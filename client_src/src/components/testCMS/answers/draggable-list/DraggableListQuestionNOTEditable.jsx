import React from "react";
import PropTypes from "prop-types";

class DraggableListQuestionNOTEditable extends React.Component {
    render() {
        return this.props.answers.map(value => {
            return <div>{value.name}</div>;
        });
    }
}

DraggableListQuestionNOTEditable.propTypes = {
    answers: PropTypes.array
};

export default DraggableListQuestionNOTEditable;
