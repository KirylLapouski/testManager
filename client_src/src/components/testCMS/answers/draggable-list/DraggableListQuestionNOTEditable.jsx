import React from "react";
import PropTypes from "prop-types";

class DraggableListQuestionNOTEditable extends React.Component {
    render() {
        if (this.props.answers) {
            return this.props.answers.map(value => {
                return <div>{value.name}</div>;
            });
        } else {
            return <div />;
        }
    }
}

DraggableListQuestionNOTEditable.propTypes = {
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string
        })
    )
};

export default DraggableListQuestionNOTEditable;
