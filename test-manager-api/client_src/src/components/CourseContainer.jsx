import React from 'react';
import Course from './Course'
import PropTypes from 'prop-types';
import axios from 'axios';
class CourseContainer extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            courses: []
        }
    }
    static propTypes = {
        recordsInRows: PropTypes.number
    }
    static defaultProps ={
        recordsInRows: 4
    }

    componentWillMount(){
        var self = this;
        axios.get('http://localhost:3000/api/Disciplines')
            .then(response=>{
                self.setState({
                    courses: response.data
                });
            })
    }

    render() {
        if(this.state.courses){
            var courses = this.state.courses.map((value,index,array)=>{
                return (<div key= {value.id} className="col-xl-3 col-lg-4 col-md-6"><Course title={value.title}/></div>)
            })
        }

        return (
            <div className="z-depth-1 container-fluid" style={{maxWidth:'1300px'}}>
                <div className="row">
                    {courses}    
                </div>
            </div>
        )
    }
}

export default CourseContainer;