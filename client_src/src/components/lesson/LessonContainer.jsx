import React from 'react'
import toastr from 'toastr'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { loadTopics } from '../../redux/AC/topic'
import Lesson from './Lesson'
import { deleteLesson, editLesson } from '../../redux/AC/lessons'

class LessonContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            topicsOpened: false,
            modalOpened: false,
            edditing: false,
            title: props.title,
            description: props.description
        }
    }

    componentWillMount() {
        this.props.getTopics(this.props.id)
    }

    handleOpen = (name) => (value) => () => {
        this.setState({
            [name]: value
        })
    }


    handleDeleteClick = () => {
        this.props.deleteLesson(this.props.id)
        toastr.success('Урок успешно удалён')
    }

    toggleState = (name) => () => {
        this.setState(prevState => {
            return {
                [name]: !prevState[name]
            }
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmitEditLesson = () => {
        this.props.editLesson(this.props.id, this.state.title, this.state.description)
        //TODO:: rewrite on refs
        //TODO: need new reducer that check that change
        toastr.success('Урок изменён')
        this.toggleState('edditing')()
    }

    handleCancelEdditingClick = () => {
        this.setState({
            title: this.props.title,
            description: this.props.description
        })
        this.toggleState('edditing')()
    }
    render() {
        return <Lesson
            handleSubmitEditLesson={this.handleSubmitEditLesson}
            handleInputChange={this.handleInputChange}
            toggleEdditing={this.toggleState('edditing')}
            handleDeleteClick={this.handleDeleteClick}
            handleTopicsClick={this.toggleState('topicsOpened')}
            handleModalOpen={this.handleOpen('modalOpened')(true)}
            handleModalClose={this.handleOpen('modalOpened')(false)}
            handleCancelEdditingClick={this.handleCancelEdditingClick}
            {...this.props} {...this.state} />
    }
}

const mapStateToProps = (state, ownProps) => {
    var res = []
    for (var key in state.topics) {
        if (Number(ownProps.id) === state.topics[key].lessonId) {
            res.push(state.topics[key])
        }
    }
    return {
        topics: res
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTopics(lessonID) {
            dispatch(loadTopics(lessonID))
        },
        deleteLesson(lessonId) {
            dispatch(deleteLesson(lessonId))
        },
        editLesson(lessonId, title, desctiption) {
            dispatch(editLesson(lessonId, title, desctiption))
        }
    }
}

LessonContainer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    lessonOwner: PropTypes.shape({
        id: PropTypes.number
    }),
    loggedUserId: PropTypes.number,
    //redux
    topics: PropTypes.arrayOf(PropTypes.object),
    getTopics: PropTypes.func,
    deleteLesson: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonContainer)