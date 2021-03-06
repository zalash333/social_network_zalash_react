import {connect} from "react-redux";
import React from "react";
import {getDialogs, sendMessage} from "../../reducer/setDialogIdReducer";

const DialogHoc = (WrappedComponent) => {

    class PP extends React.Component {
        componentDidMount(){
            this.props.getDialogs()
        }
        componentWillUnmount(){

        }

        render() {
            return <WrappedComponent propsHoc={this.props}/>

        }
    }
    let mapStateToProps = (state) => {
        return {
            myFriendsCheck:state.users.myFriendsCheck,
            dialogUsersAll:state.setDialogId.dialogUsersAll,
            informationUsers:state.setDialogId.informationUsers,
        }
    };
    let mapDispatchToProps = (dispatch) => {
        return {
            sendMessage() {
                dispatch(sendMessage())
            },
            getDialogs() {
                dispatch({type:"USER_FETCH_REQUESTED"})
            },
        }
    };
    return connect(mapStateToProps,mapDispatchToProps)(PP);
};

export default DialogHoc;