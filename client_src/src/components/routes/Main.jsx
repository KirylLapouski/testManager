import React from 'react'
import CourseContainer from '../CourseContainerStatefull'
import { Switch, Route } from 'react-router-dom'
import TestContainer from '../testCMS/TestContainerStatefull'
import TopicContainer from '../TopicContainerStatefull'
import LoginInContainer from '../LoginInContainer'
import SignUp from '../SignUp'
import ProfileContainer from '../ProfileContainer'
import SingleCourseContainer from '../course/SingleCourseContainer'
class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/cources" component={CourseContainer} />
                <Route path="/cources/:userId" component={CourseContainer}/> 
                <Route path="/:courseId/lessons" component={SingleCourseContainer} />
                <Route path="/lesson/:lessonId/topic/:topicId/testEditor" component={TestContainer} />                    
                <Route path="/lesson/:lessonId/topic/:topicId" component={TopicContainer} />
                <Route path="/" exact component={LoginInContainer}/>
                <Route path="/signUp" component={SignUp} />
                <Route path="/profile" component={ProfileContainer  }/>
            </Switch >
        )
    }
}

export default Main
