import React from 'react';
import UserInfo from './UserInfo';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
class Lesson extends React.Component {

    render() {
        return (
            <ExpansionPanel style={{ marginTop: "20px", backgroundColor: "blue", backgroundImage: 'url("https://lh4.googleusercontent.com/-64uhpsHBEZw/VMqrG_6wowI/AAAAAAAAAIE/_Pw_QoP0opU/w1005-h214-no/123_rainbowtriangle_teal.jpg")' }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}>
                    <UserInfo disabled={true} style={{ float: "left" }} />
                    <Link to={"/lesson/" + this.props.id + "/topics"} style={{ height: "20px" }}>{this.props.title}</Link>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        {this.props.descrition}
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>)
    }
}


Lesson.propTypes = {
    title: PropTypes.string,
    descrition: PropTypes.string,
    id: PropTypes.number.isRequired
}

export default Lesson