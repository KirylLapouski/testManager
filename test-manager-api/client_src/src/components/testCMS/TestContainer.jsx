import React from 'react'
import PropTypes from 'prop-types'
import EditableTest from './EditableTest'
import Accordion from '../decorators/Accordion'

class TestContainer extends React.Component {
    render() {
        var arr = [1,2,3,4]
        return <div  className="z-depth-1 container" style={{ padding: '0px' }}>
            {arr.map((item,i)=>{
                return  <EditableTest key={i+1} id={i+1} testType="checkbox" editing={this.props.openedItem === i+1? true:false} {...this.props} />
            })}
        </div>
    }
}

this.propTypes = {
    question: PropTypes.string,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string
        })
    ),
    //accordion
    toggleOpenItem: PropTypes.func,
}
export default Accordion(TestContainer)