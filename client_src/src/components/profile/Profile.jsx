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
            userName,
            email,
            firstName,
            lastName,
            handleTabChange,
            handleChangeIndex,
            onChangeHandler,
            onSubmitHandler,
            savedEmail,
            savedUsername,
            savedFirstName,
            savedSecondName,
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
                        <ProfileCard email={savedEmail} username={savedUsername} imageUrl={userImageSrc} firstName={savedFirstName} secondName={savedSecondName} />
                        <ChangeProfileForm onChangeHandler={onChangeHandler} userName={userName} email={email} firstName={firstName} lastName={lastName} hasYandexToken={hasYandexToken} onSubmitHandler={onSubmitHandler} />
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
    savedEmail: PropTypes.string,
    savedUsername: PropTypes.string,
    savedFirstName: PropTypes.string,
    savedSecondName: PropTypes.string,
    userId: PropTypes.number,
    userImageSrc: PropTypes.string,
    hasYandexToken: PropTypes.bool,
    courses: PropTypes.object,
    userName: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    tabsValue: PropTypes.number,
    handleTabChange: PropTypes.func,
    handleChangeIndex: PropTypes.func,
    onChangeHandler: PropTypes.func,
    onSubmitHandler: PropTypes.func,
}

export default Profile
