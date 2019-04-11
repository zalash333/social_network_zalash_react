import {addSmileAction, messageCallAction} from "../../reducer/messageCallReducer";
import {authMeAction, getInformationUser, getStatusAction, setInformationUser} from "../../reducer/usersReducer";
import React from "react";
import {connect} from "react-redux";
import {getMessages} from "../../reducer/setDialogIdReducer";

const MassageHoc = (WrappedComponent) => {
    class PP extends React.Component {
        constructor(props) {
            super(props);
            debugger
            this.state = {
                currentDialogId: this.props.match.params.userId,
                timer:''
            }

        }
        messageGet(){
            this.props.getMessages(this.state.currentDialogId)
            console.log('njjjj')
        }
        componentWillMount() {
            this.messageGet();
            this.state.timer = setInterval(this.messageGet.bind(this),5000)
        }
        componentWillUnmount(){
            window.clearInterval(this.state.timer)
        }
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
            getMessages(e){
                dispatch(getMessages(e))
            }
        }
    };
    return connect(mapStateToProps, mapDispatchToProps)(PP);
};

export default (MassageHoc);