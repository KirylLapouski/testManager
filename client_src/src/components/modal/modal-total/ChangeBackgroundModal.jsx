import React from 'react'
import ModalBase from '../ModalBase'
import SingleTextField from '../modal-content/SingleTextField'
import PropTypes from 'prop-types'
class ChangeBAckgroundModal extends React.Component {
    render() {
        let {open,handleClose,onChange,handleSubmit} = this.props
        return <ModalBase
            title={'Изменить фон'}
            width='350px'
            minHeight='250px'
            open={open}
            handleClose={handleClose}
        >
            <SingleTextField
                textFieldTitle='Адрес изображения'
                handleClose={handleClose}
                onChangeHandler={onChange}
                handleSubmit={handleSubmit}
                autoFocus={true}
            />
        </ModalBase>
    }
}

ChangeBAckgroundModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    onChange: PropTypes.func,
    handleSubmit: PropTypes.func
}
export default ChangeBAckgroundModal
