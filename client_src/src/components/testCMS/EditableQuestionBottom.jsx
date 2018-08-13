import React from "react";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
class EditableQuestionBottom extends React.Component {
    render() {
        var {
            handleSubmit,
            endEditHandler,
            deleteQuestionHandler
        } = this.props;
        return (
            <React.Fragment>
                <Divider
                    inset={true}
                    style={{
                        position: "relative",
                        left: "-5%",
                        width: "100%",
                        marginTop: "30px"
                    }}
                />
                <FormGroup
                    row
                    style={{
                        position: "relative",
                        paddingTop: "10px",
                        minHeight: "60px"
                    }}
                >
                    <FormControlLabel
                        style={{
                            position: "absolute",
                            right: "320px",
                            paddingRight: "10px",
                            borderRight: "1px solid grey"
                        }}
                        control={
                            <IconButton onClick={deleteQuestionHandler}>
                                {" "}
                                <DeleteIcon />
                            </IconButton>
                        }
                    />
                    <FormControlLabel
                        style={{ position: "absolute", right: "0" }}
                        control={
                            <Button onClick={handleSubmit} color="primary">
                                {" "}
                                Принять изменения
                            </Button>
                        }
                    />
                    <FormControlLabel
                        style={{ position: "absolute", right: "200px" }}
                        control={
                            <Button onClick={endEditHandler}>Свернуть</Button>
                        }
                    />
                </FormGroup>
            </React.Fragment>
        );
    }
}

EditableQuestionBottom.propTypes = {
    handleSubmit: PropTypes.func,
    endEditHandler: PropTypes.func,
    deleteQuestionHandler: PropTypes.func
};
export default EditableQuestionBottom;
