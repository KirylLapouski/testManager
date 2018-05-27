import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Question from './Question';
import { connect } from 'react-redux';
import { loadQuestion } from '../redux/AC/question';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { Button, Container, Collapse } from 'mdbreact'
// TODO: test not always opening
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3,backgroundColor:"white"}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rightAnswersWeight: 0,
            //bootstrap state
            collapse: false,
            //tab
            value: 0
        }

        this.handleRightAnswer = this.handleRightAnswer.bind(this);
        this.toggle = this.toggle.bind(this);

        //Tab
        //  this.togglePills = this.togglePills.bind(this);

    }

    // togglePills(tab) {
    //     if (this.state.activeItemPills !== tab) {
    //         this.setState({
    //             activeItemPills: tab
    //         })
    //     }
    // }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    toggle() {
        this.setState({
            collapse: !this.state.collapse
        })
    }


    handleRightAnswer(weight) {
        return () => {
            this.setState(prevState => {
                return { rightAnswersWeight: prevState.rightAnswersWeight + weight }
            })
        }
    }

    // getQuestions(topicId) {
    //     axios.get("http://localhost:3000/api/Topics/" + topicId + "/questions")
    //         .then(response => {
    //             this.setState({
    //                 questions: response.data
    //             })

    //             return response.data;
    //         })
    // }
    componentWillMount() {
        this.props.getQuestions(this.props.topicId)
    }
    render() {

        var weight = 0;
        var questionsRes = this.props.questions.map((value, index) => {
            weight += value.weight
            return <TabContainer key={value.id} style={{backgroundColor:"white"}} tabId={index + 1}>
                <Question onRightAnswer={this.handleRightAnswer(value.weight)} question={value} />
            </TabContainer>
        })
        var navs = this.props.questions.map((value, index) => {
            return <Tab label={index + 1} />
        })

        return <div>
            <Button onClick={this.toggle}>{this.state.collapse ? "Close Test" : "Open Test"}</Button>
            <Collapse isOpen={this.state.collapse}>
                <Router>
                    <Container >
                        <AppBar position="static">
                            {/* <Nav style={{ width: "95%", margin: "0 auto" }} tabs="true" className=" cyan darken-3 z-depth-2">
                            {navs}
                        </Nav> */}
                            <Tabs value={this.state.value} onChange={this.handleChange}>
                                {navs}
                            </Tabs>
                            {/* <TabContent className="z-depth-1 clearfix" style={{ padding: "20px", position: "relative", top: "-10px" }} activeItem={this.state.activeItemPills}> */}
                            {questionsRes[this.state.value]}
                            {this.state.activeItemPills === this.props.questions.length && <Button color="primary" className="float-right" onClick={this.props.onTestSubmit(this.state.rightAnswersWeight, weight)}>Submit Test</Button>}
                            {/* </TabContent> */}
                        </AppBar>
                    </Container>
                </Router>
            </Collapse>
        </div>
    }
}

Test.propTypes = {
    onTestSubmit: PropTypes.func.isRequired,
    topicId: PropTypes.number.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object)
}

Test.defaultProps = {
    questions: []
}

const mapStateToProps = (state, ownProps) => {
    var res = [];
    for (var key in state.questions) {
        if (Number(ownProps.topicId) === state.questions[key].topicId) {
            res.push(state.questions[key])
        }
    }
    return { questions: res }
}

const mapDispatchToProps = dispatch => {
    return {
        getQuestions(topicId) {
            dispatch(loadQuestion(topicId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Test)