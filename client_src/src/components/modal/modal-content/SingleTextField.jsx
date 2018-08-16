import React from "react";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import SubmitAndCancel from "./SubmitAndCancel";
class SingleTextField extends React.Component {
    render() {
        let {
            onChangeHandler,
            handleClose,
            handleSubmit,
            textFieldTitle,
            autoFocus,
            formStyle
        } = this.props;
        return (
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    ...formStyle
                }}
            >
                <TextField
                    autoFocus={autoFocus}
                    style={{ width: "100%" }}
                    onChange={onChangeHandler}
                    id="name"
                    label={textFieldTitle ? textFieldTitle : "Название урока"}
                    name="title"
                    margin="normal"
                />
                <SubmitAndCancel handleClose={handleClose} />
            </form>
        );
    }
}

SingleTextField.propTypes = {
    onChangeHandler: PropTypes.func,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    textFieldTitle: PropTypes.string,
    autoFocus: PropTypes.bool,
    formStyle: PropTypes.object
};
export default SingleTextField;
