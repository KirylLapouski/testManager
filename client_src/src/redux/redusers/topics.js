import constants from '../constants'

const topics = (state = {}, action) => {

    switch (action.type) {
        case constants.topics.ADD_TOPIC:
            return {
                ...state,
                [action.payload.id]: {
                    title: action.payload.title,
                    path: action.payload.path,
                    id: action.payload.id,
                    lessonId: action.payload.lessonId
                }
            }
        case constants.topics.ADD_TOPICS:
            let topics = action.payload.reduce((result, topic) => {
                result[topic.id] = {...state[topic.id],...topic}
                return result
            }, {})
            return {
                ...state,
                ...topics
            }
        case constants.topics.ADD_TOPIC_QUESTIONS:
            let questionsId = action.payload.questions.map(question => {
                return question.id
            })
            //TODO: is it ok?
            let res = JSON.parse(JSON.stringify(state))
            res[action.payload.topicId].questions = questionsId
            return {
                ...res
            }
        case constants.topics.UPDATE_TOPIC: {
            let result = { ...state }
            result[action.payload.id] = action.payload
            return {
                ...result
            }
        }
        case constants.topics.DELETE_TOPIC: {
            let result = { ...state }
            delete result[action.payload.id]
            return {
                ...result
            }
        }
        default:
            return state
    }

}
export default topics
