import React from "react";
import cx from "classnames";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
class PlanetItem extends React.Component {
    getDragHeight() {
        return this.props.item.subtitle ? 47 : 28;
    }

    render() {
        const { item, itemSelected, dragHandle, commonProps } = this.props;
        const { deleteItem } = commonProps;
        const scale = itemSelected * 0.05 + 1;
        const shadow = itemSelected * 15 + 1;
        const dragged = itemSelected !== 0;

        return (
            <div
                className={cx("item", { dragged })}
                style={{
                    transform: `scale(${scale})`,
                    boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 *
                        shadow}px 0px`,
                    position: "relative"
                }}
            >
                {dragHandle(<div className="dragHandle" />)}
                <h2>{item.name}</h2>
                {item.subtitle && (
                    <div className="subtitle">
                        This item has a subtitle visible while dragging
                    </div>
                )}

                <IconButton
                    style={{ position: "absolute", right: "0px", top: "0px" }}
                    onClick={deleteItem(item.name)}
                    aria-label="Delete"
                >
                    <ClearIcon />
                </IconButton>
                <div>
                    subtitled planets are better
                    <br />
                    and have longer descriptions
                </div>
            </div>
        );
    }
}
export default PlanetItem;
