import React from "react";
import {Redirect} from "react-router";
import {authMeAction, getStatusAction, usersAction} from "../../reducer/usersReducer";
import {setIsAuth} from "../../reducer/authReducer";
import {connect} from "react-redux";
import {getInformationFriends} from "../../reducer/followngReducer";
import {loginAction} from "../../reducer/loginIdReducer";
import {dialogIdAction, getDialogs, sendMessage} from "../../reducer/setDialogIdReducer";

const FriendsHoc = (WrappedComponent) => {

    class PP extends React.Component {
        constructor(props) {
            super(props);
            debugger
        }

        shouldComponentUpdate() {
            debugger
            return this.props.myFriendsCheck
        }

        componentDidUpdate() {
            debugger
            this.props.usersAction(0);
        }
        componentWillUnmount(){

        }

        render() {
            return <WrappedComponent/>

        }
    }
    let mapStateToProps = (state) => {
        return {
            myFriendsCheck:state.users.myFriendsCheck
        }
    };
    let mapDispatchToProps = (dispatch) => {
        return {
            usersAction(a) {
                dispatch(usersAction(a))
            },
        }
    };
    return connect(mapStateToProps,mapDispatchToProps)(PP);
};

export default FriendsHoc;