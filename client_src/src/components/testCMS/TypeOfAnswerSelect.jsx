import React from 'react';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import RadioIcon from '@material-ui/icons/RadioButtonChecked';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import List from '@material-ui/icons/List';
import { MenuItem } from 'material-ui/Menu';

class TypeOfAnswerSelect extends React.Component {
    render() {
        return (
            <Select
                value={this.props.selectedType}
                onChange={this.props.onChange}
                style={{ ...this.props.style }}
            >
                <MenuItem value="radio">
                    <RadioIcon style={{ marginRight: '5px' }} />
                    Один из списка
                </MenuItem>
                <MenuItem value="checkbox">
                    <CheckBoxIcon style={{ marginRight: '5px' }} />
                    Несколько из списка
                </MenuItem>
                <MenuItem value="draggableList">
                    <List style={{ marginRight: '5px' }} />
                    Список{' '}
                </MenuItem>
            </Select>
        )
    }
}

TypeOfAnswerSelect.propTypes = {
    style: PropTypes.object,
    selectedType: PropTypes.string,
    onChange: PropTypes.func
}

export default TypeOfAnswerSelect
