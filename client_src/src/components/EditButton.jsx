import React from 'react'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete';
import MessageIcon from '@material-ui/icons/Message'
import TestIcon from '@material-ui/icons/Assignment'
import Tooltip from 'material-ui/Tooltip';
import Collapse from 'material-ui/transitions/Collapse';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { deleteTopic } from '../redux/AC/topic'
import PropTypes from 'prop-types'
import toastr from 'toastr'
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

    handleEditTestClick = () => {
        this.props.history.push(`${this.props.location.pathname}/testEditor`)
    }

    handleDeleteTopicClick = () => {
        //TODO: go to next topic
        this.props.deleteTopic(this.props.match.params.topicId)
            .then(() => toastr.success('Топик успешно удален'))

    }

    handleTopicEditClick = () => {
        this.props.onTopicEditClick()
        toastr.info('Режим редактирования')
    }
    render() {
        const { open } = this.state;
        return <div style={{ position: 'fixed', bottom: '20px', right: '40px' }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px', width: '70px', alignItems: 'center' }} >
                    <Tooltip id="tooltip-icon" title="Редактировать топик" placement='left'>
                        <Button variant="fab" color="primary" aria-label="add" onClick={this.handleTopicEditClick} style={{ marginBottom: '30px' }}>
                            <MessageIcon />
                        </Button>
                    </Tooltip >
                    <Tooltip id="tooltip-icon" title="Редактировать тест" placement='left' >
                        <Button variant="fab" color="primary" aria-label="add" onClick={this.handleEditTestClick} style={{ marginBottom: '30px' }}>
                            <TestIcon />
                        </Button>
                    </Tooltip >
                    <Tooltip id="tooltip-icon" title="Удалить топик" placement='left'>
                        <Button variant="fab" color="primary" aria-label="add" onClick={this.handleDeleteTopicClick}>
                            <DeleteIcon />
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
    onTopicEditClick: PropTypes.func,
    //redux
    deleteTopic: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTopic(topicId) {
            return dispatch(deleteTopic(topicId))
        }
    }
}
export default withRouter(connect(null, mapDispatchToProps)(EditButton))
