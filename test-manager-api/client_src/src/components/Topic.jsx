import React from 'react';
import Test from './Test'
import PropTypes from 'prop-types';
import axios from 'axios'
class Topic extends React.Component {
   constructor(props){
       super(props);

       this.state = {
           hasTests: false
       }
   }

    componentWillMount(){
        axios.get("http://localhost:3000/api/Topics/" + this.props.id + "/questions")
            .then(response=>{
                if(response.data.length){
                    this.setState({
                        hasTests:true
                    })
                }
            })
    }
    render() {
        return <div>Topic
            <span style={{color:"black"}}>{this.props.path}</span>
            {this.state.hasTests && <Test key={this.props.id} onTestSubmit={this.props.handleTestSubmit} topicId={this.props.id}/>}
        </div> 
    }
}

Topic.propTypes = {
    handleTestSubmit: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired
}
export default Topic;   