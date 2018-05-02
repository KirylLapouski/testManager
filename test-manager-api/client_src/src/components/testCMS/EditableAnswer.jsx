import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class EditableAnswer extends React.Component{
    render(){
        var {answerType,text} = this.props;
        
        return  <div style={{display:"flex",alignItems:"center"}}><Checkbox style={{width:"5%"}} /><TextField  hintText={text} style={{width:"90%"}}/><CloseIcon/></div>
    }
}

EditableAnswer.protoTypes = {
    answerType: PropTypes.string,
    text: PropTypes.string
}

EditableAnswer.defaultProps ={
    answerType:'checkbox',
    text:'answer'
}

export default EditableAnswer;