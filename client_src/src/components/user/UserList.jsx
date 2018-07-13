import React from 'react'
import UserInfo from "./UserInfo";
import PropTypes from "prop-types";
class UserList extends React.Component {
    render() {
        var { users } = this.props
        return <React.Fragment>
            {users.map(() => <UserInfo />)}
        </React.Fragment>
    }
}

UserList.propTypes = {
    users: PropTypes.array
}

export default UserList
