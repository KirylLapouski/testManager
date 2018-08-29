import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import ChangeBackgroundModal from '../../modal/modal-total/ChangeBackgroundModal'
import { withStyles } from '@material-ui/core/styles'
const styles = {
    mainHeader: { height: '300px', position: 'relative', backgroundRepeat: 'no-repeat', backgroundPosition: 'left top', backgroundSize: 'cover' },
    headerInfo: { backgroundColor: 'rgba(0,0,0,0.3)', backgroundSize: '100%', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' },
    teacherInfo: { display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' },
    changeBackgroundButton: { position: 'absolute', right: '0px', bottom: '0px', color: 'white', fontSize: '12px' }
}
class CourseHeader extends React.Component {

    render() {
        let { backgroundSrc, classes, name, teacherName, teacherLastName, children, secretWord, backgroundModalOpened, handleBackgroundModalClose, handleSubmitNewBackground, handleChange } = this.props
        return <div className={classes.mainHeader} style={{ backgroundImage: `url('${backgroundSrc}')` }}>
            <div className={classes.headerInfo}>
                <h1>{name}</h1>
                <div className={classes.teacherInfo}>{children}{`${teacherName || ' '} ${teacherLastName || ' '}`}</div>
                {secretWord && <p style={{ marginTop: '20px' }}>Код курса: {secretWord}<Button className={classes.changeBackgroundButton} onClick={this.props.handleBackgroundModalOpen}>Изменить фон курса</Button></p>}
            </div>
            {/* TODO: modal to container */}
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

export default withStyles(styles)(CourseHeader)
