import React from 'react';
import { Pagination, PageItem, PageLink } from 'mdbreact';
import PropTypes from 'prop-types';

class Paginator extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            currenNumber:1
        }
        this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
        this.handleNumberClick = this.handleNumberClick.bind(this);
        this.handleRightArrowClick =this.handleRightArrowClick.bind(this);
    }

    static propTypes = {
        length: PropTypes.number,
        //in onClick will given new number of list
        onClick: PropTypes.func
    };

    static defaultProps = {
        length: 0
    }

    handleLeftArrowClick() {
        this.setState((prevState,props)=>{
            this.props.onClick(prevState.currenNumber - 1);
           return { currenNumber: prevState.currenNumber - 1}
        });
    }

    handleRightArrowClick() {
        this.setState((prevState,props)=>{
            this.props.onClick(prevState.currenNumber + 1);
           return { currenNumber: prevState.currenNumber + 1}
        });
    }

    handleNumberClick(current){
        this.setState((prevState,props)=>{
            this.props.onClick(current);
           return { currenNumber: current}
        });
    }
    render() {
        let numbers = [];
        for (let i = 0; i < this.props.length; i++) {
            var currenCircle = i+1==this.state.currenNumber?"active":null;
            numbers.push(
            <PageItem active={currenCircle} >
                <PageLink onClick={()=>{this.handleNumberClick(i+1)}} className="page-link">
                    {i + 1} 
                </PageLink>
            </PageItem>);
        }

        if (this.props.length) {

            return (<Pagination className="pagination-circle">
                <PageItem disabled>
                    <PageLink className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </PageLink>
                </PageItem>
                {numbers}
                <PageItem>
                    <PageLink className="page-link">
                        &raquo;
                    </PageLink>
                </PageItem>
            </Pagination>)
        }
        return null
    }
}

export default Paginator