import React from 'react'

const LoadingIndicatorDecorator = Component => {

    return class LoadingIndicator extends React.Component {
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
            return <Component {...this.props} loading={this.state.loading} toggleLoading={this.toggleLoading} />

        }
    }
}

export default LoadingIndicatorDecorator
