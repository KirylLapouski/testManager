import React from 'react'
import toastr from 'toastr'
import ProfileCard from './ProfileCard'
import { addImageToUser } from '../redux/AC/users'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { assignloggedInUser } from '../redux/AC/users'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
class Profile extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            email: '',
            fileName: '',
            firstName: '',
            lastName: '',
            tabsValue: 0
        }
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    onChangeHandler(e) {
        var { name, value } = e.target
        this.setState(prevState => ({
            [name]: value
        }))
    }

    upload = filefield => {
        if (!filefield.files[0])
            throw new Error('Выберите изображение')
        if (!filefield.files[0].type.match('image.*'))
            throw new Error('Фотография пользователя должна быть изображением');
        if (filefield.files[0].name.length > 15)
            throw new Error('Название изображения должно быть не больше 15 символов включая расширение файла')

        var { userId, addUserImage } = this.props
        var sendingForm = new FormData()
        sendingForm.append('imageFile', filefield.files[0])
        try {
            addUserImage(userId, sendingForm)
        }catch(e){
            toastr.error(e.message)
        }
        toastr.info('Можете продолжать работу, изменения будут приняты в ближайшее время', 'Форма отправлена')
    }
    emailValidation(email) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

        if (reg.test(email) == false) {
            toastr.error('Неправильный формат электронной почты', 'Ошибка отправки формы')
            return false
        }
        return true
    }
    loginValidation(name) {
        var reg = /^[a-z]{4,}(?:[._-][a-z\d]+)*$/i
        if (reg.test(name) == false) {
            toastr.error('Неправильный логин', 'Ошибка отправки формы')
            return false
        }
        return true
    }

    nameValidation(name, field) {
        var reg = /^[а-яА-ЯёЁa-zA-Z]+$/
        if (reg.test(name) == false) {
            toastr.error(`Такой формат ${field} не поддерживается`, 'Ошибка отправки формы')
            return false
        }
        return true
    }
    checkIsImage = (e) => {
        this.setState({
            fileName: e.target.value
        })
        //TODO: cancel choosen file
        if (!e.target.files[0].type.match('image.*')) {
            toastr.warning('Фотография пользователя должна быть изображением')
            this.setState({
                fileName: ''
            })
        }

    }
    onSubmitHandler(e) {
        e.preventDefault()

        var form = document.querySelector('form[name="userEdit"]')
        //TODO: rewrite on refs
        //TODO: why images rotates?
        var file = form.elements.imageFile.files[0]
        if (file) {
            try {
                this.upload(form.elements.imageFile)
            } catch (e) {
                toastr.error(e.message, 'Ошибка отправки формы')
                return
            }
        }

        var xhr = new XMLHttpRequest();
        xhr.open('PATCH', `http://localhost:3000/api/Participants/${this.props.userId}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        //create request body (user changes)
        var user = {};
        if (this.state.email) {
            user.email = this.state.email;
            if (!this.emailValidation(this.state.email))
                return;
        }
        if (this.state.userName) {
            user.username = this.state.userName;
            if (!this.loginValidation(this.state.userName))
                return;
        }
        if (this.state.firstName) {
            user.firstName = this.state.firstName;
            if (!this.nameValidation(this.state.firstName, 'имени'))
                return;
        }
        if (this.state.lastName) {
            user.lastName = this.state.lastName;
            if (!this.nameValidation(this.state.lastName, 'фамилии'))
                return;
        }
        xhr.onload = () => {
            if (xhr.status == 200) {
                toastr.success('Пользователь успешно изменён');
                this.props.updateLoggedUser(this.props.userId)
            } else {
                toastr.error('Пользователь не был изменён', 'Ошибка сервера');
            }
        }

        xhr.timeout = 3000

        xhr.ontimeout = () => {
            toastr.error('Допустимое время выполнения запроса истекло', 'Ошибка сервера')
        }
        if (Object.keys(user).length === 0) {
            if (!file)
                toastr.error('Хотя бы одно поле должно быть заполнено', 'Ошибка отправки формы')
            return
        }
        xhr.send(JSON.stringify(user))
    }
    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({
        //         _id: JSON.parse(localStorage.getItem("currentUser"))._id ? JSON.parse(localStorage.getItem("currentUser"))._id : "",
        //         firstName: JSON.parse(localStorage.getItem("currentUser")).firstName ? JSON.parse(localStorage.getItem("currentUser")).firstName : "User",
        //         lastName: JSON.parse(localStorage.getItem("currentUser")).lastName ? JSON.parse(localStorage.getItem("currentUser")).lastName : "",
        //         email: JSON.parse(localStorage.getItem("currentUser")).email ? JSON.parse(localStorage.getItem("currentUser")).email : "",
        //         phoneNumber: JSON.parse(localStorage.getItem("currentUser")).phoneNumber ? JSON.parse(localStorage.getItem("currentUser")).phoneNumber : "",
        //         city: JSON.parse(localStorage.getItem("currentUser")).city ? JSON.parse(localStorage.getItem("currentUser")).city : "",
        //     })
        // }, 0);

        //load image there
        // setTimeout(function () {
        //     var xhr = new XMLHttpRequest();
        //     xhr.open('GET', config.rootUrl + config.dbApi + '/' + JSON.parse(localStorage.getItem("currentUser"))._id + '/image', true);
        //     xhr.responseType = "arraybuffer";

        //     xhr.onload = function () {

        //         if (xhr.status == 404) {
        //             toastr.info("You do not have a photo");
        //         } else {
        //             var arrayBufferView = new Uint8Array(this.response);

        //             var blob = new Blob([arrayBufferView], { type: this.responseType })
        //             var urlCreator = window.URL || window.webkitURL;
        //             var imageUrl = urlCreator.createObjectURL(blob);
        //             var img = document.querySelector(".img-fluid");
        //             img.src = imageUrl;
        //         }

        //     }

        //     xhr.send();
        // }, 300);

    }
    //TODO: rewrite on decorators
    handleTabChange = (event, value) => {
        this.setState({
            tabsValue: value
        });
    };

    handleChangeIndex = index => {
        this.setState({ tabsValue: index });
    };


    render() {

        return <div className="row" style={{ maxWidth: '1200px', margin: '0 auto', marginTop: '10vh', color: '#37474F' }}>
            <Tabs value={this.state.tabsValue} style={{ width: '100%' }} indicatorColor="primary" textColor="primary" onChange={this.handleTabChange}>
                <Tab label="Общая информация" />
                <Tab label="Учёба" />
            </Tabs>
            <SwipeableViews index={this.state.tabsValue} onChangeIndex={this.handleChangeIndex} style={{ width: '100%' }}>
                <div style={{ width: '100%', display: 'flex', paddingBottom: '10px' }}>
                    <ProfileCard />
                    <div className="col-8" style={{ textAlign: 'left' }}>
                        <div className="card" >
                            <form encType='multipart/form-data' name="userEdit" method="POST" action="http://localhost:3000/16/setAvatar" style={{ padding: '40px' }}>
                                <p><b>Редактировать профиль</b></p>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4">Имя</label>
                                        <input onChange={this.onChangeHandler} name="firstName" type="text" className="form-control" id="inputEmail4" placeholder="Кирилл" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">Фамилия</label>
                                        <input onChange={this.onChangeHandler} name="lastName" type="text" className="form-control" id="inputPassword4" placeholder="Лапковский" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputEmail4">Логин</label>
                                        <input onChange={this.onChangeHandler} name="userName" type="text" className="form-control" id="inputEmail4" placeholder="User" />
                                    </div>
                                </div>
                                {this.props.hasYandexToken || <div className="form-group">
                                    <label htmlFor="inputEmail">Электронная почта</label>
                                    <input onChange={this.onChangeHandler} type="email" name="email" id="inputEmail" className="form-control" placeholder="lapkovskyk@mail.ru" />
                                </div>}
                                <div className="form-group">
                                    <label htmlFor="inputGroupFile01">Фото</label><br />
                                    <div className="custom-file">
                                        <input name="imageFile" onChange={this.checkIsImage} accept="image/*" type="file" className="custom-file-input" id="inputGroupFile01" />
                                        <label className="custom-file-label" htmlFor="inputGroupFile01" style={{ color: '#495057' }}> {this.state.fileName.split('\\').reverse()[0] || 'Choose file'}</label>
                                    </div>
                                </div>
                                <button type="submit" onClick={this.onSubmitHandler} className="btn btn-primary btn-md">Принять изменения</button>
                            </form>
                        </div>
                    </div>
                </div>
            </SwipeableViews>
        </div>
    }
}

Profile.propTypes = {
    //redux
    userId: PropTypes.number,
    userImageSrc: PropTypes.string,
    hasYandexToken: PropTypes.bool,
    addUserImage: PropTypes.func,
    updateLoggedUser: PropTypes.func,
}
const mapStateToProps = (state) => {
    return {
        userId: state.users.loggedIn && state.users.loggedIn.id,
        hasYandexToken: state.users.loggedIn && !!state.users.loggedIn.yandexToken,
        userImageSrc: state.users.loggedIn ? state.users.loggedIn.imageUrl : 'https://globalblueproject.org/wp-content/uploads/2016/07/blank-profile-picture.png'
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUserImage(userId, image) {
            dispatch(addImageToUser(userId, image))
        },
        updateLoggedUser(userId) {
            dispatch(assignloggedInUser(userId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
