import React from "react";
import {getInformationUser} from "../../reducer/usersReducer";
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
        componentDidMount() {
            this.props.getInformationUser();

        }
        render() {
            return <WrappedComponent props={this.props} />}


    }

    let mapDispatchToProps = (dispatch) => {
        return {
            getInformationUser(){
                dispatch(getInformationUser())
            }
        }
    };
    return connect(null, mapDispatchToProps)(PP);
};

export default (ProfileHoc);