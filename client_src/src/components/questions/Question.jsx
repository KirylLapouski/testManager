import React from "react";
import PropTypes from "prop-types";
import Slide from '@material-ui/core/Slide';

class Question extends React.Component {
    render() {
        var { title, right } = this.props
        return <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <div style={{ color: right ? '#4CAF50' : '#FF7043', background: "rgba(0,0,0,0.1)", width: '50%' }}>
                < h2 > {title} </h2>
            </div>
        </Slide>
    }
}

Question.propTypes = {
    right: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    weight: PropTypes.number
}

export default Question
