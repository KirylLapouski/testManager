import React from 'react'
import UserInfoContainer from '../user-info/UserInfoContainer'
import PropTypes from 'prop-types'
class UserList extends React.Component {
    render() {
        let { users, toggleShowChartClick } = this.props
        return (
            <div
                style={{
                    display: 'flex',
                    position: 'relative',
                    marginTop: '20px',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    width: '800px',
                    marginLeft: '30px'
                }}
            >
                {users.map(value => {
                    return (
                        <UserInfoContainer
                            key={value && value.id}
                            extended={true}
                            user={value}
                            userId={value && value.id}
                            toggleShowChartClick={toggleShowChartClick}
                        />
                    )
                })}
            </div>
        )
    }
}

UserList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number
        })
    ),
    toggleShowChartClick: PropTypes.func
}

export default UserList
