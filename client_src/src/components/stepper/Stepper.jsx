import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    root: {
        width: '90%',
        margin: '10px auto'
    },
    button: {
        marginRight: theme.spacing.unit
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
})

class HorizontalLinearStepper extends React.Component {
    render() {
        const {
            classes,
            activeStep,
        } = this.props
        const steps = this.props.stepsTitles

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
                                    onClick={this.props.handleStep(index)}
                                    completed={this.props.completed[index]}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        )
                    })}
                </Stepper>
            </div>
        )
    }
}

HorizontalLinearStepper.propTypes = {
    classes: PropTypes.object,
    stepsTitles: PropTypes.arrayOf(PropTypes.string),
    completed: PropTypes.object,
    activeStep: PropTypes.number
}

export default withStyles(styles)(HorizontalLinearStepper)
