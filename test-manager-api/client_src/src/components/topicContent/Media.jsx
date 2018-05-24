import React from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import url from 'url'
/**
 * An video embed component.
 *
 * @type {Component}
 */

class Media extends React.Component {
  /**
   * When the input text changes, update the `video` data on the node.
   *
   * @param {Event} e
   */

  onChange = e => {
    const video = e.target.value
    const { node, editor } = this.props
    editor.change(c => c.setNodeByKey(node.key, { data: { video } }))
  }

  /**
   * When clicks happen in the input, stop propagation so that the void node
   * itself isn't focused, since that would unfocus the input.
   *
   * @type {Event} e
   */

  onClick = e => {
    e.stopPropagation()
  }

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    return (
      <div {...this.props.attributes}>
        {this.renderVideo()}
        {this.renderInput()}
      </div>
    )
  }

  /**
   * Render the Youtube iframe, responsively.
   *
   * @return {Element}
   */

  parseVideoForYouTube(url) {
    const youtube = 'https://www.youtube.com/embed/'
    var videoId = url.split("=")
    var result = youtube.concat(videoId[1])
    return result
  }

  checkIsYouTubeUrl(urlAdress) {
    if(!urlAdress) return false
    var parsedUrl = url.parse(urlAdress)
    if (parsedUrl.host == 'www.youtube.com')
      return true
    return false
  }
  renderVideo = () => {
    const { node, isSelected } = this.props
    var video = node.data.get('video')

    // const wrapperStyle = {
    //   position: 'relative',
    //   outline: isSelected ? '2px solid blue' : 'none',
    // }
    if( this.checkIsYouTubeUrl(video)){
      video = this.parseVideoForYouTube(video)
      console.log(video)
    }
    // const maskStyle = {
    //   display: isSelected ? 'none' : 'block',
    //   position: 'absolute',
    //   top: '0',
    //   left: '0',
    //   height: '100%',
    //   width: '100%',
    //   cursor: 'cell',
    //   zIndex: 1,
    // }

    // const iframeStyle = {
    //   display: 'block',
    //   margin: '0 auto',
    //   width: '60%'
    // }

    return (
      // <div style={wrapperStyle}>
      //   <div style={maskStyle} />
      <ReactPlayer style={{ margin: '0 auto' }} width="1000px" height="565px" controls={true} url={video} />
      // <iframe
      //   id="ytplayer"
      //   type="text/html"
      //   width="640"
      //   height="476"
      //   src={"https://www.youtube.com/embed/g_YpoxLeecs"}
      //   frameBorder="0"
      //   style={iframeStyle}
      //   allowfullscreen
      // />
      // </div>
    )
  }

  /**
   * Render the video URL input.
   *
   * @return {Element}
   */

  renderInput = () => {
    const { node } = this.props
    const video = node.data.get('video')
    const style = {
      marginTop: '5px',
      boxSizing: 'border-box',
    }

    return (
      <input
        value={video || this.props.src}
        onChange={this.onChange}
        onClick={this.onClick}
        style={style}
      />
    )
  }
}

Media.propTypes = {
  src: PropTypes.string
}
export default Media