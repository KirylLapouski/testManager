import React from 'react'
import PropTypes from 'prop-types'

class CourseHeader extends React.Component {
    render() {
        var { backgroundSrc, name, teacherName, teacherLastName, children ,secretWord} = this.props
        return <div style={{ height: '300px', backgroundImage: `url('${backgroundSrc}')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left top', backgroundSize: 'cover' }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', backgroundSize: '100%', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h1>{name}</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>{children}{`${teacherName || ' '} ${teacherLastName || ' '}`}</div>
                {secretWord && <p style={{marginTop:'20px'}}>Код курса: {secretWord}</p>}
            </div>
        </div>
    }
}

CourseHeader.propTypes = {
    name: PropTypes.string,
    backgroundSrc: PropTypes.string,
    teacherName: PropTypes.string,
    teacherLastName: PropTypes.string,
    secretWord: PropTypes.string
}

export default CourseHeader
