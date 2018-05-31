import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
class ProfileCard extends React.Component {
    render() {
        var { email, userName, imageSrc } = this.props

        return <div className="col-4">
            <div className="card card-cascade">
                <div className="view overlay">
                    {/*TODO: КОСТЫЛЬ ЗДЕСЬ */}
                    <img src={imageSrc ? imageSrc : 'https://mdbootstrap.com/img/Photos/Others/men.jpg'} className="img-fluid" alt="" />
                    <a>
                        <div className="mask rgba-white-slight"></div>
                    </a>
                </div>
                <div className="card-body text-center">
                    <h4 className="card-title"><strong>{userName}</strong></h4>
                    <p>
                        {email ? 'Email: ' + email : ''} {email ? <br /> : null}
                    </p>
                </div>
            </div>
        </div>
    }
}

ProfileCard.propTypes = {
    //reduxs
    email: PropTypes.string,
    userName: PropTypes.string,
    imageSrc: PropTypes.string
}

const mapStateToProps = state => {

    return {
        email: state.users.loggedIn && state.users.loggedIn.email,
        userName:state.users.loggedIn && state.users.loggedIn.username,
        imageSrc: state.users.loggedIn && state.users.loggedIn.imageUrl
    }
}
export default connect(mapStateToProps)(ProfileCard)

