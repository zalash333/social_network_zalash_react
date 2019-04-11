import React from "react";
import {authMeAction, getStatusAction} from "../../reducer/usersReducer";
import {setIsAuth} from "../../reducer/authReducer";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

class HeaderCheckLogin extends React.Component{
    constructor(props) {
        super(props)
    }
    componentWillMount(){
        this.props.authMeAction()
    }
    shouldComponentUpdate(){
    }
    componentWillUpdate(){
    }
    bam(){
        alert('zzzzzzzZZZ');
        return <Redirect to="/"/>
    }
    render(){
        return <>{this.props.loginCheck?alert('1'):''}</>
    }
}
let mDTP = (dispatch) => {
    return {
        loginBack: (mas) => {
            dispatch(setIsAuth(mas))
        },
        authMeAction:()=>{
            dispatch(authMeAction())
        },
        getStatusAction:(id)=>{
            dispatch(getStatusAction(id))
        }
    }
};
let mSTP = (state) => {
    debugger
    return {
        loginUser: state.loginId.id,
        currentUser: state.checkUserLogin.informationUsers[state.loginId.id],
        idUsers: state.users.id,
        statusUsers: state.users.status,
        loginCheck: state.users.loginCheck
    }
};
export default connect(mSTP, mDTP)(HeaderCheckLogin);