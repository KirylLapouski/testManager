import React from 'react'
import UserInfoContainer from "./UserInfoContainer";
import PropTypes from "prop-types";
class UserList extends React.Component {
    render() {
        var { users, toggleShowChartClick } = this.props
        return <div style={{ display: 'flex', position: 'relative', marginTop: '20px', justifyContent: 'space-between', flexWrap: 'wrap', width: '1200px', marginLeft: '30px' }}>
            {users.map((value) => <UserInfoContainer extended={true} user={value} userId={value.id} toggleShowChartClick={toggleShowChartClick} />)}
        </div>
    }
}

UserList.propTypes = {
    users: PropTypes.arrayOf({
        id: PropTypes.number
    }),
    toggleShowChartClick: PropTypes.func
}

export default UserList
