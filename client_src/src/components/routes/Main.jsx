import React from 'react'
import CourseListContainer from '../course/CourseListContainer'
import { Switch, Route } from 'react-router-dom'
import TestContainer from '../testCMS/test-page/TestPageContainer'
import TopicListContainer from '../topic/topic-page/TopicPageContainer'
import LoginInContainer from '../login/LoginInContainer'
import SignUp from '../SignUp'
import ProfileContainer from '../profile/ProfileContainer'
import CoursePageContainer from '../course/course-page/CoursePageContainer'
class Main extends React.Component {
    render() {
        return (
            <Switch>
                {/* <Route exact path="/cources" component={CourseContainer} /> */}
                <Route path="/cources/:userId" component={CourseListContainer} />
                <Route path="/:courseId/lessons" component={CoursePageContainer} />
                <Route path="/lesson/:lessonId/topic/:topicId/testEditor" component={TestContainer} />
                <Route path="/lesson/:lessonId/topic/:topicId" component={TopicListContainer} />
                <Route path="/" exact component={LoginInContainer} />
                <Route path="/signUp" component={SignUp} />
                <Route path="/profile" component={ProfileContainer} />
            </Switch >
        )
    }
}

export default Main
