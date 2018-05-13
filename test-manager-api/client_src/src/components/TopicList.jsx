import React from 'react'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadTopics } from '../redux/AC/topic'
import { Link  } from 'react-router-dom'
class TopicList extends React.Component {
    componentWillMount() {
        this.props.getTopics(this.props.lessonId)
    }
    render() {
        var topics = this.props.topics.map(value => {
            return <Link to={`/lesson/${this.props.lessonId}/topic/${value.id}`}>
                <ListItem button style={{ borderLeft: 'coral solid 2px' }}>
                    <ListItemText inset primary={value.title} />
                </ListItem>
            </Link>

        })
        return <List style={{ marginTop: '-6px', backgroundColor: '#ECEFF1', paddingTop: '0px', paddingBottom: '0px' }}>
            <ListItem button onClick={this.props.handleTopicsClick} style={{ paddingTop: '0px', paddingBottom: '0px', height: '30px' }}>
                <ListItemText inset primary="Topics" />
            </ListItem>
            <Collapse in={this.props.topicsOpened} >
                {/* <List component="div" disablePadding> */}
                {topics}
                {/* </List> */}
            </Collapse>
        </List>
    }
}

TopicList.propTypes = {
    lessonId: PropTypes.lessonId,
    topicsOpened: PropTypes.bool,
    //redux
    topics: PropTypes.arrayOf(PropTypes.object),
    getTopics: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var res = []
    for (var key in state.topics) {
        if (Number(ownProps.lessonId) === state.topics[key].lessonId) {
            res.push(state.topics[key])
        }
    }
    return { topics: res }
}

const mapDispatchToProps = dispatch => {
    return {
        getTopics(lessonID) {
            dispatch(loadTopics(lessonID))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopicList)