import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

class ChangeProfileForm extends React.Component {
    render() {
        let {
            onChangeHandler,
            hasYandexToken,
            onSubmitHandler,
            userName,
            email,
            firstName,
            lastName,
        } = this.props
        return <div className="col-8" style={{ textAlign: 'left' }}>
            <div className="card">
                <form
                    encType="multipart/form-data"
                    name="userEdit"
                    method="POST"
                    action="http://localhost:3000/16/setAvatar"
                    style={{ padding: '40px' }}
                >
                    <p>
                        <b>Редактировать профиль</b>
                    </p>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">
                                Имя
                            </label>
                            <input
                                onChange={
                                    onChangeHandler
                                }
                                value={firstName}
                                name="firstName"
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                                placeholder="Кирилл"
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">
                                Фамилия
                            </label>
                            <input
                                onChange={
                                    onChangeHandler
                                }
                                value={lastName}
                                name="lastName"
                                type="text"
                                className="form-control"
                                id="inputPassword4"
                                placeholder="Лапковский"
                            />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="inputEmail4">
                                Логин
                            </label>
                            <input
                                onChange={
                                    onChangeHandler
                                }
                                value={userName}
                                name="userName"
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                                placeholder="User"
                            />
                        </div>
                    </div>
                    {hasYandexToken || (
                        <div className="form-group">
                            <label htmlFor="inputEmail">
                                Электронная почта
                            </label>
                            <input
                                value={email}
                                onChange={
                                    onChangeHandler
                                }
                                type="email"
                                name="email"
                                id="inputEmail"
                                className="form-control"
                                placeholder="lapkovskyk@mail.ru"
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="inputGroupFile01">
                            Фото
                        </label>
                        <br />
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            name="imageFile"
                            style={{
                                position: 'absolute',
                                clip: 'rect(1px, 1px, 1px, 1px)',
                                padding: '0 t',
                                border: '0 t',
                                height: ' 1px ',
                                width: ' 1px t',
                                overflow: 'hidden',
                            }}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" component="span" >
                                Upload
                            </Button>
                        </label>
                    </div>
                    <button
                        type="submit"
                        onClick={onSubmitHandler}
                        className="btn btn-primary btn-md"
                    >
                        Принять изменения
                    </button>
                </form>
            </div>
        </div>
    }
}


ChangeProfileForm.propTypes = {
    userName: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    hasYandexToken: PropTypes.bool,
    onChangeHandle: PropTypes.func,
    onSubmitHandler: PropTypes.func
}
export default ChangeProfileForm
