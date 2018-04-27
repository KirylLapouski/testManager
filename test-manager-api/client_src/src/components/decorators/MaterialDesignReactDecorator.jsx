import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Test = Component => {
    return class MUIWrapper extends React.Component {
        render() {
            return <MuiThemeProvider>
                <Component {...this.props} />
            </MuiThemeProvider>
        }
    }
}

export default Test;