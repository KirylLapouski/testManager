import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Question from './Question';
import { Button, Collapse, TabPane, TabContent, Nav, NavItem, NavLink, Container } from 'mdbreact';
class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            rightAnswersWeight: 0,
            //bootstrap state
            collapse: false,
            //tab
            activeItemPills: 1
        }

        this.handleRightAnswer = this.handleRightAnswer.bind(this);
        this.toggle = this.toggle.bind(this);

        //Tab
        this.togglePills = this.togglePills.bind(this);

    }

    togglePills(tab) {
        if (this.state.activeItemPills !== tab) {
            this.setState({
                activeItemPills: tab
            })
        }
    }

    toggle() {
        this.setState({
            collapse: !this.state.collapse
        })
    }
    static propTypes = {
        onTestSubmit: PropTypes.func.isRequired,
        topicId: PropTypes.number.isRequired
    }

    handleRightAnswer(weight) {
        return () => {
            this.setState(prevState => {
                return { rightAnswersWeight: prevState.rightAnswersWeight + weight }
            })
        }
    }

    getQuestions(topicId) {
        axios.get("http://localhost:3000/api/Topics/" + topicId + "/questions")
            .then(response => {
                this.setState({
                    questions: response.data
                })

                return response.data;
            })
    }
    componentWillMount() {
        this.getQuestions(this.props.topicId)
    }
    render() {

        var weight = 0;
        var questions = this.state.questions.map((value, index) => {
            weight += value.weight
            return (<TabPane key={value.id} tabId={index + 1}>
                <Question onRightAnswer={this.handleRightAnswer(value.weight)} question={value} />
            </TabPane>)
        })
        var navs = this.state.questions.map((value, index) => {
            return <NavItem key={value.id} >
                <NavLink to="#" className={this.state.activeItemPills === index + 1 ? "cyan darken-4" : " "} onClick={() => { this.togglePills(index + 1); }}>
                    {index + 1}
                </NavLink>
            </NavItem>
        })

        return <div>
            <Button onClick={this.toggle}>{this.state.collapse?"Close Test":"Open Test"}</Button>
            <Collapse isOpen={this.state.collapse}>
                <Router>
                    <Container className="mt-4">
                        <Nav style={{ width: "95%", margin: "0 auto" }} tabs="true" className=" cyan darken-3 z-depth-2">
                            {navs}
                        </Nav>
                        <TabContent className="z-depth-1 clearfix" style={{ padding: "20px",position:"relative",top:"-10px" }} activeItem={this.state.activeItemPills}>
                            {questions}
                            {this.state.activeItemPills === this.state.questions.length && <Button  color="primary" className="float-right" onClick={this.props.onTestSubmit(this.state.rightAnswersWeight, weight)}>Submit Test</Button>}
                        </TabContent>
                    </Container>
                </Router>
            </Collapse>
        </div>
    }
}

export default Test;