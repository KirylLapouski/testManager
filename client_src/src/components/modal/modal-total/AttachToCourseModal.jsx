import React from "react";
import PropTypes from "prop-types";
import { attachUserToCource } from "../../../redux/AC/users";
import { connect } from "react-redux";
import toastr from "toastr";
import ModalBase from "../ModalBase";
import SingleTextField from "../modal-content/SingleTextField";
class AttachToCourseModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            secretWord: ""
        };
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props
            .attachUserToCource(this.props.userId, this.state.secretWord)
            .then(
                () => {
                    toastr.success("Успешно добавлен к курсу");
                },
                () => {
                    toastr.error("Ошибка присоединения к курсу");
                }
            );
        this.props.handleClose();
    };

    onChangeHandler = e => {
        var { value } = e.target;
        this.setState({
            secretWord: value
        });
    };
    render() {
        var { open, handleClose } = this.props;
        return (
            <ModalBase
                title={"Присоединится к курсу"}
                width="350px"
                minHeight="250px"
                open={open}
                handleClose={handleClose}
            >
                <SingleTextField
                    textFieldTitle="Секретное слово"
                    handleClose={handleClose}
                    onChangeHandler={this.onChangeHandler}
                    handleSubmit={this.handleSubmit}
                />
            </ModalBase>
        );
    }
}

AttachToCourseModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    //redux
    userId: PropTypes.number
};

const mapStateToProps = state => {
    return {
        userId: state.users.loggedIn && state.users.loggedIn.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        attachUserToCource(userId, secretWord) {
            return dispatch(attachUserToCource(userId, secretWord));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AttachToCourseModal);
