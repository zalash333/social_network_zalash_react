import React from "react";
import {authMeAction, getInformationUser, getStatusAction} from "../../reducer/usersReducer";
import {connect} from "react-redux";

const ProfileHoc = (WrappedComponent) => {
    class PP extends React.Component {
        constructor(props) {
            super(props);
            console.log(props);
            this.state = {
                photo:'',
                timer:'',
                collection:['190727','17098','494263','539527','3178572','3106804','573009','540518'],
                isAnswerServer: props.isAnswerServer,
                loginCheck: props.loginCheck
            }
        }
        componentWillMount(){
            // this.state.timer = setInterval(()=>{this.setState({photo:''})},2500)

            this.state.timer = setInterval(()=>{this.setState({photo:`https://source.unsplash.com/collection/${this.state.collection[Math.floor(Math.random() * this.state.collection.length)]}/1600x300`})},8000)
        }
        componentWillUnmount(){
            window.clearInterval(this.state.timer)
        }
        async componentDidMount() {
            await this.props.getInformationUser();
            await this.props.getStatusAction();
        }
        render() {
            return <WrappedComponent photo={this.state.photo} />}


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