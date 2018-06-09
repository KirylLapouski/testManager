import React from 'react'
import Button from 'material-ui/Button'
import EditIcon from '@material-ui/icons/Edit'
import MessageIcon from '@material-ui/icons/Message'
import TestIcon from '@material-ui/icons/Assignment'
import Tooltip from 'material-ui/Tooltip';
import Collapse from 'material-ui/transitions/Collapse';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
// TODO: scroll bar bag
class EditButton extends React.Component {
    state = {
        open: false,
    };

    toggleCollapse = () => {
        this.setState({ open: !this.state.open });
    };

    handleClose = () => {
        this.setState({ open: null });
    };

    handleEditTestClick = ()=>{
        this.props.history.push(`${this.props.location.pathname}/testEditor`)
    }
    render() {
        const { open } = this.state;
        return <div style={{ position: 'fixed', bottom: '20px', right: '40px' }}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px', width: '70px',alignItems:'center' }} >
                    <Tooltip id="tooltip-icon" title="Редактировать топик" placement='left'>
                        <Button variant="fab" color="primary" aria-label="add" onClick={this.props.onTopicEditClick} style={{ marginBottom: '30px' }}>
                            <MessageIcon />
                        </Button>
                    </Tooltip >
                    <Tooltip id="tooltip-icon" title="Редактировать тест" placement='left'>
                        <Button variant="fab" color="primary" aria-label="add" onClick={this.handleEditTestClick} >
                            <TestIcon />
                        </Button>
                    </Tooltip >
                </div>
            </Collapse>
            <Button onClick={this.toggleCollapse} variant="fab" color="primary" aria-label="add" >
                <EditIcon />
            </Button>
        </div>
    }
}

EditButton.propTypes = {
    onTopicEditClick: PropTypes.func
}

export default withRouter(EditButton)
