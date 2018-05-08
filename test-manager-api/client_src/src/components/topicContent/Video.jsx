import React from 'react';
import VideoPlayer from 'react-videoplayer';
import 'react-videoplayer/lib/index.css';
import PropTypes from 'prop-types';

class Video extends React.Component{
    render(){
        return  <div><VideoPlayer videoSrc={this.props.videoSrc}/></div>
    }
}

Video.propTypes = {
    videoSrc: PropTypes.string
}
export default Video;
