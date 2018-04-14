import React from 'react';
import axios from 'axios';

class Test extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            question: "",
            answers:[]
        }
    }

    componentWillMount(){
        axios.get("")
    }
    render(){
        return <div>Test</div>
    }
}

export default Test;