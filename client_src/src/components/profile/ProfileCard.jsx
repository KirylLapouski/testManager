import React from 'react'
import PropTypes from 'prop-types'
class ProfileCard extends React.Component {
    render() {
        let { email, username, imageUrl, firstName, secondName } = this.props

        return <div className="col-4">
            <div className="card card-cascade">
                <div className="view overlay">
                    <img src={imageUrl ? imageUrl : 'https://mdbootstrap.com/img/Photos/Others/men.jpg'} style={{ width: '100%', height: '100%' }} className="img-fluid" alt="" />
                    <a>
                        <div className="mask rgba-white-slight"></div>
                    </a>
                </div>
                <div className="card-body text-center">
                    <h4 className="card-title"><strong>{username}</strong></h4>
                    <p>
                        {firstName ? firstName : ''} {secondName ? secondName : ''}{firstName || secondName ? <br /> : null}
                    </p>
                    <p>
                        {email ? 'Email: ' + email : ''} {email ? <br /> : null}
                    </p>
                </div>
            </div>
        </div>
    }
}

ProfileCard.propTypes = {
    //redux
    email: PropTypes.string,
    username: PropTypes.string,
    imageUrl: PropTypes.string,
    firstName: PropTypes.string,
    secondName: PropTypes.string
}

export default ProfileCard

