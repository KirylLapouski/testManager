import React from "react";
import QuestionContainer from "../question/QuestionContainer";
import PropTypes from "prop-types";
class TestList extends React.Component {
    render() {
        return (
            <div className="z-depth-1 container" style={{ padding: "0px" }}>
                {this.props.questions.map((item, i) => (
                    <QuestionContainer
                        key={item.id}
                        editing={
                            this.props.openedItem === item.id ? true : false
                        }
                        question={item}
                        toggleOpenItem={this.props.toggleOpenItem}
                    />
                ))}
            </div>
        );
    }
}

TestList.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number
        })
    ),
    openedItem: PropTypes.number,
    toggleOpenItem: PropTypes.func
};

export default TestList;
