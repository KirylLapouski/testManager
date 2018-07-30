import React, { Component } from 'react';
// import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateTopic } from '../../redux/AC/topic'
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import toastr from 'toastr'
//TODO: maybe use props instead of state? Fetch data from db. Init complexities
//TODO: parse youtube watch video to embed
//TODO: soundcloud doesnot work
class EditorConvertToHTML extends Component {
    constructor(props) {
        super(props);

        this.state = { content: props.currentData };
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    handleEditorChange(content) {
        if (this.state.content !== content)
            this.props.saveEditorState(content)
        this.setState({ content });

    }

    render() {
        return (
            <div style={{ boxShadow: ' 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)' }}>
                <Editor
                    apiKey="awz2mcrcs6wtqo0a2zg6s2jmxg1s322zk417tk3zmddsxpbk"
                    value={this.state.content}
                    init={{ height: '700px' }}
                    onEditorChange={this.handleEditorChange}
                    plugins='image table media'
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
