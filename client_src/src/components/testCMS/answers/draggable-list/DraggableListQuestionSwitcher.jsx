import React from 'react'
import DraggableListEditable from './DraggableListQuestion'
import PropTypes from 'prop-types'
import DraggableListNotEditable from './DraggableListQuestionNOTEditable'
import DraggableEditableItem from './draggable-items/DraggableItem'
import DraggableItemTest from './draggable-items/DraggableItemTest'

class DraggableListQuestionSwitcher extends React.Component {
    render() {
        switch (this.props.displayMode) {
        case 'editing':
            return <DraggableListEditable {...this.props} item={DraggableEditableItem} />
        case 'readOnly':
            return <DraggableListNotEditable {...this.props} />
        case 'testing':
            return <DraggableListEditable {...this.props} item={DraggableItemTest} />
        }
    }
}

DraggableListQuestionSwitcher.propTypes = {
    displayMode: PropTypes.oneOf(['editing', 'readOnly', 'testing']),
}
export default DraggableListQuestionSwitcher
