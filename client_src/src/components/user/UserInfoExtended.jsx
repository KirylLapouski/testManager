import React from 'react'
import UserInfo from "./UserInfo";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
class UserInfoExtended extends React.Component {
    render() {
        var { firstName, secondName, username, email } = this.props.user
        return <Card style={{ background: 'url("https://lh4.googleusercontent.com/-64uhpsHBEZw/VMqrG_6wowI/AAAAAAAAAIE/_Pw_QoP0opU/w1005-h214-no/123_rainbowtriangle_teal.jpg")', width: '300px', height: '200px', position: 'relative' }}>
            <UserInfo disabled={true} {...this.props} style={{ float: 'left', marginTop: '10px', matginLeft: '10px' }} />
            <CardContent style={{ marginLeft: '70px', textAlign: 'left' }}>
                <p>{firstName} {secondName}</p>
                <p>{username}</p>
                <p>{email}</p>
            </CardContent>
            <CardActions>
                <Button size="small" style={{ color: 'white', float: 'right' }}>
                    Прогресс курса
                </Button>
            </CardActions>
        </Card>
    }
}

export default UserInfoExtended
