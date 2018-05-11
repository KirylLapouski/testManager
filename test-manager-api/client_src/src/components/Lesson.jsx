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
import Collapse from 'material-ui/transitions/Collapse';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class Lesson extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topicsOpened: false
        }
    }

    handleTopicsClick = () => {
        this.setState({ topicsOpened: !this.state.topicsOpened });
    };
    render() {
        return (<div>
            <ExpansionPanel style={{ marginTop: "20px", backgroundColor: "blue", backgroundImage: 'url("https://lh4.googleusercontent.com/-64uhpsHBEZw/VMqrG_6wowI/AAAAAAAAAIE/_Pw_QoP0opU/w1005-h214-no/123_rainbowtriangle_teal.jpg")' }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}>
                    <UserInfo disabled={true} style={{ float: "left" }} />
                    <Link to={"/lesson/" + this.props.id + "/topics"} style={{ height: "20px" }}>{this.props.title}</Link>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '0px',textAlign:'left' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Button style={{ color: 'white', boxShadow: 'none', backgroundColor: 'rgba(0,0,0,0)' }} variant="fab"  >
                            <DeleteIcon />
                        </Button>
                        <hr style={{width:'69%',backgroundColor:'white',margin:'0px',alignSelf:'center'}}/>
                        <Button style={{ color: 'white', boxShadow: 'none', backgroundColor: 'rgba(0,0,0,0)' }} variant="fab"  >
                            <EditIcon />
                        </Button>
                        <Button style={{ color: 'white', boxShadow: 'none', backgroundColor: 'rgba(0,0,0,0)' }} variant="fab"  >
                            <AddIcon />
                        </Button>
                        <div style={{ clear: 'both' }} />
                    </div>
                    <Typography style={{color:'white',marginLeft:'5px'}}>
                        {this.props.descrition}asdfasdfadf
                        asdfasdfadfasdfa
                        <p>asdfasd</p>
                        <p>asd;asfsd</p>
                        <p>asdk</p>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <List style={{ marginTop: "-6px", backgroundColor: '#ECEFF1', paddingTop: '0px', paddingBottom: '0px' }}>
                <ListItem button onClick={this.handleTopicsClick} style={{ paddingTop: '0px', paddingBottom: '0px', height: '30px' }}>
                    <ListItemText inset primary="Topics" />
                </ListItem>
                <Collapse in={this.state.topicsOpened} >
                    <List component="div" disablePadding>
                        <ListItem button>
                            <ListItemText inset primary="Starred" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </div>)
    }
}


Lesson.propTypes = {
    title: PropTypes.string,
    descrition: PropTypes.string,
    id: PropTypes.number.isRequired
}

export default Lesson