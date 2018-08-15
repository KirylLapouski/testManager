import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
class DraggableItemTest extends React.Component {
    render() {
        const { item, itemSelected, dragHandle } = this.props
        const scale = itemSelected * 0.05 + 1
        const shadow = itemSelected * 15 + 1
        const dragged = itemSelected !== 0

        return (
            <div
                className={cx('item', { dragged })}
                style={{
                    transform: `scale(${scale})`,
                    boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 *
                        shadow}px 0px`,
                    position: 'relative'
                }}
            >
                {dragHandle(<div className="dragHandle" />)}
                <h2>{item.name}</h2>

            </div>
        )
    }

}

DraggableItemTest.propTypes = {
    commonProps: PropTypes.object
}
export default DraggableItemTest
