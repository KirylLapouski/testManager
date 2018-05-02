import React from 'react';
import PropTypes from 'prop-types';
import EditableTest from './EditableTest';
import Accordion from '../decorators/Accordion';

class TestContainer extends React.Component {
    render() {
        return <div key={this.props.openitemId} className="z-depth-1 container" style={{ padding: "0px" }}>
            <EditableTest  id={1} {...this.props} />
            <EditableTest  id={2} {...this.props} />
        </div>
    }
}

this.propTypes = {
    //accordion
    toggleOpenItem: PropTypes.func,
    openitemId: PropTypes.number
}
export default Accordion(TestContainer);