import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import Question from './Question';
import { connect } from 'react-redux';
import { loadQuestion } from '../redux/AC/question';
import AppBar from 'material-ui/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from 'material-ui/Typography';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { withStyles } from '@material-ui/core/styles';
import Chart from './Chart'
import CloseIcon from '@material-ui/icons/Close'

// TODO: test not always opening
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3, backgroundColor: "white" }}>
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
            AnswersWeight: [],
            //bootstrap state
            collapse: false,
            //tab
            value: 0,
            displayChart: false
        }
        this.handleRightAnswer = this.handleRightAnswer.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    toggle() {
        this.setState({
            collapse: !this.state.collapse
        })
    }


    handleRightAnswer = (numberInArray)=>(weight) => {
        this.setState(prevState => {
            var newState = prevState.AnswersWeight.slice()
            newState[numberInArray] = weight
            return {
                AnswersWeight: newState,
                value: prevState.value + 1
            }
        })
    }

    handleWrongAnswer = (numberInArray)=>() => {
        this.setState(prevState => {
            var newState = prevState.AnswersWeight.slice()
            newState[numberInArray] = 0
            return {
                AnswersWeight: newState,
                value: prevState.value + 1
            }
        })
    }

    handleTestSubmit = () => {
        this.setState({
            collapse: false,
            displayChart: true
        });
    }
    handleChartClose= ()=>{
        this.setState({
            displayChart:false
        })
    }
    componentWillMount() {
        this.props.getQuestions(this.props.topicId)
    }
    getAnswersWeight=()=>{
        return this.state.AnswersWeight.reduce((accumulator,value)=>{return accumulator+value},0)
    }
    render() {

        var weight = 0;
        var questionsRes = this.props.questions.map((value, index) => {
            weight += value.weight
            return <TabContainer key={value.id}  tabId={index + 1}>
                <Question onWrongAnswer={this.handleWrongAnswer(index)} onRightAnswer={this.handleRightAnswer(index)} question={value} />
            </TabContainer>
        })
        questionsRes.push(<TabContainer><Button color="primary" className="float-right" onClick={this.handleTestSubmit}>Завершить</Button></TabContainer>)
        var navs = this.props.questions.map((value, index) => {
            return <Tab label={index + 1} />
        })
        navs.push(<Tab label='Завершить тест' icon={<DoneAllIcon />} />)

        return <div>
            <Button onClick={this.toggle} variant="outlined" color="primary" style={{ marginTop: '20px' }}>{this.state.collapse ? "Закрыть тест" : 'Открыть тест'}</Button>
            <Collapse in={this.state.collapse}>
                <Router>
                    <div style={{ marginTop: '20px' }}>
                        <AppBar position="static" >
                            <Tabs scrollable scrollButtons="on" indicatorColor="secondary" value={this.state.value} onChange={this.handleChange}>
                                {navs}
                            </Tabs>
                            {questionsRes[this.state.value]}
                        </AppBar>
                        {this.state.displayChart && <div style={{ color: 'white', position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', top: '0', right: '0', bottom: '0', left: '0', zIndex: '2' }}>
                            <Button onClick={this.handleChartClose} style={{position:'absolute', top:'50px', right:'50px',backgroundColor:'#3f51b5',boxShadow:'none'}} variant="fab"><CloseIcon style={{color:'white'}} /></Button>
                            <Chart rightAnswersWeight={this.getAnswersWeight()} wrongAnswersWeight={weight - this.getAnswersWeight()} />
                        </div>
                        }
                    </div>
                </Router>
            </Collapse>
        </div>
    }
}

Test.propTypes = {
    topicId: PropTypes.number.isRequired,
    //redux
    questions: PropTypes.arrayOf(PropTypes.object),
    loggedInUser: PropTypes.object
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
    return { questions: res, loggedInUser: state.users.loggedIn }
}

const mapDispatchToProps = dispatch => {
    return {
        getQuestions(topicId) {
            dispatch(loadQuestion(topicId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Test)