import React from 'react'
import DraggableList from 'react-draggable-list'
import PropTypes from 'prop-types'
import './draggable-list.css'

class DraggableListQuestion extends React.Component {
    render() {
        if (!this.props.answers) {
            return <div> </div>
        } else {
            return (
                <div className="main">
                    <div className="list">
                        <DraggableList
                            itemKey="name"
                            template={this.props.item}
                            commonProps={{
                                deleteItem: this.props.deleteListItem,
                                onChange: this.props.onChange,
                                answers: this.props.answers
                            }}
                            list={this.props.answers}
                            onMoveEnd={this.props.onChange}
                        />
                    </div>
                </div>
            )
        }
    }
}

DraggableListQuestion.propTypes = {
    answers: PropTypes.array,
    onChange: PropTypes.func,
    deleteListItem: PropTypes.func,
    item: PropTypes.node
}
export default DraggableListQuestion
