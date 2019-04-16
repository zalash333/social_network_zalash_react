import React from "react";
import {Redirect} from "react-router";
import {authMeAction, getInformationUser, getStatusAction} from "../../reducer/usersReducer";
import {setIsAuth} from "../../reducer/authReducer";
import {connect} from "react-redux";
import {getMessages, getUserProfile} from "../../reducer/setDialogIdReducer";

const HeaderHoc = (WrappedComponent) => {

     class PP extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                isAnswerServer: props.isAnswerServer,
                loginCheck: props.loginCheck
            }
        }

        componentDidMount() {
            this.props.authMeAction();
            this.props.getInformationUser();
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
    let mapDispatchToProps = (dispatch) => {
        return {
            getInformationUser:()=>{
                dispatch(getInformationUser())
            }
        }
    };
    return connect(null,mapDispatchToProps)(PP);
};
export default HeaderHoc;