import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Slide from "@material-ui/core/Slide";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import Button from "@material-ui/core/Button";
class NavSidebar extends React.Component {
    render() {
        var { userId, onClose } = this.props;
        return (
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    zIndex: "4"
                }}
            >
                <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                    <ClickAwayListener onClickAway={onClose}>
                        <List
                            color="primary"
                            style={{
                                backgroundColor: "#3f51b5",
                                width: "300px",
                                height: "100%",
                                boxShadow: "4px 1px 20px 0px black"
                            }}
                        >
                            <Button
                                style={{
                                    width: "100%",
                                    color: "white"
                                }}
                                variant="flat"
                                onClick={onClose}
                            >
                                <KeyboardBackspace /> Назад
                            </Button>
                            <ListItem>
                                <Link
                                    onClick={onClose}
                                    style={{ marginLeft: "20px" }}
                                    to="/"
                                >
                                    Страница входа
                                </Link>
                            </ListItem>

                            <ListItem>
                                <Link
                                    onClick={onClose}
                                    style={{ marginLeft: "20px" }}
                                    to={`/cources/${userId}`}
                                >
                                    Мои курсы
                                </Link>
                            </ListItem>

                            <ListItem>
                                <Link
                                    onClick={onClose}
                                    style={{ marginLeft: "20px" }}
                                    to="/profile"
                                >
                                    Профиль
                                </Link>
                            </ListItem>
                        </List>
                    </ClickAwayListener>
                </Slide>
            </div>
        );
    }
}

NavSidebar.propTypes = {
    userId: PropTypes.number,
    onClose: PropTypes.func
};
export default NavSidebar;
