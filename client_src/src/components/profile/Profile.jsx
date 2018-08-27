import React from 'react'
import ProfileCard from './ProfileCard'
import PropTypes from 'prop-types'
import ChangeProfileForm from './ChangeProfileForm'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'
import CourseResultContainer from '../course/course-page/course-result/CourseResultContainer'
import CourseResultNumbers from '../course/course-page/course-result/CourseResultNumbers'
//TODO: rewrite on function
class Profile extends React.Component {
    render() {
        let { userId,
            userImageSrc,
            hasYandexToken,
            courses,
            addUserImage,
            updateLoggedUser,
            userName,
            email,
            checkIsImage,
            firstName,
            lastName,
            handleTabChange,
            handleChangeIndex,
            onChangeHandler,
            onSubmitHandler,
            tabsValue } = this.props
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
                    value={tabsValue}
                    style={{ width: '100%', marginBottom: '10px' }}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleTabChange}
                >
                    <Tab label="Общая информация" />
                    <Tab label="Учёба" />
                </Tabs>
                <SwipeableViews
                    index={tabsValue}
                    onChangeIndex={handleChangeIndex}
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
                        <ChangeProfileForm onChangeHandler={onChangeHandler} checkIsImage={checkIsImage} userName={userName} email={email} firstName={firstName} lastName={lastName} hasYandexToken={hasYandexToken} onSubmitHandler={onSubmitHandler} />
                    </div >
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        paddingBottom: '10px',
                        flexDirection: 'column'
                    }}>
                        {courses && courses.map(({ id: courseId, title }) => {
                            return <CourseResultContainer userId={userId} courseId={courseId} courseTitle={title}>
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
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    tabsValue: PropTypes.number,
    handleTabChange: PropTypes.func,
    handleChangeIndex: PropTypes.func,
    onChangeHandler: PropTypes.func,
    onSubmitHandler: PropTypes.func,
    checkIsImage: PropTypes.func
}

export default Profile
