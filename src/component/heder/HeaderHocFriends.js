import React from "react";
import {Redirect} from "react-router";
import {authMeAction, getStatusAction, usersAction} from "../../reducer/usersReducer";
import {setIsAuth} from "../../reducer/authReducer";
import {connect} from "react-redux";
import {getInformationFriends} from "../../reducer/followngReducer";

const HeaderHocFriends = (WrappedComponent) => {

    class PP extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isAnswerServer: props.isAnswerServer,
                loginCheck: props.loginCheck
            }
        }

        componentWillMount() {
            this.props.getInformationFriends();
            if (!this.state.loginCheck) {
                this.setState({isAnswerServer: false})
            }
        }

        render() {
            return <WrappedComponent/>
        }


    }

    return PP;
};
let mapDispatchToProps = (dispatch) => {
    return {
        getInformationFriends(id){
            dispatch(getInformationFriends(id))
        }
    }
};
export default connect(null, mapDispatchToProps)(HeaderHocFriends);