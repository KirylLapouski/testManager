import React from 'react';
import UserInfo from './UserInfo';
import PropTypes from 'prop-types';
class Lesson extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        desc: PropTypes.string
    }
    render() {
        return(
        <article>
            <header>
                <UserInfo />
            </header>
            <section>
                <h2>{this.props.title}</h2>
                <p>{this.props.desc}</p>
            </section>
        </article>)
    }
}

export default Lesson