import React from 'react';
import "./MassageStyle.css"
import {connect} from "react-redux";
import withRouter from "react-router-dom/es/withRouter";
import {MdAttachFile, MdTagFaces} from "react-icons/md/index";
import {FiCamera} from "react-icons/fi/index";
import {addMessageAction} from "../../reducer/addMessageReducer";
import {dialogIdAction, getMessages, sendMessage} from "../../reducer/setDialogIdReducer";
import {loginAction} from "../../reducer/loginIdReducer";
import MassageHoc from "./MassageHoc";
import missingAvatar from '../../img/missingAvatar.jpg';

let Massage = (props) => {
    let message = React.createRef();
    let {massagePage, currentUser, dialogId,match, setDialogIdAction, usersTest,} = props;
    let currentUserId = match.params.id;
    let currentDialogId = match.params.userId;
    if (currentDialogId !== dialogId && !!usersTest[currentUserId]) {
        setDialogIdAction(currentDialogId);
    }
    return (
        <div className='block-vr'>
            <div className="massageStyle">
                <div className="dialog-name">
                    <h2 className='dialog-name-style'>{props.currentUserMessage.fullName}</h2>
                </div>
                <div className="massageBlock">
                    <div className="massageYou1" ref={(scroller) => {
                        window.scroller = scroller
                    }} onScroll={() => {
                    }}>
                        {console.log(props.currentUserMessage)}
                        {!props.currentMessageUser?props.getMessages(currentDialogId):props.currentMessageUser.map((el, i) => {
                            setTimeout(() => {
                                window.scroller.scrollTop = window.scroller.scrollHeight;
                            }, 0);
                            if (props.currentMessageUser[i].senderId !== props.id) {
                                return (<div className="massageYou">
                                    <img src={props.currentUserMessage.photos.small?props.currentUserMessage.photos.small:missingAvatar}/>
                                    <span>{el.body}</span>
                                </div>)
                            } else {
                                return (<div className="massageItsMe">
                                    <img src={currentUser.photo}/>
                                    <span>{el.body}</span>
                                </div>)
                            }

                        })}
                    </div>
                </div>
                <div className="inputBar">
                    <div className='hover-icon'>
                        <MdAttachFile className='icon-attach-file'/>
                    </div>
                    <div className='div-and-input'>
                        <input placeholder='напишите сообщение' className='input-message' ref={message}/>
                        <div className='hover-icon'>
                            <FiCamera className='icon-fi-camera'/>
                        </div>
                        <div className='hover-icon'>
                            <MdTagFaces className='icon-my-smile'/>
                        </div>
                    </div>
                    <button className='button-click-message' onClick={() => {
                        props.sendMessage(currentDialogId,message.current.value);
                        message.current.value = '';
                    }}>send
                    </button>
                </div>
            </div>
            <div className='show-box'>

            </div>
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        currentUser: state.checkUserLogin.informationUsers[state.loginId.id],
        dialogsPage: state.dialogsPage.dialogsPage,
        massagePage: state.dialogsPage.massagePage,
        dialogId: state.setDialogId.dialogsId,
        messageTarget: state.addMessage,
        usersTest: state.checkUserLogin.informationUsers,
        currentMessageUser: state.setDialogId.currentMessageUser,
        id:state.users.id,
        informationUsers: state.setDialogId.informationUsers,
        currentUserMessage: state.setDialogId.currentUser,
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (message, id) => {
            dispatch(addMessageAction(message, id))
        },
        setDialogIdAction: (mas) => {
            dispatch(dialogIdAction(mas))
        },
        loginUserAction: (mas) => {
            dispatch(loginAction(mas))
        },
        getMessages(e){
            dispatch(getMessages(e))
        },
        sendMessage(id,body){
            dispatch(sendMessage(id,body))
        }
    }
};

export default MassageHoc(withRouter(connect(mapStateToProps, mapDispatchToProps)(Massage)));