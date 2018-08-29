import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
function LessonEdditingFields(props) {

    let handleHeaderInputChange = e => {
        e.stopPropagation()
        props.onInputChange(e)
    }

    return <React.Fragment>
        <TextField
            name="description"
            onChange={handleHeaderInputChange}
            InputProps={{ disableUnderline: true }}
            multiline={true}
            placeholder="Описание урока"
            rows="5"
            className={props.classes.lessonDescription}
        />
        <div
            className={props.classes.lessonManipulationContainer}
        >
            <Button
                onClick={props.onCancelEdditingClick}
                style={{ marginRight: '5px' }}
            >
                Отмена
            </Button>
            <Button
                onClick={props.onSumbitEditLesson}
                variant="raised"
                color="primary"
            >
                Создать
            </Button>
        </div>
    </React.Fragment>
}

const styles = {
    lessonDescription: {
        marginLeft: '61px',
        backgroundColor: 'white',
        opacity: '0.9',
        borderRadius: '4px',
        width: '91%',
        padding: '10px'
    },
    lessonManipulationContainer: {
        alignSelf: 'flex-end',
        marginTop: '10px',
        marginRight: '3px'
    }
}
LessonEdditingFields.propTypes = {
    onCancelEdditingClick: PropTypes.func,
    onSumbitEditLesson: PropTypes.func,
    onInputChange: PropTypes.func
}
export default withStyles(styles)(LessonEdditingFields)
