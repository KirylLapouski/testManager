import React from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
import Modal from "material-ui/Modal";
import Button from "material-ui/Button";
import TextField from 'material-ui/TextField';
class SimpleModal extends React.Component {
    render() {
        return (<div>
            <Modal open={this.props.open} onClose={this.props.handleClose}>
                <div style={{ display: "flex", flexDirection: "column", height: "400px", width: "300px", position: "absolute", left: "50%", marginLeft: `-${300 / 2}px`, top: "50%", marginTop: `-${400 / 2}px`, background: "white", padding: "30px" }}>
                    <h3>Создать курс</h3>
                    <TextField id="name" label="Название курса" margin="normal" />
                    <TextField id="name" label="Раздел" margin="normal" />
                    <TextField id="name" label="Предмет" margin="normal" />
                    <div style={{display:"flex",alignSelf:"flex-end",marginTop:"45px"}}>
                        <Button onClick={this.props.handleClose}>Отмена</Button>
                        <Button variant="raised" color="primary">Создать</Button>
                    </div>

                </div>
            </Modal>
        </div>
        );
    }
}

SimpleModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func

}

// We need an intermediary variable for handling the recursive nesting.

export default SimpleModal;
