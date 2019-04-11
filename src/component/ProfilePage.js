import React from 'react';
import SideBar from "./sideBar/SideBar";
import Header from "./heder/Header";
import Profile from "./profile/Profile";
import './ProfilePageStyle.css'
import Dialogs from "./dialog/Dialogs";
import {Route, Switch, withRouter} from "react-router-dom"
import Massage from "./message/Massage";
import {connect} from "react-redux";
import News from "./news/News";
import Friends from "./friends/Friends";
import {authMeAction, getStatusAction, usersAction} from "../reducer/usersReducer";
import {setIsAuth} from "../reducer/authReducer";
import InformationEditing from "./form/InformationEditing";
import ProfileUsers from "./profile/ProfileUsers";
import {statuses} from "../reducer/statusReducer";
import Loading from "./loading/Loading";
import Settings from "./settings/Settings";

let Error = () => {
    return (<div>
        <span>
        error 111111111111111
    </span>
        </div>
    );
};


const ProfilePage = (props) => {
    let addStyleProfilePage = document.querySelector('.profilePage');
    return (<div>
            {addStyleProfilePage===null?'':props.status === statuses.INPROGRESS?addStyleProfilePage.classList.add('active-loading'):addStyleProfilePage.classList.contains('active-loading')?addStyleProfilePage.classList.remove('active-loading'):''}
            {props.status === statuses.INPROGRESS ? <Loading/> : ''}
        <div className="profilePage">
            <Header
                pprops={props.pprops}
                link={"/vk.com/profile/id" + props.id}
                isAnswerServer={props.isAnswerServer}
                authMeAction={props.authMeAction}/>
            <div className='content-wrapper'>
                <div className='sidebar-block'>
                    <SideBar/>
                </div>
                <div className='content'>
                    <Switch>
                        <Route path={"/vk.com/profile/id:id"} exact component={Profile}/>
                        <Route path={"/vk.com/profile/users/id:id"} exact component={ProfileUsers}/>
                        <Route path={"/vk.com/information/editing/id:id"} exact component={InformationEditing}/>
                        <Route path={"/vk.com/dialogs/id:id"} exact component={Dialogs}/>
                        <Route path={"/vk.com/friends/id:id"} exact render={()=><Friends/>}/>
                        <Route path={`/vk.com/massage/id:id/:userId?`} component={Massage}/>
                        <Route path={"/vk.com/news/id:id"} component={News}/>
                        <Route path={"/vk.com/settings/id:id"} component={Settings}/>
                        <Route component={Error}/>
                    </Switch>
                </div>
            </div>
        </div>
        </div>
    );
};

let mapStateToProps = (state) => {
    return {
        loginUser: state.loginId.id,
        isAnswerServer: state.users.isAnswerServer,
        status: state.status.status,
        id:state.users.id
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        loginBack: (mas) => {
            dispatch(setIsAuth(mas))
        },
        authMeAction: () => {
            dispatch(authMeAction())
        },
        getStatusAction: (id) => {
            dispatch(getStatusAction(id))
        },
        usersAction(a) {
            dispatch(usersAction(a))
        },
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));