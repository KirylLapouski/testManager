import React from 'react';
import CourseContainer from './CourseContainer';
import LessonContainer from './LessonContainer';
import TopicContainer from './TopicContainer';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
class Main extends React.Component {
    render() {
        return( 
        <Router>
        <Switch>
            <Route exact path="/" component={CourseContainer}/>
            <Route path="/lessons" component={LessonContainer}/>
            <Route path="/lesson/topic" component={TopicContainer}/>
        </Switch>
        </Router>)
    }
}

export default Main