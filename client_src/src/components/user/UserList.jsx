import React from 'react'
import UserInfoContainer from "./UserInfoContainer";
import PropTypes from "prop-types";
class UserList extends React.Component {
    render() {
        var { users } = this.props
        return <div className="container" style={{ display: 'flex', position: 'relative', marginTop: '20px', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '800px' }}>
            {users.map((value) => <UserInfoContainer extended={true} user={value} userId={value.id} />)}
        </div>
    }
}

UserList.propTypes = {
    users: PropTypes.arrayOf({
        id: PropTypes.number
    })
}

export default UserList
