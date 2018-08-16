import React from 'react';
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
import Chart from './chart/Chart'
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
            currentNumberOfTab: 0,
            displayChart: false
        }
        this.handleRightAnswer = this.handleRightAnswer.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleChange = (event, currentNumberOfTab) => {
        this.setState({ currentNumberOfTab });
    };

    toggle() {
        this.setState({
            collapse: !this.state.collapse
        })
    }


    handleRightAnswer = (numberInArray) => (weight) => {
        this.setState(prevState => {
            let newState = prevState.AnswersWeight.slice()
            newState[numberInArray] = weight
            return {
                AnswersWeight: newState,
                currentNumberOfTab: prevState.currentNumberOfTab + 1
            }
        })
    }

    handleWrongAnswer = (numberInArray) => () => {
        this.setState(prevState => {
            let newState = prevState.AnswersWeight.slice()
            newState[numberInArray] = 0
            return {
                AnswersWeight: newState,
                currentNumberOfTab: prevState.currentNumberOfTab + 1
            }
        })
    }

    handleTestSubmit = () => {
        this.setState({
            displayChart: true
        });

        setTimeout(() => { this.setState({ collapse: false }) }, 1000)
    }
    handleChartClose = () => {
        this.setState({
            displayChart: false
        })
    }
    componentWillMount() {
        this.props.getQuestions(this.props.topicId)
    }
    getAnswersWeight = () => {
        return this.state.AnswersWeight.reduce((accumulator, value) => { return accumulator + value }, 0)
    }
    render() {

        let weight = 0;
        let questionsRes = this.props.questions.map((value, index) => {
            weight += value.weight
            return <TabContainer key={index + 1} tabId={index + 1}>
                <Question onWrongAnswer={this.handleWrongAnswer(index)} onRightAnswer={this.handleRightAnswer(index)} question={value} />
            </TabContainer>
        })
        questionsRes.push(<TabContainer><Button color="primary" className="float-right" onClick={this.handleTestSubmit}>Завершить</Button></TabContainer>)
        let navs = this.props.questions.map((value, index) => {
            return <Tab key={index + 1} label={index + 1} />
        })
        navs.push(<Tab key={navs.length + 1} label='Завершить тест' icon={<DoneAllIcon />} />)

        return <div>
            <Button onClick={this.toggle} variant="outlined" color="primary" style={{ marginTop: '20px' }}>{this.state.collapse ? "Закрыть тест" : 'Открыть тест'}</Button>
            <Collapse in={this.state.collapse}>
                <div style={{ marginTop: '20px' }}>
                    <AppBar position="static" >
                        <Tabs scrollable scrollButtons="on" indicatorColor="secondary" value={this.state.currentNumberOfTab} onChange={this.handleChange}>
                            {navs}
                        </Tabs>
                        {questionsRes[this.state.currentNumberOfTab]}
                    </AppBar>
                    {this.state.displayChart && <div style={{ color: 'white', position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', top: '0', right: '0', bottom: '0', left: '0', zIndex: '2' }}>
                        <Button onClick={this.handleChartClose} style={{ position: 'absolute', top: '50px', right: '50px', backgroundColor: '#3f51b5', boxShadow: 'none' }} variant="fab">
                            <CloseIcon style={{ color: 'white' }} />
                        </Button>
                        <Chart weights={[this.getAnswersWeight(), weight - this.getAnswersWeight()]} />
                    </div>
                    }
                </div>
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
    let res = [];
    for (let key in state.questions) {
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
