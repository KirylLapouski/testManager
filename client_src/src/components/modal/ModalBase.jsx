import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'material-ui/Modal'
import Button from '@material-ui/core/Button'
import ClearIcon from '@material-ui/icons/Clear'
import { withStyles } from '@material-ui/core/styles'
const style = {
    modalBaseContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute', left: '50%', top: '50%', background: 'white', paddingTop: '0px' },
    modalHeader: { width: '111.2%', backgroundColor: '#757ce8', height: '40px' },
    modalTitleContainer: { alignSelf: 'flex-start' }
}
class ModalBase extends React.Component {
    render() {
        let { title, open, handleClose, children, minHeight, width, classes } = this.props
        return (
            <Modal open={open} onClose={handleClose}>
                <div className={classes.modalBaseContainer} style={{ minHeight, width, marginLeft: `-${width.replace('px', '') / 2}px`, marginTop: `-${minHeight.replace('px', '') / 2}px`, padding: `${+width.replace('px', '') * 0.05}px`, }}>
                    <div className={classes.modalHeader}>
                        <Button style={{ float: 'right' }} onClick={handleClose}>
                            <ClearIcon style={{ color: 'white' }} />
                        </Button>
                    </div>
                    <h3 className={classes.modalTitleContainer} >{title}</h3>
                    {children}
                </div>
            </Modal >
        )
    }
}

ModalBase.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    //IN PX ONLY
    minHeight: PropTypes.string,
    width: PropTypes.string
}

ModalBase.defaultProps = {
    width: '248px',
    minHeight: '300px'
}


export default withStyles(style)(ModalBase)
