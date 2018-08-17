import React from "react"
import Button from '@material-ui/core/Button'
import PropTypes from "prop-types"
class SideBar extends React.Component {

    render() {
        let {lessonButtonOnClick, descipleButtonClick} = this.props
        return <div style={{ background: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', ...this.props.style }}>
            <Button onClick={lessonButtonOnClick}>Уроки</Button>
            <Button onClick={descipleButtonClick}>Ученики</Button>
        </div>
    }
}

SideBar.propTypes = {
    style: PropTypes.object,
    lessonButtonOnClick: PropTypes.func,
    descipleButtonClick: PropTypes.func
}
export default SideBar
