import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
class SubmitAndCancel extends React.Component {

    render() {
        var { handleClose,handleSubmit } = this.props
        return <div style={{ display: 'flex', alignSelf: 'flex-end', position: 'relative', bottom: '-10px', marginTop: '25px' }}>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={handleSubmit || ((e)=>{return e}) } variant="raised" type='submit' color="primary">Принять</Button>
        </div>
    }
}

SubmitAndCancel.propTypes = {
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func
}
export default SubmitAndCancel
