import React from 'react'
import { Pagination, PageItem, PageLink } from 'mdbreact'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Paginator extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currenNumber: this.props.initCurrentPos ? this.props.initCurrentPos : 1
        }
        this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this)
        this.handleNumberClick = this.handleNumberClick.bind(this)
        this.handleRightArrowClick = this.handleRightArrowClick.bind(this)
    }

    handleLeftArrowClick() {
        this.setState((prevState) => {
            this.props.onClick(prevState.currenNumber - 1)
            return { currenNumber: prevState.currenNumber - 1 }
        })
    }

    handleRightArrowClick() {
        this.setState((prevState) => {
            this.props.onClick(prevState.currenNumber + 1)
            return { currenNumber: prevState.currenNumber + 1 }
        })
    }

    handleNumberClick(current) {
        this.setState((prevState) => {
            this.props.onClick(current)
            return { currenNumber: current }
        })
    }
    render() {
        let numbers = []
        for (let i = 0; i < this.props.length; i++) {
            var currenCircle = (i + 1) ==   this.state.currenNumber 
            numbers.push(
                //!!!!!!
                <PageItem key={i} active={currenCircle} >
                    <PageLink onClick={() => { this.handleNumberClick(i + 1) }} className="page-link">
                        {i + 1}
                    </PageLink>
                </PageItem>)
        }

        if (this.props.length>1) {

            return (
                <Pagination style={{ justifyContent: 'center' }} className="pagination-circle">
                    <PageItem disabled={this.state.currenNumber == 1 ? true : false}>
                        <PageLink onClick={this.handleLeftArrowClick} className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </PageLink>
                    </PageItem>
                    {numbers}
                    <PageItem disabled={this.state.currenNumber == this.props.length ? true : false}>
                        <PageLink onClick={this.handleRightArrowClick} className="page-link">
                            &raquo;
                        </PageLink>
                    </PageItem>
                </Pagination>)
        }
        return null
    }
}

Paginator.propTypes = {
    initCurrentPos: PropTypes.number,
    length: PropTypes.number.isRequired,
    //in onClick will given new number of list
    onClick: PropTypes.func.isRequired,
}

Paginator.defaultProps = {
    length: 0
}
export default Paginator