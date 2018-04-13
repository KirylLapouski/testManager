import React from 'react'
import Lesson from './Lesson'
import axios from 'axios';

class LessonContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lessons: []
        }
    }
    componentWillMount() {
        axios.get("http://localhost:3000/api/Disciplines/" + this.props.match.params.courseId + '/lessons')
            .then(response => {
                this.setState({
                    lessons: response.data
                })
            })
    }
    render() {
        if(this.state.lessons){
            var lessons = this.state.lessons.map((value,index,array)=>{
                return ( <Lesson title={value.title}/>)
            })
        }


        return (
            <div className="container">
               {lessons}
            </div>
        )
    }
}

export default LessonContainer;