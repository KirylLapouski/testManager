import React from 'react';
import PropTypes from 'prop-types';
import EditableTest from './EditableTest';
import Accordion from '../decorators/Accordion';

class TestContainer extends React.Component {
    render() {
        var arr = [1,2,3,4];
        return <div  className="z-depth-1 container" style={{ padding: "0px" }}>
            {arr.map((item,i)=>{
                return  <EditableTest  id={i+1} editing={this.props.openedItem === i+1? true:false} {...this.props} />
            })}
        </div>
    }
}

this.propTypes = {
    //accordion
    toggleOpenItem: PropTypes.func,
    openedItem: PropTypes.number
}
export default Accordion(TestContainer);