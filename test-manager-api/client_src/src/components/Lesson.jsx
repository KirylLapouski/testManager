import React from 'react';
import UserInfo from './UserInfo';
import PropTypes from 'prop-types';
class Lesson extends React.Component {

    static propTypes = {
        title: PropTypes.string,
    }
    render() {
        return(
        <article className="z-depth-1">
            <header style={{overflow:"hidden",background:"rgb(117, 122, 264)"}}>
                <UserInfo style={{float:"left"}}/>
                <h2>{this.props.title}</h2>                
            </header>
            <section>
            </section>
        </article>)
    }
}

export default Lesson