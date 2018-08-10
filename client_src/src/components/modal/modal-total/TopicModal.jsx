import React from "react";
import ModalBase from "../ModalBase";
import PropTypes from "prop-types";
import DrugnDropFile from "../modal-content/DrugnDropFile";
import TextField from "material-ui/TextField";
import SubmitAndCancel from "../modal-content/SubmitAndCancel";
import Cookies from "universal-cookie";
import { addTopic } from "../../../redux/AC/topic";
import { addFileToUser } from "../../../redux/AC/users";
import { connect } from "react-redux";
import toastr from "toastr";
import isUrl from "is-url";
import url from "url";
import Button from "@material-ui/core/Button";
var initVideo =
    '<div style="text-align:center;margin: 0 auto">\n<iframe width="100%" height="600" style="margin: 0 auto" src="|https://www.youtube.com/embed/ioC2wj4CKss|" frameBorder="0"></iframe>\n</div>\n';

class TopicModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            files: []
        };
    }

    parseVideoForYouTube(url) {
        const youtube = "https://www.youtube.com/embed/";
        var videoId = url.split("=");
        var result = youtube.concat(videoId[1]);
        return result;
    }

    checkIsHostUrl(urlAdress, domen) {
        if (!urlAdress) return false;
        var parsedUrl = url.parse(urlAdress);
        if (parsedUrl.host == domen) return true;
        return false;
    }
    handleYouTubeClick = () => {
        //TODO: check that is youtube video and validate
        const src = window.prompt("Введите URL видео с youtube:");
        if (!src) return;
        if (!isUrl(src)) {
            toastr.error("Введённая строка не является url");
            return;
        }
        if (this.checkIsHostUrl(src, "www.youtube.com")) {
            var parsedUrl = this.parseVideoForYouTube(src);
        } else {
            toastr.error("Это видео не принадлежит youtube.com");
            return;
        }
        if (!this.state.title) {
            toastr.error(
                "Поле заголовка является обязательным",
                "Ошибка отправки формы"
            );
            return;
        }
        var node = initVideo;
        node = node.split("|");
        node[1] = parsedUrl;
        //TODO: new reducer
        this.props
            .createTopic(this.props.lessonId, node.join(""), this.state.title)
            .then(
                () => {
                    toastr.success("Новый топик был успешно добавлен");
                },
                err => {
                    toastr.error(err.message);
                }
            );
        this.props.handleClose();
    };

    handleSoundCloudClick = () => {
        //TODO: check that is youtube video and validate
        const src = window.prompt("Введите URL с sound cloud:");
        if (!src) return;
        if (!isUrl(src)) {
            toastr.error("Введённая строка не является url");
            return;
        }
        if (!this.checkIsHostUrl(src, "soundcloud.com")) {
            toastr.error("Это видео не принадлежит soundcloud.com");
            return;
        }
        if (!this.state.title) {
            toastr.error(
                "Поле заголовка является обязательным",
                "Ошибка отправки формы"
            );
            return;
        }

        var node = initVideo;
        node = node.split("|");
        node[1] = src;
        //TODO: new reducer
        this.props
            .createTopic(this.props.lessonId, node.join(""), this.state.title)
            .then(
                () => {
                    toastr.success("Новый топик был успешно добавлен");
                },
                err => {
                    toastr.error(err.message);
                }
            );
        this.props.handleClose();
        toastr.success("Новый топик был успешно добавлен");
    };

    upload = () => {
        // if (!filefield.files[0].type.match('image.*'))
        //     throw new Error('Фотография пользователя должна быть изображением','Ошибка отправки формы');
        if (!this.state.title) {
            toastr.error(
                "Поле заголовка является обязательным",
                "Ошибка отправки формы"
            );
            return;
        }

        if (Object.keys(this.state.files).length === 0) {
            toastr.error("Выберите файл", "Ошибка отправки формы");
            return;
        }

        var { userId, addFileToUser } = this.props;
        var sendingForm = new FormData();
        sendingForm.append("file", this.state.files[0]);

        const cookies = new Cookies();
        addFileToUser(userId, sendingForm, !!cookies.get("yandexToken")).then(
            fileInfo => {
                toastr.success("Файл успешно загружен");
            },
            () => {
                toastr.error("Ошибка загрузки файла на сервер");
            }
        );
        toastr.info(
            "Новый топик появится сразу после полной загрузки файла на сервер.",
            "Файл отправляется на сервер."
        );
    };

    onFilesError = error => {
        switch (error.code) {
            case 1:
                toastr.error(
                    "Неправильный тип файла",
                    "Ошибка при выборе файла"
                );
                return;
            case 2:
                toastr.error(
                    "Выбранный файл слишком большой",
                    "Ошибка при выборе файла"
                );
                return;
            case 3:
                toastr.error(
                    "Выбранный файл слишком маленький",
                    "Ошибка при выборе файла"
                );
                return;
            case 4:
                toastr.error(
                    "Превышено максимально допустимое количество файлов",
                    "Ошибка при выборе файла"
                );
                return;
            default:
                toastr.error("Ошибка при загрузке файла");
        }
    };

    handleClose = () => {
        this.setState({
            title: "",
            files: []
        });
        this.props.handleClose();
    };

    onFilesChange = files => {
        this.setState({
            files
        });
    };

    handleChange = e => {
        this.setState({
            title: e.target.value
        });
    };
    render() {
        var { open } = this.props;
        return (
            <ModalBase open={open} width="900px" handleClose={this.handleClose}>
                <TextField
                    name="title"
                    onChange={this.handleChange}
                    InputProps={{ disableUnderline: true }}
                    placeholder="Название урока"
                    style={{
                        width: "815px",
                        color: "black",
                        padding: "10px",
                        paddingLeft: 20,
                        marginBottom: "20px",
                        boxShadow: "inset 0px 0px 5px rgba(154, 147, 140, 0.5)"
                    }}
                />
                <DrugnDropFile
                    allowedTypes={["video/*"]}
                    onFilesChange={this.onFilesChange}
                    files={this.state.files}
                    onFilesError={this.onFilesError}
                />

                <div
                    style={{
                        margin: "auto",
                        marginLeft: "0px",
                        position: "absolute",
                        left: "20px",
                        bottom: "20px"
                    }}
                >
                    <Button onClick={this.handleYouTubeClick}>
                        <i
                            className="fa fa-youtube-play"
                            style={{ fontSize: "2em" }}
                            aria-hidden="true"
                        />
                    </Button>
                    <Button onClick={this.handleSoundCloudClick}>
                        <i
                            className="fa fa-soundcloud"
                            style={{ fontSize: "2em" }}
                            aria-hidden="true"
                        />
                    </Button>
                </div>
                <SubmitAndCancel
                    handleSubmit={this.upload}
                    handleClose={this.handleClose}
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
    addFileToUser: PropTypes.func
};

const mapDispatchToProps = dispatch => {
    return {
        createTopic(lessonId, node, title) {
            return dispatch(addTopic(lessonId, node, title));
        },
        addFileToUser(userId, form, yandexUser) {
            return dispatch(addFileToUser(userId, form, yandexUser));
        }
    };
};
export default connect(
    null,
    mapDispatchToProps
)(TopicModal);
