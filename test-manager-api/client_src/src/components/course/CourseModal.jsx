import React from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
import Modal from "material-ui/Modal";
import Button from "material-ui/Button";
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux'
import { addLesson ,loadLessons} from '../../redux/AC/lessons';
//TODO: LOOPBACK СОЗДАЁТ СВОЙ ID (неправильный тип данных?)
class CourseModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }

    onChangeHandler= (e)=> {
        var {value } = e.target;

        this.setState({
            title: value
        });
    }
    handleClick= ()=>{
        this.props.addNewLesson(this.state.title,this.props.courseId);
        this.props.handleClose();
    }
    render() {
        return (<div>
            <Modal open={this.props.open} onClose={this.props.handleClose}>
                <div style={{ display: "flex", flexDirection: "column", height: "250px", width: "300px", position: "absolute", left: "50%", marginLeft: `-${300 / 2}px`, top: "50%", marginTop: `-${400 / 2}px`, background: "white", padding: "30px" }}>
                    <h3>Создать урок</h3>
                    <TextField onChange={this.onChangeHandler} id="name" label="Название урока" name="title" margin="normal" />
                    <div style={{ display: "flex", alignSelf: "flex-end", marginTop: "45px" }}>
                        <Button onClick={this.props.handleClose}>Отмена</Button>
                        <Button variant="raised" type='submit' onClick={this.handleClick} color="primary">Создать</Button>
                    </div>
                </div>
            </Modal>
        </div>
        );
    }
}

CourseModal.propTypes = {
    open: PropTypes.bool,
    courseId: PropTypes.number,
    handleClose: PropTypes.func,
    addNewLesson: PropTypes.func,
    courseId: PropTypes.string
}

const mapDispatchToProps = dispatch => {
    return {
        addNewLesson(title,disciplineId) {
            dispatch(addLesson(title,disciplineId))
        },
        getLessons(){
            dispatch(loadLessons())
        }
    }
}
export default connect(null, mapDispatchToProps)(CourseModal);