import React from "react";
import DraggableList from "react-draggable-list";
import PropTypes from "prop-types";
import PlanetItem from "./DraggableItem";
import "./draggable-list.css";

class DraggableListQuestion extends React.Component {
    state = {
        useContainer: false,
        list: [
            { name: "Mercury" },
            { name: "Venus" },
            { name: "Earth", subtitle: true },
            { name: "Mars" },
            { name: "Jupiter" },
            { name: "Saturn", subtitle: true },
            { name: "Uranus", subtitle: true },
            { name: "Neptune" }
        ]
    };

    _toggleContainer() {
        this.setState({ useContainer: !this.state.useContainer });
    }

    _onListChange(newList) {
        this.setState({ list: newList });
    }

    render() {
        const { useContainer } = this.state;

        return (
            <div className="main">
                <div
                    className="list"
                    ref="container"
                    style={{
                        overflow: useContainer ? "auto" : "",
                        height: useContainer ? "200px" : "",
                        border: useContainer ? "1px solid gray" : ""
                    }}
                >
                    <DraggableList
                        itemKey="name"
                        template={PlanetItem}
                        list={this.state.list}
                        onMoveEnd={newList => this._onListChange(newList)}
                        container={() =>
                            useContainer ? this.refs.container : document.body
                        }
                    />
                </div>
            </div>
        );
    }
}

DraggableListQuestion.propTypes = {
    answers: PropTypes.array
};
export default DraggableListQuestion;
