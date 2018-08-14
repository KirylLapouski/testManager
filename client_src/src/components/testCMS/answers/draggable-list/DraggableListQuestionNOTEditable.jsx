import React from "react";
import PropTypes from "prop-types";

class DraggableListQuestionNOTEditable extends React.Component {
    render() {
        if (this.props.answers) {
            return this.props.answers.map((value, i) => {
                return (
                    <div
                        style={{
                            padding: "10px",
                            borderBottom: "2px solid #e5e5e5 ",
                            textAlign: "left"
                        }}
                        key={value.name}
                    >
                        {i + 1} {value.name}
                    </div>
                );
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
