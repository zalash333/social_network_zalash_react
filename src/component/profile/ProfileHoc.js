import React from "react";
import {addSmileAction, messageCallAction} from "../../reducer/messageCallReducer";
import {
    authMeAction,
    flagStatusAction,
    getInformationUser,
    getStatusAction,
    putStatusAction,
    setInformationUser
} from "../../reducer/usersReducer";
import {addMessageMyWallAction, offTextareaBox, onTextareaBox} from "../../reducer/addMessageMyWallReducer";
import {loginAction} from "../../reducer/loginIdReducer";
import {connect} from "react-redux";

const ProfileHoc = (WrappedComponent) => {
    class PP extends React.Component {
        constructor(props) {
            super(props);
            console.log(props);
            debugger;
            this.state = {
                isAnswerServer: props.isAnswerServer,
                loginCheck: props.loginCheck
            }
        }

        componentWillMount() {
            this.props.getInformationUser();

        }

        // shouldComponentUpdate() {
        //
        // }

        // componentWillUpdate() {
        //     alert('adffa')
        //     debugger
        //     if (!this.state.loginCheck) {
        //         this.setState({isAnswerServer: false})
        //     }
        // }
        render() {
            return <WrappedComponent props={this.props} />}


    }
    let mapStateToProps = (state) => {
        return {
            currentUser: state.checkUserLogin.informationUsers[state.loginId.id],
            loginUser: state.loginId.id,
            messageMyWall: state.addMessageMyWall.informationUsers[state.loginId.id].myWall,
            usersTest: state.checkUserLogin.informationUsers,
            dataCheck: state.dataCheck.data,
            dataMyWall: state.addMessageMyWall.informationUsers[state.loginId.id].data,
            callMessage: state.callMessage.message,
            flags: state.addMessageMyWall.flags,
            idUsers: state.users.id,
            statusUsers: state.users.status,
            flagStatus: state.users.flagStatus,
            information: state.users.information,
            status: state.status.status
        }
    };
    let mapDispatchToProps = (dispatch) => {
        return {
            addMessageMyWall: (message, id, date, month, hours, minutes) => {
                dispatch(addMessageMyWallAction(message, id, date, month, hours, minutes))
            },
            loginUserAction: (mas) => {
                dispatch(loginAction(mas))
            },
            setCallMessage: (message) => {
                dispatch(messageCallAction(message))
            },
            onTextarea: () => {
                dispatch(onTextareaBox())
            },
            offTextarea: () => {
                dispatch(offTextareaBox())
            },
            addSmile: (s) => {
                dispatch(addSmileAction(s))
            },
            authMeAction: () => {
                dispatch(authMeAction())
            },
            flagStatusAction: () => {
                dispatch(flagStatusAction())
            },
            // statusAction:(status,id)=>{
            //     dispatch(statusAction(status,id))
            // },
            putStatusAction: (status) => {
                dispatch(putStatusAction(status))
            },
            getStatusAction: (id) => {
                dispatch(getStatusAction(id))
            },
            getInformationUser(){
                dispatch(getInformationUser())
            },
            setInformationUser(){
                dispatch(setInformationUser())
            }
        }
    };
    return connect(mapStateToProps, mapDispatchToProps)(PP);
};

export default (ProfileHoc);