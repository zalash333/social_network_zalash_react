import React, {useEffect} from 'react';
import "./DialogsStyle.css"
import {NavLink} from "react-router-dom";
import {loginAction} from "../../reducer/loginIdReducer";
import {connect} from "react-redux";
import {
    clearAllDialogAction,
    dialogIdAction,} from "../../reducer/setDialogIdReducer";
import {MdMailOutline} from "react-icons/md/index";
import DialogHoc from "./DialogHoc";
import missingAvatar from '../../img/missingAvatar.jpg';
import Search from "../search/Search";


const Dialogs = (props) => {
    useEffect(()=>{
        return ()=>{props.clearAllDialogAction()}
    },[]);
    return (
        <div className='container-dialog'>
            <div className="dialog">
                <Search/>
                {!props.informationUsers.length?'':props.informationUsers.map((user, index) => {
                    return (
                        <div className='style-block-dialogs'>
                            <NavLink className='link-message'
                                     to={`/vk.com/massage/id${props.id}/${props.informationUsers[index].userId}`}
                            >
                                <div>
                                    <div>{console.log(props.informationUsers[index].userId)}
                                        <span>{props.informationUsers[index].fullName}</span>
                                    </div>
                                    <div className="massage">
                                        <img
                                            src={props.informationUsers[index].photos.small ? props.informationUsers[index].photos.small : missingAvatar}/>
                                        <div>
                                            <h4>{'потом будет круто пока так'}</h4>
                                        </div>

                                    </div>
                                </div>
                            </NavLink>
                            <div className='line-dialogs'>

                            </div>
                        </div>
                    )
                })}
                <div className="loader">Loading...</div>
            </div>
            <div className='block-checked-messages'><span className='text-all-massage'>Все сообщения<MdMailOutline
                className='icon-in'/></span>
                <span className='text-in-massage'>Непрочитанные</span>
            </div>
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        loginUser: state.loginId.id,
        currentUser: state.checkUserLogin.informationUsers[state.loginId.id],
        location: state.loginId.location,
        users: state.checkUserLogin.informationUsers,
        dialogsPage: state.dialogsPage.dialogsPage,
        usersTest: state.checkUserLogin.informationUsers,
        dialogUsersAll: state.setDialogId.dialogUsersAll,
        informationUsers: state.setDialogId.informationUsers,
        id: state.users.id

    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        setDialogIdAction: (mas) => {
            dispatch(dialogIdAction(mas))
        },
        loginUserAction: (mas) => {
            dispatch(loginAction(mas))
        },
        getDialogs() {
            dispatch({type:"USER_FETCH_REQUESTED"})
        },
        clearAllDialogAction(){
            dispatch(clearAllDialogAction())
        }
    }
};

export default DialogHoc(connect(mapStateToProps, mapDispatchToProps)(Dialogs));