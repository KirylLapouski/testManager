import React from 'react';
import Test from './Test';

class TestContainer extends React.Component{
    render(){
        return <div className="z-depth-1 container" style={{padding:"0px"}}><Test {...this.props}/><Test {...this.props}/></div>
    }
}

export default TestContainer