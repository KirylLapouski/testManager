import React from 'react'
import PropTypes from 'prop-types'
import Accordion from '../../decorators/Accordion'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import Button from '@material-ui/core/Button'
import Tooltip from 'material-ui/Tooltip'
import TestFromFileModal from '../../modal/modal-total/TestFromFileModal'
import AddNewQuestionInTest from '../AddNewQuestionInTest'
import TestList from '../test-list/TestList'
//TODO: can rewrite on function
class TestPage extends React.Component {
    render() {
        var {
            handleChange,
            handleSubmitNewQuestionForm,
            title,
            weight,
            description,
            questions,
            openedItem,
            toggleOpenItem
        } = this.props
        return (
            <div>
                <TestList
                    questions={questions}
                    openedItem={openedItem}
                    toggleOpenItem={toggleOpenItem}
                />
                <AddNewQuestionInTest
                    handleChange={handleChange}
                    handleSubmitNewQuestionForm={handleSubmitNewQuestionForm}
                    name={title}
                    weight={weight}
                    description={description}
                />
                <Tooltip
                    id="tooltip-icon"
                    title="Загрузить тест из файла"
                    placement="left"
                >
                    <Button
                        variant="fab"
                        onClick={this.props.openModal}
                        color="primary"
                        aria-label="add"
                        style={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            zIndex: '2'
                        }}
                    >
                        <AttachFileIcon />
                    </Button>
                </Tooltip>
                <TestFromFileModal
                    topicId={this.props.match.params.topicId}
                    handleClose={this.props.closeModal}
                    open={this.props.modalOpened}
                />
            </div>
        )
    }
}

this.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    weight: PropTypes.number,
    modalOpened: PropTypes.bool,
    handleChange: PropTypes.func,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    handleSubmitNewQuestionForm: PropTypes.func,
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
            weight: PropTypes.number,
            topicId: PropTypes.number
        })
    ),
    //accordion
    toggleOpenItem: PropTypes.func,
    openedItem: PropTypes.number
}

export default Accordion(TestPage)
