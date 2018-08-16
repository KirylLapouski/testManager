import React from 'react'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'

class UserInfo extends React.Component {

    render() {
        let { style, menu, imageSrc, goToUrl, userId, handleMenuClose, handleMenuClick, logOut, disabled } = this.props
        return (<div style={Object.assign({}, { display: 'inline-block', position: 'relative' }, style)}>
            <Button color="primary" aria-owns={menu ? 'simple-menu2' : null} aria-haspopup="true" onClick={handleMenuClick}>
                <img width='50px' height='50px' style={{ backgroundColor: 'white' }} src={imageSrc} />
            </Button>
            {disabled ||
                <Menu open={!!menu} id="simple-menu2" anchorEl={menu} style={{ position: 'absolute', top: '40px' }} onClose={handleMenuClose}>
                    <MenuItem onClick={goToUrl('/profile')}>Профиль</MenuItem>
                    <MenuItem onClick={goToUrl(`/cources/${userId}`)}>Мои курсы</MenuItem>
                    <hr />
                    <MenuItem onClick={logOut}>Выйти</MenuItem>
                </Menu>
            }
        </div>
        )
    }
}
UserInfo.propTypes = {
    disabled: PropTypes.bool,
    style: PropTypes.object,
    userId: PropTypes.number,
    menu: PropTypes.object,
    imageSrc: PropTypes.string,
    goToUrl: PropTypes.func,
    handleMenuClose: PropTypes.func,
    handleMenuClick: PropTypes.func,
    logOut: PropTypes.func
}



export default UserInfo
