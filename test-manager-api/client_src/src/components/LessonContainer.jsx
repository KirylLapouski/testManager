import React from 'react'
import Lesson from './Lesson'

class LessonContainer extends React.Component{
    render(){
        return (
            <div className="container">
                <Lesson title="qweqwe" desc="scasdvsa"/>
                <Lesson title="qweqwe" desc="scasdvsa"/>
                <Lesson title="qweqwe" desc="scasdvsa"/>
                <Lesson title="qweqwe" desc="scasdvsa"/>
            </div>
        )
    }
}

export default LessonContainer;