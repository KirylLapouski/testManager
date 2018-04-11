import React from 'react';
import UserInfo from './UserInfo';
import PropTypes from 'prop-types'
class Course extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired
    }
    render() {
        return (
            <div className="z-depth-2" style={{ height: '400px',width:'270px',color:"white", backgroundImage: 'url("https://lh4.googleusercontent.com/-64uhpsHBEZw/VMqrG_6wowI/AAAAAAAAAIE/_Pw_QoP0opU/w1005-h214-no/123_rainbowtriangle_teal.jpg")' }}>
                <div style={{background: "rgba(0,0,0,0.1)",overflow:"hidden"}}>
                    <UserInfo style={{float:"right"}}/>
                    {this.props.title}
                </div>
                {this.props.desc}                
            </div>
        )
    }
}

export default Course;