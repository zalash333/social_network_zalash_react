import React from 'react';
import './ProfileStyle.css';
import imgProfile from '../../img/profile.jpg';
import {connect} from "react-redux";
import {
    addMessageMyWallAction,
    offTextareaBox,
    onTextareaBox
} from "../../reducer/addMessageMyWallReducer";
import withRouter from "react-router-dom/es/withRouter";
import {loginAction} from "../../reducer/loginIdReducer";
import {addSmileAction, messageCallAction} from "../../reducer/messageCallReducer";
import {
    authMeAction,
    flagStatusAction, getInformationUser,
    getStatusAction,
    putStatusAction, setInformationUser, toggle
} from "../../reducer/usersReducer";
import {NavLink} from "react-router-dom";
import missingAvatar from '../../img/missingAvatar.jpg';
import {addFriends, deleteFriends, getInformationFriends} from "../../reducer/followngReducer";


const ProfileUsers = (props) => {
    let {currentUser, match} = props;
    let currentPageId = match.params.id;
    return (
        <div className="profile">
            {!props.information.fullName ? props.getInformationFriends(currentPageId) : ''}
            <div className='scroll'>
                <img className="imgProfile" src={imgProfile}/>
                <div className="profileUsers">
                    <div className='information-editing'>
                        <img className="avatar"
                             src={props.information.photos.small ? props.information.photos.small : missingAvatar}/>
                        <div className='button-information-editing'>
                            <NavLink className='link-message' to={`/vk.com/massage/id${props.id}/${currentPageId}`}
                                     onClick={() => {
                                         console.log('asdasdasd')
                                     }}>
                                <div className='button-following-profile'
                                     onClick={() => console.log('please second time')}>{'Написать'}</div>
                            </NavLink>
                            <div className='button-following-profile' onClick={() => {
                                props.followBool ? props.deleteFriends(currentPageId) : props.addFriends(currentPageId)
                            }}>{props.followBool ? 'Отписаться' : 'Подписаться'}</div>
                        </div>
                    </div>
                    <div className="informationUsers">
                        <div className='name-lastName-status-block'>
                            <span className='name-lastName'>{props.information.fullName}</span>
                            <div className="status-user">
                                Status:
                                <div
                                    className="status-current-user">{props.statusUser ? props.statusUser : 'no status'}</div>
                            </div>
                        </div>
                        <span>Birthday: {currentUser.birthday}</span>
                        <span>City: {currentUser.city}</span>
                        <span>Education: {currentUser.education}</span>
                        <div className='information-click' onClick={props.toggleFunc}>Подробная информация</div>
                        {props.toggle ? <div><span>Contacts: <div
                            className='contact-profile'>{Object.keys(props.information.contacts).map(key => {
                                debugger
                                if (props.information.contacts[key]) {
                                    return <div>
                                        <span>{key}: <a>{props.information.contacts[key]}</a></span>
                                    </div>
                                } else {
                                    return ''
                                }
                            }
                        )}</div>
                        </span>
                        </div> : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};
let mapStateToProps = (state) => {
    debugger
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
        status: state.status.status,
        toggle: state.users.toggle,
        users: state.users.users,
        information: state.following.information,
        statusUser: state.following.status,
        followBool: state.following.followingBool,
        id: state.users.id
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        addMessageMyWall: (message, id, date, month, hours, minutes) => {
            dispatch(addMessageMyWallAction(message, id, date, month, hours, minutes))
        },
        loginUserAction: (mas) => {
            dispatch(loginAction(mas))
        },
        setCallMessage: (message) => {
            dispatch(messageCallAction(message))
        },
        onTextarea: () => {
            dispatch(onTextareaBox())
        },
        offTextarea: () => {
            dispatch(offTextareaBox())
        },
        addSmile: (s) => {
            dispatch(addSmileAction(s))
        },
        authMeAction: () => {
            dispatch(authMeAction())
        },
        flagStatusAction: () => {
            dispatch(flagStatusAction())
        },
        putStatusAction: (status) => {
            dispatch(putStatusAction(status))
        },
        getStatusAction: (id) => {
            dispatch(getStatusAction(id))
        },
        getInformationUser() {
            dispatch(getInformationUser())
        },
        setInformationUser() {
            dispatch(setInformationUser())
        },
        toggleFunc() {
            dispatch(toggle())
        },
        getInformationFriends(id) {
            dispatch(getInformationFriends(id))
        },
        addFriends(id) {
            dispatch(addFriends(id))
        },
        deleteFriends(id) {
            dispatch(deleteFriends(id))
        }
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileUsers));
