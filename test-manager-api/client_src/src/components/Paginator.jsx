import React from 'react';
import { Pagination, PageItem, PageLink } from 'mdbreact';
import PropTypes from 'prop-types';

class Paginator extends React.Component {

    static propTypes = {
        length: PropTypes.number
    };

    static defaultProps = {
        length:0
    }

    render() {
        let numbers = [];
        for (let i = 0; i < this.props.length; i++) {
            numbers.push(<PageItem>
                <PageLink className="page-link">
                   {i+1}
                </PageLink>
            </PageItem>);
        }

        if(this.props.length){

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