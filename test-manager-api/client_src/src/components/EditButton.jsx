import React from 'react'
import Button from 'material-ui/Button'
import EditIcon from '@material-ui/icons/Edit'
import MessageIcon from '@material-ui/icons/Message'
import TestIcon from '@material-ui/icons/Assignment'
import Tooltip from 'material-ui/Tooltip';
import Collapse from 'material-ui/transitions/Collapse';
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


    render() {
        const { open } = this.state;
        return <div style={{ position: 'fixed', bottom: '20px', right: '40px' }}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px', width: '70px',alignItems:'center' }} >
                    <Tooltip id="tooltip-icon" title="Редактировать топик" placement='left'>
                        <Button variant="fab" color="primary" aria-label="add" style={{ marginBottom: '30px' }}>
                            <MessageIcon />
                        </Button>
                    </Tooltip >
                    <Tooltip id="tooltip-icon" title="Редактировать тест" placement='left'>
                        <Button variant="fab" color="primary" aria-label="add" >
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

export default EditButton