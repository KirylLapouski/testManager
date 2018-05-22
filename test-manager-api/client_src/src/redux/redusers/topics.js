import constants from '../constants'

const topics = (state = {}, action) => {

    switch (action.type) {
    case constants.topics.CREATE_TOPIC:
        return {
            ...state,
            [action.payload.id]: {
                title: action.payload.title,
                path: action.payload.path,                
                id: action.payload.id,
                lessonId: action.payload.lessonId
            }
        }
    case constants.topics.LOAD_TOPICS_FOR_LESSON:
        var topics = action.payload.reduce((result, topic) => {
            result[topic.id] = topic
            return result
        }, {})
        return {
            ...state,
            ...topics
        }
    case constants.topics.LOAD_TOPIC_QUESTIONS:
        var questionsId = action.payload.questions.map(question => {
            return question.id
        })
        var res = {...state}
        res[action.payload.topicId].questions = questionsId
        return {
            ...res
        }
    default:
        return state
    }

}
export default topics
