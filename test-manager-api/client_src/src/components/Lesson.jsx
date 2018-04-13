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
        <article className="z-depth-1">
            <header style={{overflow:"hidden",background:"rgb(117, 122, 264)"}}>
                <UserInfo disabled={true} style={{float:"left"}}/>
                <Link to={"/lesson/"+this.props.id+"/topics"}>{this.props.title}</Link>                
            </header>
            <section>
            </section>
        </article>)
    }
}

export default Lesson