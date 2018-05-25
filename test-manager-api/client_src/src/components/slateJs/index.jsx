import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateTopic } from '../../redux/AC/topic'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TextField from '@material-ui/core/TextField';
//TODO: maybe use props instead of state? Fetch data from db. Init complexities
//TODO: parse youtube watch video to embed
class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props)
    const contentBlock = htmlToDraft(props.currentData)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  onEditorStateChange = (editorState) => {
    if (this.state.editorState !== editorState)
      this.props.saveEditorState(draftToHtml(convertToRaw(editorState.getCurrentContent())))

    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div style={{ boxShadow: ' 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)' }}>
        <Editor
          toolbarHidden={this.props.readOnly}
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          readOnly={this.props.readOnly}
          editorStyle={{ padding: '30px' }}
        />
      </div>
    )
  }
}

EditorConvertToHTML.propTypes = {
  topicId: PropTypes.number,
  readonly: PropTypes.bool,
  currentData: PropTypes.string,
  //redux
  saveEditorState: PropTypes.func
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveEditorState: editorState => {
      dispatch(updateTopic(ownProps.topicId, editorState))
    }
  }
}
export default connect(null, mapDispatchToProps)(EditorConvertToHTML)