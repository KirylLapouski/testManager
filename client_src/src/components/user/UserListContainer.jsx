import React from 'react'
import UserList from './UserList'
import { connect } from "react-redux";
import { getUsersInDiscipline } from '../../redux/AC/users'
import { addDisciplineUserMapping } from "../../redux/AC/mapping";
import PropTypes from "prop-types";

class UserListContainer extends React.Component {
    componentDidMount() {
        var { getUsers } = this.props
        getUsers()
    }
    render() {
        var { users, toggleShowChartClick } = this.props

        return <UserList users={users} toggleShowChartClick={toggleShowChartClick} />
    }
}

const mapStateToProps = (state, ownProps) => {
    var userDiscipline = []
    for (var key in state.mapping.userDiscipline) {
        userDiscipline.push(state.mapping.userDiscipline[key])
    }
    var currentDisciplineUsersId = userDiscipline.filter(value => value.disciplineId === ownProps.courseId).map(value => value.participantId)

    var users = currentDisciplineUsersId.map(value => {
        return state.users[value]
    })
    return {
        users
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
export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer)
