import React from "react";
import DraggableList from "react-draggable-list";
import PropTypes from "prop-types";
import PlanetItem from "./DraggableItem";
import "./draggable-list.css";

class DraggableListQuestion extends React.Component {
    render() {
        if (!this.props.answers) {
            return <div> </div>;
        } else {
            return (
                <div className="main">
                    <div className="list">
                        <DraggableList
                            itemKey="name"
                            template={PlanetItem}
                            commonProps={{
                                deleteItem: this.props.deleteListItem,
                                onChange: this.props.onChange,
                                answers: this.props.answers
                            }}
                            list={this.props.answers}
                            onMoveEnd={this.props.onChange}
                            // container={() =>
                            //     useContainer ? this.refs.container : document.body
                            // }
                        />
                    </div>
                </div>
            );
        }
    }
}

DraggableListQuestion.propTypes = {
    answers: PropTypes.array,
    onChange: PropTypes.func,
    deleteListItem: PropTypes.func
};
export default DraggableListQuestion;
