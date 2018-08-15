import React from 'react'
import ProfileCard from './ProfileCard'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'
import CourseResultContainer from '../course/course-page/course-result/CourseResultContainer'
import CourseResultNumbers from '../course/course-page/course-result/CourseResultNumbers'
//TODO: rewrite on function
class Profile extends React.Component {
    render() {
        return (
            <div
                className="row"
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    marginTop: '10vh',
                    color: '#37474F'
                }}
            >
                <Tabs
                    value={this.props.tabsValue}
                    style={{ width: '100%', marginBottom: '10px' }}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.props.handleTabChange}
                >
                    <Tab label="Общая информация" />
                    <Tab label="Учёба" />
                </Tabs>
                <SwipeableViews
                    index={this.props.tabsValue}
                    onChangeIndex={this.props.handleChangeIndex}
                    style={{ width: '100%' }}
                >
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            paddingBottom: '10px'
                        }}
                    >
                        <ProfileCard />
                        <div className="col-8" style={{ textAlign: 'left' }}>
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
                                                    this.props.onChangeHandler
                                                }
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
                                                    this.props.onChangeHandler
                                                }
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
                                                    this.props.onChangeHandler
                                                }
                                                name="userName"
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="User"
                                            />
                                        </div>
                                    </div>
                                    {this.props.hasYandexToken || (
                                        <div className="form-group">
                                            <label htmlFor="inputEmail">
                                                Электронная почта
                                            </label>
                                            <input
                                                onChange={
                                                    this.props.onChangeHandler
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
                                        <div className="custom-file">
                                            <input
                                                name="imageFile"
                                                onChange={this.checkIsImage}
                                                accept="image/*"
                                                type="file"
                                                className="custom-file-input"
                                                id="inputGroupFile01"
                                            />
                                            <label
                                                className="custom-file-label"
                                                htmlFor="inputGroupFile01"
                                                style={{ color: '#495057' }}
                                            >
                                                {' '}
                                                {this.props.fileName
                                                    .split('\\')
                                                    .reverse()[0] ||
                                                    'Choose file'}
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        onClick={this.props.onSubmitHandler}
                                        className="btn btn-primary btn-md"
                                    >
                                        Принять изменения
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        paddingBottom: '10px',
                        flexDirection: 'column'
                    }}>
                        {this.props.courses && this.props.courses.map(({ id: courseId, title }) => {
                            return <CourseResultContainer userId={this.props.userId} courseId={courseId} courseTitle={title}>
                                <CourseResultNumbers />
                            </CourseResultContainer>
                        })}
                    </div>
                </SwipeableViews>
            </div>
        )
    }
}

Profile.propTypes = {
    userId: PropTypes.number,
    userImageSrc: PropTypes.string,
    hasYandexToken: PropTypes.bool,
    courses: PropTypes.object,
    addUserImage: PropTypes.func,
    updateLoggedUser: PropTypes.func,
    userName: PropTypes.string,
    email: PropTypes.string,
    fileName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    tabsValue: PropTypes.number
}

export default Profile
