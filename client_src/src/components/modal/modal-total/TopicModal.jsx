import React from "react";
import ModalBase from "../ModalBase";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import toastr from "toastr";
import { addTopic } from "../../../redux/AC/topic";
import { addFileToUser } from "../../../modules/workingWithFiles";
import { connect } from "react-redux";
import SingleTextField from "../modal-content/SingleTextField";
import { withRouter } from "react-router-dom";
class TopicModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ""
        };
    }

    // parseVideoForYouTube(url) {
    //     const youtube = "https://www.youtube.com/embed/";
    //     let videoId = url.split("=");
    //     let result = youtube.concat(videoId[1]);
    //     return result;
    // }

    // checkIsHostUrl(urlAdress, domen) {
    //     if (!urlAdress) return false;
    //     let parsedUrl = url.parse(urlAdress);
    //     if (parsedUrl.host == domen) return true;
    //     return false;
    // }
    // handleYouTubeClick = () => {
    //     //TODO: check that is youtube video and validate
    //     const src = window.prompt("Введите URL видео с youtube:");
    //     if (!src) return;
    //     if (!isUrl(src)) {
    //         toastr.error("Введённая строка не является url");
    //         return;
    //     }
    //     if (this.checkIsHostUrl(src, "www.youtube.com")) {
    //         let parsedUrl = this.parseVideoForYouTube(src);
    //     } else {
    //         toastr.error("Это видео не принадлежит youtube.com");
    //         return;
    //     }
    //     if (!this.state.title) {
    //         toastr.error(
    //             "Поле заголовка является обязательным",
    //             "Ошибка отправки формы"
    //         );
    //         return;
    //     }
    //     let node = initVideo;
    //     node = node.split("|");
    //     node[1] = parsedUrl;
    //     //TODO: new reducer
    //     this.props
    //         .createTopic(this.props.lessonId, node.join(""), this.state.title)
    //         .then(
    //             () => {
    //                 toastr.success("Новый топик был успешно добавлен");
    //             },
    //             err => {
    //                 toastr.error(err.message);
    //             }
    //         );
    //     this.props.handleClose();
    // };

    // handleSoundCloudClick = () => {
    //     //TODO: check that is youtube video and validate
    //     const src = window.prompt("Введите URL с sound cloud:");
    //     if (!src) return;
    //     if (!isUrl(src)) {
    //         toastr.error("Введённая строка не является url");
    //         return;
    //     }
    //     if (!this.checkIsHostUrl(src, "soundcloud.com")) {
    //         toastr.error("Это видео не принадлежит soundcloud.com");
    //         return;
    //     }
    //     if (!this.state.title) {
    //         toastr.error(
    //             "Поле заголовка является обязательным",
    //             "Ошибка отправки формы"
    //         );
    //         return;
    //     }

    //     let node = initVideo;
    //     node = node.split("|");
    //     node[1] = src;
    //     //TODO: new reducer
    //     this.props
    //         .createTopic(this.props.lessonId, node.join(""), this.state.title)
    //         .then(
    //             () => {
    //                 toastr.success("Новый топик был успешно добавлен");
    //             },
    //             err => {
    //                 toastr.error(err.message);
    //             }
    //         );
    //     this.props.handleClose();
    //     toastr.success("Новый топик был успешно добавлен");
    // };

    upload = e => {
        e.preventDefault();
        // if (!filefield.files[0].type.match('image.*'))
        //     throw new Error('Фотография пользователя должна быть изображением','Ошибка отправки формы');
        if (!this.state.title) {
            toastr.error(
                "Поле заголовка является обязательным",
                "Ошибка отправки формы"
            );
            return;
        }
        this.props.createTopic(this.props.lessonId, " ", this.state.title).then(
            topic => {
                toastr.success("Новый топик был успешно добавлен");
                this.handleClose();
                console.log(topic);

                this.props.history.push(
                    `/lesson/${this.props.lessonId}/topic/${topic.id}`
                );
            },
            () => {
                toastr.error("Ошибка при создании топика");
            }
        );

        // if (Object.keys(this.state.files).length === 0) {
        //     toastr.error("Выберите файл", "Ошибка отправки формы");
        //     return;
        // }

        // let { userId, addFileToUser } = this.props;
        // let sendingForm = new FormData();
        // sendingForm.append("file", this.state.files[0]);

        // const cookies = new Cookies();
        // addFileToUser(userId, sendingForm, !!cookies.get("yandexToken")).then(
        //     fileInfo => {
        //         toastr.success("Файл успешно загружен");
        //     },
        //     () => {
        //         toastr.error("Ошибка загрузки файла на сервер");
        //     }
        // );
        // toastr.info(
        //     "Новый топик появится сразу после полной загрузки файла на сервер.",
        //     "Файл отправляется на сервер."
        // );
    };

    // onFilesError = error => {
    //     switch (error.code) {
    //         case 1:
    //             toastr.error(
    //                 "Неправильный тип файла",
    //                 "Ошибка при выборе файла"
    //             );
    //             return;
    //         case 2:
    //             toastr.error(
    //                 "Выбранный файл слишком большой",
    //                 "Ошибка при выборе файла"
    //             );
    //             return;
    //         case 3:
    //             toastr.error(
    //                 "Выбранный файл слишком маленький",
    //                 "Ошибка при выборе файла"
    //             );
    //             return;
    //         case 4:
    //             toastr.error(
    //                 "Превышено максимально допустимое количество файлов",
    //                 "Ошибка при выборе файла"
    //             );
    //             return;
    //         default:
    //             toastr.error("Ошибка при загрузке файла");
    //     }
    // };

    handleClose = () => {
        this.setState({
            title: "",
            files: []
        });
        this.props.handleClose();
    };

    // onFilesChange = files => {
    //     this.setState({
    //         files
    //     });
    // };

    handleChange = e => {
        this.setState({
            title: e.target.value
        });
    };
    render() {
        let { open } = this.props;
        return (
            <ModalBase
                title={"Создать топик"}
                open={open}
                handleClose={this.handleClose}
                width="300px"
                minHeight="200px"
            >
                <SingleTextField
                    handleClose={this.handleClose}
                    onChangeHandler={this.handleChange}
                    handleSubmit={this.upload}
                    textFieldTitle={"Название топика"}
                />
            </ModalBase>
        );
    }
}

TopicModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    lessonId: PropTypes.number,
    //redux
    createTopic: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
    return {
        createTopic(lessonId, node, title) {
            return dispatch(addTopic(lessonId, node, title));
        }
    };
};
export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(TopicModal)
);
