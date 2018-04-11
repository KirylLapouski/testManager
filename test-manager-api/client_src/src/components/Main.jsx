import React from 'react';
import CourseContainer from './CourseContainer';
import LessonContainer from './LessonContainer';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
class Main extends React.Component {
    render() {
        return( 
        <Router>
        <Switch>
            <Route path="/" component={CourseContainer}/>
            <Route path="/lessons" component={LessonContainer}/>
        </Switch>
        </Router>)
    }
}

export default Main