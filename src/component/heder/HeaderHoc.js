import React from "react";
import {Redirect} from "react-router";
import {authMeAction, getStatusAction} from "../../reducer/usersReducer";
import {setIsAuth} from "../../reducer/authReducer";
import {connect} from "react-redux";

const HeaderHoc = (WrappedComponent) => {

     class PP extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                isAnswerServer: props.isAnswerServer,
                loginCheck: props.loginCheck
            }
        }

        componentWillMount() {
            this.props.authMeAction()
            if (!this.state.loginCheck) {
                this.setState({isAnswerServer: false})
            }
        }
        bam() {
            return <Redirect to="/"/>
        }

        render() {
            if(this.props.pprops){return<WrappedComponent />}else{
                return this.bam()
            }

        }
    }

    return PP;
};
export default HeaderHoc;