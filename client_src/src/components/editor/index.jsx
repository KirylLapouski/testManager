import React, { Component } from 'react';
// import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateTopic } from '../../redux/AC/topic'
import axios from "axios";
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import toastr from 'toastr'
//TODO: maybe use props instead of state? Fetch data from db. Init complexities
//TODO: parse youtube watch video to embed
//TODO: soundcloud doesnot work
class MyEditor extends Component {
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
                    init={{
                        selector: "textarea",
                        height: 700,
                        resize: false,
                        autosave_ask_before_unload: false,
                        codesample_dialog_width: 600,
                        codesample_dialog_height: 425,
                        template_popup_width: 600,
                        template_popup_height: 450,
                        powerpaste_allow_local_images: true,
                        images_upload_handler: function (blobInfo, success, failure) {
                            var formData = new FormData();
                            formData.append('file', blobInfo.blob());

                            axios.post('http://localhost:3000/save-file/undefined/saveFileLocal', formData)
                                .then((fileInfo) => {
                                    success(fileInfo.data)
                                }, (err) => {
                                    failure(`HTTP error: ${err.message}`)
                                })
                        },
                        plugins: [
                            "a11ychecker advcode advlist anchor autolink codesample colorpicker contextmenu fullscreen help image imagetools",
                            " lists link linkchecker media mediaembed noneditable powerpaste preview",
                            " searchreplace table template textcolor tinymcespellchecker visualblocks wordcount"
                        ], //removed:  charmap insertdatetime print
                        external_plugins: {
                            mentions: "//www.tinymce.com/pro-demo/mentions/plugin.min.js",
                            moxiemanager: "//www.tinymce.com/pro-demo/moxiemanager/plugin.min.js"
                        },
                        templates: [
                            {
                                title: "Non-editable Example",
                                description: "Non-editable example.",
                            },
                            {
                                title: "Simple Table Example",
                                description: "Simple Table example.",
                            }
                        ],
                        toolbar:
                            "insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image",
                        content_css: [
                            "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
                            "//www.tiny.cloud/css/content-standard.min.css"
                        ]
                    }}
                    onEditorChange={this.handleEditorChange}
                    plugins='media'

                />

            </div>
        )
    }
}

MyEditor.propTypes = {
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
export default connect(null, mapDispatchToProps)(MyEditor)
