import React from 'react'
import PropTypes from 'prop-types'
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { withStyles } from "@material-ui/core/styles";
function LessonSideBar(props) {
    return <div style={{ display: "flex", flexDirection: "column" }}>
        <Button
            className={props.classes.iconButton}
            onClick={props.onDeleteClick}
            variant="fab"
        >
            <DeleteIcon />
        </Button>
        <hr
            style={{
                width: "69%",
                backgroundColor: "white",
                margin: "0px",
                alignSelf: "center"
            }}
        />
        <Button
            className={props.classes.iconButton}
            variant="fab"
            onClick={props.toggleEdditing}
        >
            <EditIcon />
        </Button>
        <Button
            className={props.classes.iconButton}
            variant="fab"
            onClick={props.onModalOpen}
        >
            <AddIcon />
        </Button>
        <div style={{ clear: "both" }} />
    </div>
}

LessonSideBar.propTypes = {
    onDeleteClick: PropTypes.func,
    toggleEdditing: PropTypes.func,
    onModalOpen: PropTypes.func
}
const style= {
    iconButton: {
        color: "white",
        boxShadow: "none",
        backgroundColor: "rgba(0,0,0,0)"
    },
}
export default withStyles(style)( LessonSideBar)
