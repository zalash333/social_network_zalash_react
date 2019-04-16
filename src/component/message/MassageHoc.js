import React from "react";
import {connect} from "react-redux";
import {getDialogs, getMessages, getUserProfile} from "../../reducer/setDialogIdReducer";
import {authMeAction, getInformationUser} from "../../reducer/usersReducer";

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
            this.props.getMessages(this.state.currentDialogId);
            console.log('njjjj')
        }
        async componentDidMount(){
            await this.props.getUserProfile(this.state.currentDialogId)
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
            usersTest: state.checkUserLogin.informationUsers,
            dataCheck: state.dataCheck.data,
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
            },
            getUserProfile(e){
                dispatch(getUserProfile(e))
            }
        }
    };
    return connect(mapStateToProps, mapDispatchToProps)(PP);
};

export default (MassageHoc);