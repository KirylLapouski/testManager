import React from "react";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";

class EditableQuestionBottom extends React.Component {
    render() {
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
                            <Button onClick={this.deleteQuestionHandler}>
                                {" "}
                                <DeleteIcon />
                            </Button>
                        }
                    />
                    <FormControlLabel
                        style={{ position: "absolute", right: "0" }}
                        control={
                            <Button onClick={this.handleSubmit} color="primary">
                                {" "}
                                Принять изменения
                            </Button>
                        }
                    />
                    <FormControlLabel
                        style={{ position: "absolute", right: "200px" }}
                        control={
                            <Button onClick={this.endEdit}>Свернуть</Button>
                        }
                    />
                </FormGroup>
            </React.Fragment>
        );
    }
}

export default EditableQuestionBottom;
