import React from "react";
import cx from "classnames";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
class DraggableItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initName: this.props.item.name,
            name: this.props.item.name,
            editing: false
        };
    }
    getDragHeight() {
        return this.props.item.subtitle ? 47 : 45;
    }

    onChange = name => e => {
        this.setState({
            [name]: e.target.value
        });
    };

    saveChanges = () => {
        let newAnswers = this.props.commonProps.answers.map(
            value =>
                value.name === this.state.initName
                    ? {
                          ...value,
                          name: this.state.name
                      }
                    : value
        );

        this.props.commonProps.onChange(newAnswers);
        this.endEdit();
    };
    beginEdit = () => {
        this.setState({
            editing: true
        });
    };
    endEdit = () => {
        this.setState({
            editing: false
        });
    };
    render() {
        const { item, itemSelected, dragHandle, commonProps } = this.props;
        const { deleteItem } = commonProps;
        const scale = itemSelected * 0.05 + 1;
        const shadow = itemSelected * 15 + 1;
        const dragged = itemSelected !== 0;

        return (
            <div
                className={cx("item", { dragged })}
                style={{
                    transform: `scale(${scale})`,
                    boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 *
                        shadow}px 0px`,
                    position: "relative"
                }}
            >
                {dragHandle(<div className="dragHandle" />)}
                <h2>{item.name}</h2>
                {this.state.editing && (
                    <p>
                        {" "}
                        <TextField
                            onChange={this.onChange("name")}
                            value={this.state.name}
                        />
                    </p>
                )}

                <IconButton
                    style={{ position: "absolute", right: "0px", top: "0px" }}
                    onClick={deleteItem(item.name)}
                    aria-label="Delete"
                >
                    <ClearIcon />
                </IconButton>

                {this.state.editing ? (
                    <Button onClick={this.saveChanges} color="primary">
                        Сохранить
                    </Button>
                ) : (
                    <IconButton onClick={this.beginEdit}>
                        <CreateIcon />
                    </IconButton>
                )}
            </div>
        );
    }
}

DraggableItem.propTypes = {
    commonProps: PropTypes.shape({
        answers: PropTypes.array,
        deleteItem: PropTypes.func,
        onChange: PropTypes.func
    })
};
export default DraggableItem;
