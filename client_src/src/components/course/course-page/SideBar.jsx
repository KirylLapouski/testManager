import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
const styles = {
    sideBar: { background: 'rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }
}
class SideBar extends React.Component {

    render() {
        let { lessonButtonOnClick, descipleButtonClick,classes } = this.props
        return <div className className={classes.sideBar} style={this.props.style}>
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
export default withStyles(styles)(SideBar)
