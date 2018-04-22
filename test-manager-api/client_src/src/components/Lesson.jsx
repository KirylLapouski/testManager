import React from 'react';
import UserInfo from './UserInfo';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
class Lesson extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        id: PropTypes.number.isRequired
    }
    render() {
        return(
        <article className="z-depth-1" style={{marginTop:"20px",backgroundColor: "blue", backgroundImage:'url("https://lh4.googleusercontent.com/-64uhpsHBEZw/VMqrG_6wowI/AAAAAAAAAIE/_Pw_QoP0opU/w1005-h214-no/123_rainbowtriangle_teal.jpg")'}}>
            <header style={{overflow:"hidden"}}>
                <UserInfo disabled={true} style={{float:"left"}}/>
                <Link to={"/lesson/"+this.props.id+"/topics"}>{this.props.title}</Link>                
            </header>
            <section>
            </section>
        </article>)
    }
}

export default Lesson