import React from 'react'
import toastr from 'toastr'
import ProfileCard from './ProfileCard'

class Profile extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            city: '',
            fileName: ''
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



    upload(file) {

        // var data = new FormData();
        // data.append('file', file);

        // var xhr = new XMLHttpRequest();
        // // обработчики можно объединить в один,
        // // если status == 200, то это успех, иначе ошибка
        // xhr.onload = xhr.onerror = function () {
        //     if (this.status == 200) {
        //         toastr.success("Image was loaded");
        //     } else {
        //         toastr.error("Error when load image");
        //     }
        // };

        // xhr.open("POST", config.dbApi + "/" + this.state._id + "/image", true);
        // xhr.send(data);
    }
    emailValidation(email) {
        //email validation
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

        if (reg.test(email) == false) {
            toastr.error('Wrong email format')
            return false
        }
        return true
    }
    phoneValidation(phone) {
        var reg = /^\d[\d\(\)\ -]{4,14}\d$/
        if (reg.test(phone) == false) {
            toastr.error('Wrong phone number format')
            return false
        }
        return true
    }
    nameValidation(name, field) {
        var reg = /^[а-яА-ЯёЁa-zA-Z0-9]+$/
        if (reg.test(name) == false) {
            toastr.error('Wrong ' + field ? field : 'name' + 'format')
            return false
        }
        return true
    }
    onSubmitHandler(e) {
        e.preventDefault()

        // var form = document.querySelector('form[name="userEdit"]');
        // var file = form.elements.imageFile.files[0];
        // if (file) {
        //     this.upload(file);
        // }

        // var xhr = new XMLHttpRequest();
        // xhr.open('PUT', config.rootUrl + config.dbApi, true);
        // xhr.setRequestHeader('Content-Type', 'application/json');

        // //create request body (user changes)
        // var user = { _id: this.state._id };
        // if (this.state.email) {
        //     user.email = this.state.email;
        //     if (!this.emailValidation(this.state.email))
        //         return;
        // }
        // if (this.state.firstName) {
        //     user.firstName = this.state.firstName;
        //     if (this.nameValidation(this.state.fileName))
        //         return;
        // }
        // if (this.state.lastName) {
        //     user.lastName = this.state.lastName;
        //     if (this.nameValidation(this.state.lastName))
        //         return;
        // }
        // if (this.state.phoneNumber) {
        //     user.phoneNumber = this.state.phoneNumber;
        //     if (!this.phoneValidation(this.state.phoneNumber))
        //         return;
        // }
        // if (this.state.city) {

        //     user.city = this.state.city;
        //     if (this.nameValidation(this.state.city, "city"))
        //         return;
        // }



        // xhr.onload = () => {
        //     if (xhr.status == 200) {

        //         localStorage.setItem('currentUser', JSON.stringify(user));
        //         toastr.success('User was edited successful');
        //     } else {
        //         toastr.error('Something goes wrong', 'User was not edited');

        //     }
        // }
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
    render() {

        return <div className="row" style={{ maxWidth: '1200px', margin:'0 auto', marginTop: '10vh',color:'#37474F' }}>
            <ProfileCard email={this.state.email} firstName={this.state.firstName} lastName={this.state.lastName} imageSrc={this.state.fileName?this.state.fileName:null}/>
            <div className="col-8" style={{ textAlign: 'left' }}>
                <div className="card" >
                    <form name="userEdit" style={{ padding: '40px' }}>
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
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Электронная почта</label>
                            <input onChange={this.onChangeHandler} type="email" name="email" id="inputEmail" className="form-control" placeholder="lapkovskyk@mail.ru" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputGroupFile01">Фото</label><br />
                            <div className="custom-file">
                                <input name="imageFile" type="file" className="custom-file-input" id="inputGroupFile01" />
                                <label className="custom-file-label" htmlFor="inputGroupFile01">{document.querySelector ? this.state.fileName : 'Choose file'}</label>
                            </div>
                        </div>
                        <button type="button" onClick={this.onSubmitHandler} className="btn btn-primary btn-md">Принять изменения</button>
                    </form>
                </div>
            </div>
        </div>
    }
}


export default Profile