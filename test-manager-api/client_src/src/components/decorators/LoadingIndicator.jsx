import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingIndicator = Component => {

    return class LoadingIndicatorClass extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                loading: false
            }
        }

        toggleLoading = () => {
            this.setState((prevState) => {
                return {
                    loading: !prevState.loading
                }
            })
        }
        render() {
            return <div>
                {!this.state.loading || <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '0', left: '0', right: '0', bottom: '0', zIndex: '1' }}>
                    <CircularProgress style={{ color: '#9C27B0' }} />
                </div>}
                <div style={this.state.loading ? { opacity: '0.25' } : {}}>
                    <Component {...this.props} loading={this.state.loading} toggleLoading={this.toggleLoading} />
                </div>
            </div>
        }
    }
}

export default LoadingIndicator