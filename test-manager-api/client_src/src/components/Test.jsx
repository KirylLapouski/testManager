import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Question from './Question';
class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: []
        }
    }

    static propTypes = {
        topicId: PropTypes.number.isRequired
    }

    componentWillMount() {
        axios.get("http://localhost:3000/api/Topics/" + this.props.topicId + "/questions")
            .then(response => {
                var result = [];
                for (var i = 0; i < response.data.length; i++) {
                    this.setState((prevState) => {
                        questions: prevState.questions.push({
                            id: response.data[i].id,
                            title: response.data[i].title,
                            description: response.data[i].description
                        })
                    })

                    result.push({ id: response.data[i].id, title: response.data[i].title, description: response.data[i].description })
                }

                return result;
            })
    }


    render() {
        return this.state.questions.map((value, index) => {
            return <Question key={value.id} question={value} />
        })
    }
}

export default Test;