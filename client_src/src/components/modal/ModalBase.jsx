import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'material-ui/Modal'
import Button from '@material-ui/core/Button'
import ClearIcon from '@material-ui/icons/Clear'
class ModalBase extends React.Component {
    render() {
        var { title, open, handleClose, children, minHeight, width } = this.props
        return (
            <Modal open={open} onClose={handleClose}>
                <div style={{ display: 'flex', flexDirection: 'column',alignItems:'center', minHeight, width, position: 'absolute', left: '50%', marginLeft: `-${width.replace('px','') / 2}px`, top: '50%', marginTop: `-${minHeight.replace('px','') / 2}px`, background: 'white', padding: `${+width.replace('px','') *0.05}px`, paddingTop:'0px' }}>
                    <div style={{ width: '111.2%', backgroundColor: '#757ce8', height: '40px'}}>
                        <Button style={{ float: 'right' }} onClick={handleClose}>
                            <ClearIcon style={{ color: 'white' }} />
                        </Button>
                    </div>
                    <h3 style={{alignSelf:'flex-start'}}>{title}</h3>
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


export default ModalBase