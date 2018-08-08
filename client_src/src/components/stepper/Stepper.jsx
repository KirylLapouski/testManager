import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        width: "90%",
        margin: "10px auto"
    },
    button: {
        marginRight: theme.spacing.unit
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
});

class HorizontalLinearStepper extends React.Component {
    state = {
        activeStep: this.props.initCurrentPos,
        completed: {}
    };

    totalSteps = () => {
        return this.props.stepsTitles.length;
    };

    changeActiveStep = step => {};
    handleNext = () => {
        let activeStep;

        if (this.isLastStep() && !this.allStepsCompleted()) {
            // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            const steps = this.props.stepsTitles;
            activeStep = steps.findIndex(
                (step, i) => !(i in this.state.completed)
            );
        } else {
            activeStep = this.state.activeStep + 1;
        }
        this.setState({
            activeStep
        });
        this.props.onChange(activeStep);
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1
        });
        this.props.onChange(activeStep - 1);
    };

    handleStep = step => () => {
        this.setState({
            activeStep: step
        });
        this.props.onChange(step);
    };

    handleComplete = () => {
        const { completed } = this.state;
        completed[this.state.activeStep] = true;
        this.setState({
            completed
        });
        this.handleNext();
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
            completed: {}
        });
        this.props.onChange(0);
    };

    completedSteps() {
        return Object.keys(this.state.completed).length;
    }

    isLastStep() {
        return this.state.activeStep === this.totalSteps() - 1;
    }

    allStepsCompleted() {
        return this.completedSteps() === this.totalSteps();
    }

    render() {
        const { classes } = this.props;
        const steps = this.props.stepsTitles;
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                {/* {React.cloneElement(this.props.nextButton, {
                    // Add onclick
                })} */}
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepButton
                                    onClick={this.handleStep(index)}
                                    completed={this.state.completed[index]}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {this.allStepsCompleted() ? (
                        <div>
                            <Typography className={classes.instructions}>
                                {this.props.displayWhenComplete}
                                All steps completed - you&quot;re finished
                            </Typography>
                            <Button onClick={this.handleReset}>Reset</Button>
                        </div>
                    ) : (
                        <div>
                            <div>
                                {React.cloneElement(this.props.backButton, {
                                    disabled: activeStep === 0,
                                    onClick: this.handleBack
                                })}
                                {/* <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.button}
                                >
                                    Back
                                </Button> */}
                                {React.cloneElement(this.props.nextButton, {
                                    onClick: this.handleNext
                                })}
                                {/* <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={classes.button}
                                >
                                    Next
                                </Button> */}
                                {activeStep !== steps.length &&
                                    (this.state.completed[
                                        this.state.activeStep
                                    ] ? (
                                        <Typography
                                            variant="caption"
                                            className={classes.completed}
                                        >
                                            Step {activeStep + 1} already
                                            completed
                                        </Typography>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleComplete}
                                        >
                                            {this.completedSteps() ===
                                            this.totalSteps() - 1
                                                ? "Finish"
                                                : "Complete Step"}
                                        </Button>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

HorizontalLinearStepper.propTypes = {
    classes: PropTypes.object,
    stepsTitles: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    initCurrentPos: PropTypes.number,
    displayWhenComplete: PropTypes.node,
    nextButton: PropTypes.node,
    backButton: PropTypes.node
};

export default withStyles(styles)(HorizontalLinearStepper);
