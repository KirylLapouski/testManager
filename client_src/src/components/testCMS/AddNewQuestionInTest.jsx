import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Flag from "@material-ui/icons/Flag";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
class AddNewQuestionInTest extends React.Component {
    render() {
        return (
            <ExpansionPanel
                className="z-depth-1 container"
                style={{ margin: "0 auto" }}
            >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ color: "black" }}>
                        Добавить вопрос
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <form
                        onSubmit={this.props.handleSubmitNewQuestionForm}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            alignItems: "flex-start"
                        }}
                    >
                        <div
                            style={{
                                width: "60%",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <TextField
                                label="Вопрос"
                                style={{ width: "90%" }}
                                value={this.props.name}
                                onChange={this.props.handleChange("title")}
                            />
                            <Flag
                                style={{
                                    color: "#ff7961",
                                    width: "20px",
                                    height: "20px"
                                }}
                            />
                        </div>
                        <div
                            style={{
                                width: "60%",
                                display: "flex",
                                alignItems: "center",
                                marginTop: "10px"
                            }}
                        >
                            <TextField
                                label="Вес вопроса"
                                inputProps={{ min: "0", max: "1000" }}
                                style={{ width: "90%" }}
                                value={this.props.weight}
                                onChange={this.props.handleChange("weight")}
                                type="number"
                            />
                            <Flag
                                style={{
                                    color: "#ff7961",
                                    width: "20px",
                                    height: "20px"
                                }}
                            />
                        </div>
                        <TextField
                            label="Пояснение к вопросу"
                            multiline
                            rowsMax="4"
                            value={this.props.description}
                            onChange={this.props.handleChange("description")}
                            style={{ width: "100%" }}
                        />
                        <Button
                            style={{ alignSelf: "flex-end", marginTop: "10px" }}
                            type="submit"
                        >
                            Создать вопрос
                        </Button>
                    </form>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}
AddNewQuestionInTest.propTypes = {
    name: PropTypes.string,
    weight: PropTypes.number,
    description: PropTypes.string,
    handleChange: PropTypes.func,
    handleSubmitNewQuestionForm: PropTypes.func
};
export default AddNewQuestionInTest;
