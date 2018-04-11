import React from 'react';
import Course from './Course'
import PropTypes from 'prop-types';
class CourseContainer extends React.Component {
    static propTypes = {
        recordsInRows: PropTypes.number
    }
    static defaultProps ={
        recordsInRows: 4
    }
    render() {
        return (
            <div className="z-depth-1 container-fluid" style={{maxWidth:'1300px'}}>
                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6"><Course title="Math" desc="asdfa;s asdlfaksd a;ksdl;as dladsla lmasd" /></div>
                    <div className="col-xl-3 col-lg-4 col-md-6"><Course title="Physics" desc="asdfasdasdfa" /></div>
                    <div className="col-xl-3 col-lg-4 col-md-6"><Course title="Physics" desc="asdfasdasdfa" /></div>
                    <div className="col-xl-3 col-lg-4 col-md-6"><Course title="Physics" desc="asdfasdasdfa" /></div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6"><Course title="Physics" desc="asdfasdasdfa" /></div>
            </div>
        )
    }
}

export default CourseContainer;