import React from 'react'

const Accordion = Component => {
    return class AccordionClass extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                openitemId: -1
            }

            this.toggleOpenItem = this.toggleOpenItem.bind(this)
        }

        toggleOpenItem(openItem) {
            this.setState({
                openitemId: openItem
            })
        }
        render() {
            return <Component {...this.props} toggleOpenItem={this.toggleOpenItem} openedItem={this.state.openitemId} />
        }
    }
}

export default Accordion
