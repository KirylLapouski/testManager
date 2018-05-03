import React from 'react';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import RadioIcon from '@material-ui/icons/RadioButtonChecked';
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { MenuItem } from 'material-ui/Menu';

class TypeOfAnswerSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: 'radio',
    };
  
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ selectedType: event.target.value });
  }
  render() {
    return <Select value={this.state.selectedType} onChange={this.handleChange} style={{...this.props.style}}>
      <MenuItem value='radio' ><RadioIcon style={{ marginRight: "5px" }} />Один из списка</MenuItem>
      <MenuItem value='checkbox'><CheckBoxIcon style={{ marginRight: "5px" }} />Несколько из списка</MenuItem>
    </Select>
  }
}

TypeOfAnswerSelect.propTypes = {
  style: PropTypes.object
}

export default TypeOfAnswerSelect;