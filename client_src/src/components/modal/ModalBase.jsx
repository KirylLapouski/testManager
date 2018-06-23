import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'material-ui/Modal'
import Button from '@material-ui/core/Button'
import ClearIcon from '@material-ui/icons/Clear'
class ModalBase extends React.Component {
    render() {
        var { title, open, handleClose, children, height, width } = this.props
        return (
            <Modal open={open} onClose={handleClose}>
                <div style={{ display: 'flex', flexDirection: 'column', height, width, position: 'absolute', left: '50%', marginLeft: `-${250 / 2}px`, top: '50%', marginTop: `-${300 / 2}px`, background: 'white', padding: `${+this.props.width.replace('px','') *0.12}px`, paddingTop:'0px' }}>
                    <div style={{ width: '132%', backgroundColor: '#757ce8', height: '40px', marginLeft:'-16%' }}>
                        <Button style={{ float: 'right' }} onClick={handleClose}>
                            <ClearIcon style={{ color: 'white' }} />
                        </Button>
                    </div>
                    <h3>{title}</h3>
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
    height: PropTypes.string,
    //IN PX ONLY
    width: PropTypes.string
}

ModalBase.defaultProps = {
    width: '248px'
}


export default ModalBase
