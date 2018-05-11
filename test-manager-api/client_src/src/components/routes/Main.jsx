import React from 'react'
import CourseContainer from '../CourseContainer'
import TopicContainer from '../TopicContainer'
import { Switch, Route,BrowserRouter as Router  } from 'react-router-dom'
import TestContainer from '../testCMS/TestContainer.jsx'
import LoginIn from '../LoginIn'
import SignUp from '../SignUp'
import Profile from '../Profile'
import EditableCourse from '../course/EditableCourse'
class Main extends React.Component {
    render() {
        return (
            <Router >
                <Switch>
                    <Route path="/testEditor" render={({ match }) => {return  <TestContainer question="Question1" answers={[{ text: 'asdfa' },{ text: 'qweq' },{ text: 'qasda' }]}/> }} />
                    <Route exact path="/cources" component={CourseContainer} />
                    <Route path="/:courseId/lessons" component={EditableCourse} />
                    <Route path="/lesson/:lessonId/topic/:topicId" component={TopicContainer} />
                    <Route path="/lesson/:lessonId/topics" component={TopicContainer} />
                    <Route path="/" exact component={LoginIn}/>
                    <Route path="/signUp" component={SignUp} />
                    <Route path="/profile" component={Profile}/>
                </Switch >
            </Router>)
    }
}

export default Main