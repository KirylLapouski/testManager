import React from 'react';
import  {Link} from 'react-router-dom'
import toastr from 'toastr';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
class LoginIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.validate = this.validate.bind(this)
    }

    onChangeHandler(e) {
        var { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    validate() {
        //email validation
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var address = this.state.mail;
        if (reg.test(address) == false) {
            toastr.error("Неправильный email");
            return false;
        }
        if (!document.forms.loginIn.elements.mail.value || !document.forms.loginIn.elements.password.value) {
            toastr.error("Все поля должны быть заполнены");
            return false;
        }
        return true;
    }
    onSubmitHandler(e) {
        e.preventDefault();

        if (!this.validate())
            return;

        var xhr = new XMLHttpRequest();
        xhr.open('POST','http://localhost:3000/api/Users/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {

            console.log(xhr.responseText);
            // if (xhr.status != 404) {
            //     xhr.open('GET', config.rootUrl + config.dbApi + "/getEnteredUser", true);
            //     xhr.send();

            //     xhr.onload = () => {
            //         if (xhr.status == 500) {
            //             toastr.error("Can not login with this data");
            //         } else {
            //             var currentUser = JSON.parse(xhr.responseText);
            //             localStorage.setItem("currentUser", JSON.stringify(currentUser));
            //             document.location.href = config.rootUrl + config.userCabinet + "/" + currentUser._id;
            //         }
            //     }
            // }
        }

        xhr.send(JSON.stringify({ mail: this.state.mail, password: this.state.password }));
    }
    render() {
        return (<div  style={{ backgroundImage: "url('https://mdbootstrap.com/img/Photos/Others/images/78.jpg')",height:"100vh",  backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>

            <div className="w-100 h-100 mask rgba-black-light d-flex justify-content-center align-items-center">

                <div className="container">

                    <div className="row wow fadeIn" style={{ visibility: "visible", animationName: "fadeIn" }}>

                        <div className="col-md-6 mb-4 white-text text-center text-md-left">

                            <h1 className="display-4 font-weight-bold">Learn Bootstrap 4 with MDB</h1>

                            <hr className="hr-light" />

                            <p>
                                <strong>Best &amp; free guide of responsive web design</strong>
                            </p>

                            <p className="mb-4 d-none d-md-block">
                                <strong>The most comprehensive tutorial for the Bootstrap 4. Loved by over 500 000 users. Video and written versions
                                    available. Create your own, stunning website.</strong>
                            </p>

                            <a target="_blank" href="https://mdbootstrap.com/bootstrap-tutorial/" className="btn btn-indigo btn-lg waves-effect waves-light">Start free tutorial
                                <i className="fa fa-graduation-cap ml-2"></i>
                            </a>

                        </div>
                        <form method="POST" name="loginIn" className="form-signin" onSubmit={this.onSubmitHandler} style={{ borderRadius: "5px",padding:"20px",minHeight:"500px",display:"flex",flexDirection:"column",justifyContent:"center", backgroundColor: "#fff", color: "#4f4f4f" }}>
                            <h1 style={{marginBottom:"30px"}}>Вход</h1>
                            <label htmlFor="inputEmail" className="sr-only">Электронная почта</label>
                            <input onChange={this.onChangeHandler} type="text" name="mail" id="inputEmail" className="form-control" placeholder="Электронная почта" required autoFocus />
                            <label htmlFor="inputPassword" className="sr-only">Пароль</label>
                            <input onChange={this.onChangeHandler} type="password" name="password" id="inputPassword" className="form-control" placeholder="Пароль" required />
                            <br />

                            <button className="btn btn-lg btn-primary btn-block" type="submit">Вход</button><br />
                            <a role="button" href="auth/linkedin" className="btn btn-light-blue btn-block btn-li waves-effect waves-light"><i className="fa fa-linkedin pr-1"></i> Linkedin</a>
                            <div className="modal-footer pr-0">
                                <div className="options font-weight-light">
                                    <p>Не зарегистрированы?  <Link style={{color:"blue"}} to="/signUp">Регистрация</Link></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default LoginIn;