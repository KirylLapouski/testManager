import React from 'react';
import CourseContainer from './CourseContainer';
import LessonContainer from './LessonContainer';
import TopicContainer from './TopicContainer';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import TestContainer from './testCMS/TestContainer.jsx';
class Main extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/testEditor" render={({ match }) => {return  <TestContainer question="Question1" answers={[{ text: "asdfa" },{ text: "qweq" },{ text: "qasda" }]}/> }} />
                    <Route exact path="/cources" component={CourseContainer} />
                    <Route path="/:courseId/lessons" component={LessonContainer} />
                    <Route path="/lesson/:lessonId/topic/:topicId" component={TopicContainer} />
                    <Route path="/lesson/:lessonId/topics" component={TopicContainer} />
                </Switch>
            </Router>)
    }
}

export default Main