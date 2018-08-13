import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { Button } from "material-ui";
class Answer extends React.Component {
    render() {
        var {
            typeOfAnswer,
            text,
            serialNumber,
            editable,
            checked,
            onClick,
            onChange,
            deleteAnswerHandler
        } = this.props;

        return editable ? (
            <div style={{ display: "flex", alignItems: "center" }}>
                {serialNumber < 10 ? "0" + serialNumber : serialNumber}.
                {typeOfAnswer == "radio" ? (
                    <Radio value="a" onClick={onClick} checked={checked} />
                ) : (
                    <Checkbox
                        checked={checked}
                        onClick={onClick}
                        style={{ width: "5%" }}
                    />
                )}
                <TextField
                    defaultValue={text}
                    onChange={onChange}
                    style={{ width: "90%" }}
                />
                <Button onClick={deleteAnswerHandler}>
                    <CloseIcon />
                </Button>
            </div>
        ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
                <FormControlLabel
                    label={text}
                    control={
                        typeOfAnswer == "radio" ? (
                            <Radio
                                checked={checked !== undefined && checked}
                                value={text}
                                onClick={onClick}
                            />
                        ) : (
                            <Checkbox
                                checked={checked !== undefined && checked}
                                label={text}
                                onClick={onClick}
                            />
                        )
                    }
                />
            </div>
        );
    }
}

Answer.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string,
    typeOfAnswer: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    editable: PropTypes.bool,
    serialNumber: PropTypes.number,
    checked: PropTypes.bool,
    deleteAnswerHandler: PropTypes.func
};

Answer.defaultProps = {
    onClick: f => f,
    typeOfAnswer: "checkbox",
    editable: false
};

export default Answer;
