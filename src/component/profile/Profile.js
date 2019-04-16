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
import TextareaAutosize from 'react-textarea-autosize';
import {
    MdChatBubbleOutline,
    MdFavoriteBorder,
    MdMusicNote,
    MdPhotoCamera,
     MdTagFaces,
    MdTheaters
} from "react-icons/md/index";
import {TiExportOutline} from "react-icons/ti/index";
import EmojiMartPicker from "emoji-mart-picker";
import {
    authMeAction,
    flagStatusAction, getInformationUser,
    getStatusAction, putStatusAction, setInformationUser,
     toggle
} from "../../reducer/usersReducer";
import ProfileHoc from "./ProfileHoc";
import {NavLink} from "react-router-dom";
import missingAvatar from '../../img/missingAvatar.jpg';


const Profile = (props) => {
    let {flagStatusAction, flagStatus, statusUsers, flags, onTextarea, offTextarea, currentUser, addMessageMyWall, loginUser, messageMyWall, match, loginUserAction, usersTest, dataCheck, dataMyWall, setCallMessage, callMessage} = props;
    let message = React.createRef();
    let currentDialogId = match.params.id;
    // if (currentDialogId !== loginUser && !!usersTest[currentDialogId]) {
    //     loginUserAction(currentDialogId);
    // }
    let now = new Date();
    function blur() {
        if (!callMessage) {
            offTextarea()
        }
    }
    return (
        <div className="profile">
            <div className='scroll'>
                <img className="imgProfile" src={imgProfile}/>
                <div className="profileUsers">
                    <div className='information-editing'>
                        <img className="avatar"
                             src={props.information.photos ? props.information.photos.small : missingAvatar}/>
                        <div className='button-information-editing'>
                            <NavLink className='link' to={`/vk.com/information/editing/id9`} activeClassName="">
                                <div className='button-editing-profile'>Редактирование</div>
                            </NavLink>
                        </div>
                    </div>
                    <div className="informationUsers">
                        <div className='name-lastName-status-block'>
                            <span className='name-lastName'>{props.information.fullName}</span>
                            <div className="status-user" onDoubleClick={() => {
                                flagStatusAction();
                            }}>Status: <div className="status-current-user"
                                                                      >{flagStatus ? <span>{statusUsers}</span> :
                                <div><input ref={message} autoFocus defaultValue={statusUsers}/>
                                    <button onClick={() => {
                                        props.putStatusAction(message.current.value);
                                        flagStatusAction()
                                    }}>s
                                    </button>
                                </div>}</div></div>
                        </div>
                        <span>Birthday: {currentUser.birthday}</span>
                        <span>City: {currentUser.city}</span>
                        <span>Education: {currentUser.education}</span>
                        <div className='information-click' onClick={props.toggleFunc}>Подробная информация</div>
                        {props.toggle ? <div><span>Contacts: <div className='contact-profile'>
                            {Object.keys(props.information.contacts).map(key => {
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
                        {props.toggle ? <div><span>AboutMe: <div className='contact-profile'>
                            {props.information.aboutMe?props.information.aboutMe:''}
                        </div>
                        </span>
                        </div> : ''}
                    </div>
                </div>
                <div className="buttonAllUsers">
                    <h2>My notes</h2>
                    <div className='textareaAndButton'>
                        {flags ?
                            <div className='avatarAndTextarea'>
                                <div className='avatarPushMyPost'>
                                    <img className="avatarMyPost"
                                         src={props.information.photos ? props.information.photos.small : currentUser.photo}/>
                                </div>
                                <div onClick={() => onTextarea()}>
                                    <TextareaAutosize className='textarea-my-post-close' placeholder='что нового?'/>
                                </div>
                                <div className='block-icon-my-wall-active'>
                                    <MdPhotoCamera className='icon-my-post'/>
                                    <MdMusicNote className='icon-my-post'/>
                                    <MdTheaters className='icon-my-post'/>
                                </div>
                            </div> : <div onBlur={blur}>
                                <div className='avatarAndTextarea'>
                                    <div className='avatarPushMyPost'>
                                        <img className="avatarMyPost"
                                             src={props.information.photos ? props.information.photos.small : currentUser.photo}/>
                                    </div>
                                    <TextareaAutosize autoFocus className='textarea-my-post' placeholder='что нового?'
                                                      value={callMessage}
                                                      onChange={(e) => {
                                                          setCallMessage(e.target.value)
                                                      }}/>
                                    <div className=''>
                                        <div className='smile'>
                                            <EmojiMartPicker style={{position: 'absolute', bottom: '0px', right: '0px'}}
                                                             className='smileEE' set="emojione" onChange={(e) => {
                                                props.addSmile(e.native)
                                            }}><MdTagFaces onClick={() => alert('asdada')}
                                                           className='icon-my-post'/></EmojiMartPicker>
                                        </div>
                                    </div>
                                </div>
                                <div className='myPostActive'>
                                    <div className='block-icon-my-wall'>
                                        <MdPhotoCamera className='icon-my-post'/>
                                        <MdMusicNote className='icon-my-post'/>
                                        <MdTheaters className='icon-my-post'/>
                                    </div>
                                    <div className='block-button-my-wall'>
                                        <button className='buttonPushMyPost' onClick={() => {
                                            addMessageMyWall(callMessage, now.getDate(), now.getMonth(), now.getHours(), now.getMinutes());
                                            setCallMessage('');
                                        }}>send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='allPostAndOnePost'>
                    <div className='notActive active'>
                        Все записи
                    </div>
                    <div className='notActive'>
                        Мои записи
                    </div>
                </div>
                <div className="massageAllUsers">
                    {messageMyWall.map((el, index) => (
                        <div className="massages">
                            <div className='avatarDataName'>
                                <img className="avatarMassage"
                                     src={props.information.photos ? props.information.photos.small : currentUser.photo}/>
                                <div className='dataName'>
                                    <span className='nameUserPost'>{currentUser.name} {currentUser.lastName}</span>
                                    <span
                                        className='data'>{dataMyWall.date[index]} {dataCheck[dataMyWall.month[index]]} в {dataMyWall.hours[index]}:{dataMyWall.minutes[index]}
                                </span>
                                </div>
                            </div>
                            <div className='textPostMyWall'>
                                <span>{el}</span>
                            </div>
                            <div className='iconItsMyPost'>
                                <MdFavoriteBorder className='icon-lick'/>
                                <MdChatBubbleOutline className='icon-comments'/>
                                <TiExportOutline className='icon-repost'/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
let mapStateToProps = (state) => {
    return {
        currentUser: state.checkUserLogin.informationUsers[state.loginId.id],
        loginUser: state.loginId.id,
        messageMyWall: state.addMessageMyWall.informationUsers.myWall,
        usersTest: state.checkUserLogin.informationUsers,
        dataCheck: state.dataCheck.data,
        dataMyWall: state.addMessageMyWall.informationUsers.data,
        callMessage: state.callMessage.message,
        flags: state.addMessageMyWall.flags,
        idUsers: state.users.id,
        statusUsers: state.users.status,
        flagStatus: state.users.flagStatus,
        information: state.users.information,
        status: state.status.status,
        toggle: state.users.toggle
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        addMessageMyWall: (message, date, month, hours, minutes) => {
            dispatch(addMessageMyWallAction(message, date, month, hours, minutes))
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
        flagStatusAction: () => {
            dispatch(flagStatusAction())
        },
        putStatusAction: (status) => {
            dispatch(putStatusAction(status))
        },
        toggleFunc() {
            dispatch(toggle())
        }
    }
};


export default ProfileHoc(withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile)));
