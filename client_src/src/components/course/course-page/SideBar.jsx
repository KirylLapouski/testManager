import React from "react";
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
class SideBar extends React.Component {

    render() {
        return <div style={{ background: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', ...this.props.style }}>
            <Button>Уроки</Button>
            <Button>Ученики</Button>
        </div>
    }
}

SideBar.propTypes = {
    style: PropTypes.object
}
export default SideBar
