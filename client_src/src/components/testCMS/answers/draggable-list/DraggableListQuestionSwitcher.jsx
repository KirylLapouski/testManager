import React from "react";
import DraggableListEditable from "./DraggableListQuestion";
import PropTypes from "prop-types";
import DraggableListNotEditable from "./DraggableListQuestionNOTEditable";

class DraggableListQuestionSwitcher extends React.Component {
    render() {
        return this.props.editing ? (
            <DraggableListEditable {...this.props} />
        ) : (
            <DraggableListNotEditable {...this.props} />
        );
    }
}

DraggableListQuestionSwitcher.propTypes = {
    editing: PropTypes.bool
};
export default DraggableListQuestionSwitcher;
