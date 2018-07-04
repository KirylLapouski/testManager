import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Modal from '../../modal/ModalBase'
import TextField from 'material-ui/TextField'
class CourseHeader extends React.Component {

    render() {
        var { backgroundSrc, name, teacherName, teacherLastName, children, secretWord, backgroundModalOpened, handleBackgroundModalClose, handleSubmitNewBackground, handleChange } = this.props
        return <div style={{ height: '300px', position: 'relative', backgroundImage: `url('${backgroundSrc}')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left top', backgroundSize: 'cover' }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', backgroundSize: '100%', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h1>{name}</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>{children}{`${teacherName || ' '} ${teacherLastName || ' '}`}</div>
                {secretWord && <p style={{ marginTop: '20px' }}>Код курса: {secretWord}<Button style={{ position: 'absolute', right: '0px', bottom: '0px', color: 'white', fontSize: '12px' }} onClick={this.props.handleBackgroundModalOpen}>Изменить фон курса</Button></p>}
            </div>
            <Modal open={backgroundModalOpened} handleClose={handleBackgroundModalClose}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '300px', width: '250px', position: 'absolute', left: '50%', marginLeft: `-${250 / 2}px`, top: '50%', marginTop: `-${300 / 2}px`, background: 'white', padding: '30px' }}>
                    <h3>Изменить фон</h3>
                    <form onSubmit={handleSubmitNewBackground}>
                        <TextField id="name" name="name" onChange={handleChange} margin="normal" />
                        <div style={{ display: 'flex', alignSelf: 'flex-end', marginTop: '45px' }}>
                            <Button onClick={this.props.handleBackgroundModalClose}>Отмена</Button>
                            <Button type="submit" variant="raised" color="primary">Принять</Button>
                        </div>
                    </form>
                </div>
            </Modal>
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
