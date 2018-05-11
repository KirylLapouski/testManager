import React from 'react'
import ReactPlayer  from 'react-player'
import PropTypes from 'prop-types'

class Media extends React.Component{
    render(){
        return <ReactPlayer style={{margin:'0 auto'}} width="1000px" height="565px" url={this.props.src}/>
    }
}

Media.propTypes = {
    src: PropTypes.string
}
export default Media

