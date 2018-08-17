import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import ChangeBackgroundModal from '../../modal/modal-total/ChangeBackgroundModal'

class CourseHeader extends React.Component {

    render() {
        let { backgroundSrc, name, teacherName, teacherLastName, children, secretWord, backgroundModalOpened, handleBackgroundModalClose, handleSubmitNewBackground, handleChange } = this.props
        return <div style={{ height: '300px', position: 'relative', backgroundImage: `url('${backgroundSrc}')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left top', backgroundSize: 'cover' }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', backgroundSize: '100%', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h1>{name}</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>{children}{`${teacherName || ' '} ${teacherLastName || ' '}`}</div>
                {secretWord && <p style={{ marginTop: '20px' }}>Код курса: {secretWord}<Button style={{ position: 'absolute', right: '0px', bottom: '0px', color: 'white', fontSize: '12px' }} onClick={this.props.handleBackgroundModalOpen}>Изменить фон курса</Button></p>}
            </div>
            <ChangeBackgroundModal
                open={backgroundModalOpened}
                handleClose={handleBackgroundModalClose}
                onChange={handleChange}
                handleSubmit={handleSubmitNewBackground}
            />
        </div>
    }
}

CourseHeader.propTypes = {
    name: PropTypes.string,
    backgroundSrc: PropTypes.string,
    teacherName: PropTypes.string,
    teacherLastName: PropTypes.string,
    secretWord: PropTypes.string,
    backgroundModalOpened: PropTypes.bool,
    handleBackgroundModalClose: PropTypes.func,
    handleBackgroundModalOpen: PropTypes.func,
    handleSubmitNewBackground: PropTypes.func,
    handleChange: PropTypes.func
}

export default CourseHeader
