import React from "react";
import {authMeAction, getInformationUser, getStatusAction} from "../../reducer/usersReducer";
import {connect} from "react-redux";

const ProfileHoc = (WrappedComponent) => {
    class PP extends React.Component {
        constructor(props) {
            super(props);
            console.log(props);
            this.state = {
                isAnswerServer: props.isAnswerServer,
                loginCheck: props.loginCheck
            }
        }
        async componentDidMount() {
            await this.props.getInformationUser();
            await this.props.getStatusAction()

        }
        render() {
            return <WrappedComponent props={this.props} />}


    }

    let mapDispatchToProps = (dispatch) => {
        return {
            getInformationUser(){
                dispatch(getInformationUser())
            },
            getStatusAction:(id)=>{
                dispatch(getStatusAction(id))
            },
            authMeAction:()=>{
                dispatch(authMeAction())
            }
        }
    };
    let mapStateToProps = (state) => {
        return {
            idUsers: state.users.id
        }
    };
    return connect(mapStateToProps, mapDispatchToProps)(PP);
};

export default (ProfileHoc);