import React from 'react'
import UserList from './UserList'
import { connect } from 'react-redux'
import { getUsersInDiscipline } from '../../../redux/AC/users'
import { addDisciplineUserMapping } from '../../../redux/AC/mapping'
import PropTypes from 'prop-types'
import { uniqueArrayOfObjectById } from '../../../utils'
class UserListContainer extends React.Component {
    componentDidMount() {
        let { getUsers } = this.props
        getUsers()
    }
    render() {
        let { users, toggleShowChartClick } = this.props

        return (
            <UserList
                users={users}
                toggleShowChartClick={toggleShowChartClick}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let userDiscipline = []
    for (let key in state.mapping.userDiscipline) {
        userDiscipline.push(state.mapping.userDiscipline[key])
    }
    let currentDisciplineUsersId = userDiscipline
        .filter(value => value.disciplineId === ownProps.courseId)
        .map(value => value.participantId)

    let users = currentDisciplineUsersId.map(value => {
        return state.users[value]
    }).filter(user => !!user)

    return {
        users: uniqueArrayOfObjectById(users)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUsers() {
            dispatch(getUsersInDiscipline(ownProps.courseId))
            dispatch(addDisciplineUserMapping(ownProps.courseId))
        }
    }
}

UserListContainer.propTypes = {
    courseId: PropTypes.number.isRequired,
    toggleShowChartClick: PropTypes.func,
    //redux
    getUsers: PropTypes.func,
    users: PropTypes.array
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserListContainer)
