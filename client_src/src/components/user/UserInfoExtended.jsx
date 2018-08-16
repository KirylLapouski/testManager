import React from "react";
import UserInfo from "./user-info/UserInfo";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import PropTypes from "prop-types";
import Grow from "@material-ui/core/Grow";

class UserInfoExtended extends React.Component {
    render() {
        let {
            onButtonClick,
            buttonClicked,
            children,
            buttonTitle
        } = this.props;
        let { firstName, secondName, username, email } = this.props.user;
        return (
            <Grow timeout={800} in={true}>
                <Card
                    style={{
                        background:
                            'url("https://lh4.googleusercontent.com/-64uhpsHBEZw/VMqrG_6wowI/AAAAAAAAAIE/_Pw_QoP0opU/w1005-h214-no/123_rainbowtriangle_teal.jpg")',
                        width: "300px",
                        height: "200px",
                        marginBottom: "20px",
                        position: "relative"
                    }}
                >
                    <UserInfo
                        disabled={true}
                        {...this.props}
                        style={{
                            float: "left",
                            marginTop: "10px",
                            matginLeft: "10px"
                        }}
                    />
                    <CardContent
                        style={{ marginLeft: "70px", textAlign: "left" }}
                    >
                        <p>
                            {firstName} {secondName}
                        </p>
                        <p>{username}</p>
                        <p>{email}</p>
                        {buttonClicked && children}
                    </CardContent>
                    <CardActions
                        style={{
                            display: "flex",
                            marginTop: "25px",
                            justifyContent: "flex-end"
                        }}
                    >
                        <Button
                            onClick={onButtonClick}
                            size="small"
                            style={{ color: "white" }}
                        >
                            {buttonTitle}
                        </Button>
                    </CardActions>
                </Card>
            </Grow>
        );
    }
}

UserInfoExtended.propTypes = {
    firstName: PropTypes.string,
    secondName: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    toggleOpenChart: PropTypes.func,
    onButtonClick: PropTypes.func,
    buttonTitle: PropTypes.string
};

export default UserInfoExtended;
