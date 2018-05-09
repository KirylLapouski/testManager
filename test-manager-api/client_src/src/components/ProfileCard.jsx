import React from 'react';
import PropTypes from 'prop-types';

class ProfileCard extends React.Component {
    render() {
        var { email, firstName, lastName, imageSrc } = this.props;

        return <div className="col-4">
            <div className="card card-cascade">
                <div className="view overlay">
                    {/* КОСТЫЛЬ ЗДЕСЬ */}
                    <img src={imageSrc?imageSrc:'https://mdbootstrap.com/img/Photos/Others/men.jpg'} className="img-fluid" alt="" />
                    <a>
                        <div className="mask rgba-white-slight"></div>
                    </a>
                </div>
                <div className="card-body text-center">
                    <h4 className="card-title"><strong>{firstName + " " + lastName}</strong></h4>
                    <p>
                        {email ? "Email: " + email : ""} {email ? <br /> : null}
                    </p>
                </div>
            </div>
        </div>
    }
}

ProfileCard.propTypes = {
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    imageSrc: PropTypes.string
}
ProfileCard.defaultProps = {
    imageSrc: 'https://mdbootstrap.com/img/Photos/Others/men.jpg',
    firstName: 'User'
}

export default ProfileCard;

