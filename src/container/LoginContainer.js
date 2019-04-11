// import {LoginAuth} from "../component/authReducer";
// import {falseErrorAction, loginAction} from "../component/loginIdReducer";
// import {connect} from "react-redux";
// import Login from "../props/Login";
//
// let mapStateToProps = (state) => {
//     return {
//         loginUser: state.loginId.id,
//         currentUser: state.checkUserLogin.informationUsers[state.loginId.id],
//         location: state.loginId.location,
//         checkUsers: state.checkUserLogin.informationUsers,
//         checkError: state.loginId.error,
//         loading: state.auth.isLoggedIn,
//         // status: state.loginId.status,
//         message: state.loginId.message,
//         isAuth: state.auth.isAuth,
//         captcha: state.loginId.captcha
//
//
//     }
// };
// let mapDispatchToProps = (dispatch) => {
//     return {
//         loginUserAction(l,p,rm,c) {
//             dispatch(loginAction(l,p,rm,c))
//         },
//         ErrorUser() {
//             dispatch(falseErrorAction())
//         },
//         submitButtonClick(id) {
//             dispatch(LoginAuth(id))
//         }
//     }
// };
//
// connect(mapStateToProps, mapDispatchToProps)(Login);
// import React from 'react';
// import './ProfileStyle.css';
// import imgProfile from '../img/profile.jpg';
// import {connect} from "react-redux";
// import {
//     addMessageMyWallAction,
//     offTextareaBox,
//     onTextareaBox
// } from "../component/addMessageMyWallReducer";
// import withRouter from "react-router-dom/es/withRouter";
// import {loginAction, usersAction} from "../component/loginIdReducer";
// import {addSmileAction, messageCallAction} from "../component/messageCallReduser";
// import TextareaAutosize from 'react-textarea-autosize';
// import {
//     MdChatBubbleOutline,
//     MdFavoriteBorder,
//     MdMusicNote,
//     MdPhotoCamera,
//     MdReply, MdTagFaces,
//     MdTheaters
// } from "react-icons/md/index";
// import {TiExportOutline} from "react-icons/ti/index";
// import EmojiPicker from 'emoji-picker-react';
// import {Emoji} from "emoji-mart";
// import EmojiMartPicker from "emoji-mart-picker";
// import {
//     authMeAction,
//     flagStatusAction, getInformationUser,
//     getStatusAction, Mp3, profile,
//     putStatusAction, setInformationUser,
//     statusAction
// } from "../component/usersReduser";
// import Loading from "./Loading";
// import {statuses} from "../component/statusReducer";
// import ProfileHoc from "./ProfileHoc";
//
//
// const Profile = (props) => {
//     let {flagStatusAction, flagStatus, statusUsers, idUsers, flags, onTextarea, offTextarea, currentUser, addMessageMyWall, loginUser, messageMyWall, match, loginUserAction, usersTest, dataCheck, dataMyWall, setCallMessage, callMessage} = props;
//     let message = React.createRef();
//     let currentDialogId = match.params.id;
//     if (currentDialogId !== loginUser && !!usersTest[currentDialogId]) {
//         loginUserAction(currentDialogId);
//     }
//     let now = new Date();
//     // alert( `${now.getHours()} ${now.getMinutes()} ${now.getSeconds()}` );
//     function blur() {
//         debugger
//         if (!callMessage) {
//             offTextarea()
//         }
//     }
//     class ProfileSS extends React.Component {
//         constructor(props) {
//             super(props);
//             console.log(props);
//             debugger;
//             this.state = {
//                 isAnswerServer: props.isAnswerServer,
//                 loginCheck: props.loginCheck
//             }
//         }
//
//         componentWillMount() {
//             this.props.getInformationUser();
//
//         }
//
//         shouldComponentUpdate() {
//
//         }
//
//         componentWillUpdate() {
//             alert('adffa')
//             debugger
//             if (!this.state.loginCheck) {
//                 this.setState({isAnswerServer: false})
//             }
//         }
//         render() {
//             return (
//                 <div className="profile" onClick={() => {
//                     if (!flags) {
//                         // offTextarea()
//                     }
//                 }}>
//                     <div className='scroll'>
//                         <img className="imgProfile" src={imgProfile}/>
//                         <div className="profileUsers">
//                             <img className="avatar" src={currentUser.photo}/>
//                             <div className="informationUsers">
//                                 <span className='name-lastName'>{currentUser.name} {currentUser.lastName}</span>
//                                 <div className="status-user">Status: <div className="status-current-user" onDoubleClick={() => {
//                                     flagStatusAction();
//                                 }}>{flagStatus ? <span>{statusUsers}</span> :
//                                     <div><input ref={message} autoFocus defaultValue={statusUsers}/>
//                                         <button onClick={() => {
//                                             props.putStatusAction(message.current.value);
//                                             flagStatusAction()
//                                         }}>s
//                                         </button>
//                                     </div>}</div></div>
//                                 <span>Birthday: {currentUser.birthday}</span>
//                                 <span>City: {currentUser.city}</span>
//                                 <span>Education: {currentUser.education}</span>
//                                 <span>Web-site: {currentUser.website}</span>
//                                 {Object.keys(props.information.contacts).map(key=><div>
//                                         <span>{key}:{console.log(props.information.contacts[key])}</span>
//                                     </div>
//                                 )}
//                                 <span>AboutMe: </span>
//                                 <span>Contacts: </span>
//                                 <span>Jobs: </span>
//                                 <span>looking For A Job Description: </span>
//                                 <button onClick={()=>props.setInformationUser()}>sdsds</button>
//                             </div>
//                         </div>
//                         <div className="buttonAllUsers">
//                             <h2>My notes</h2>
//                             {props.status === statuses.INPROGRESS ? <Loading/> : ''}
//                             {/*{<Emoji emoji=':smiling_imp:' set='emojione' size={32}/>}*/}
//                             <div className='textareaAndButton'>
//                                 {/*<textarea placeholder='что новго?' value={callMessage} onChange={(e)=>{setCallMessage(e.target.value)}} />*/}
//                                 {flags ?
//                                     <div className='avatarAndTextarea'>
//                                         <div className='avatarPushMyPost'>
//                                             <img className="avatarMyPost" src={currentUser.photo}/>
//                                         </div>
//                                         <div onClick={() => onTextarea()}>
//                                             <TextareaAutosize className='textarea-my-post-close' placeholder='что нового?'/>
//                                         </div>
//                                         <div className='block-icon-my-wall-active'>
//                                             <MdPhotoCamera className='icon-my-post'/>
//                                             <MdMusicNote className='icon-my-post'/>
//                                             <MdTheaters className='icon-my-post'/>
//                                         </div>
//                                     </div> : <div onBlur={blur}>
//                                         <div className='avatarAndTextarea'>
//                                             <div className='avatarPushMyPost'>
//                                                 <img className="avatarMyPost" src={currentUser.photo}/>
//                                             </div>
//                                             <TextareaAutosize autoFocus className='textarea-my-post' placeholder='что нового?'
//                                                               value={callMessage}
//                                                               onChange={(e) => {
//                                                                   setCallMessage(e.target.value)
//                                                               }}/>
//                                             <div className=''>
//                                                 <div className='smile'>
//                                                     <EmojiMartPicker style={{position: 'absolute', bottom: '0px', right: '0px'}}
//                                                                      className='smileEE' set="emojione" onChange={(e) => {
//                                                         props.addSmile(e.native)
//                                                     }}><MdTagFaces onClick={() => alert('asdada')}
//                                                                    className='icon-my-post'/></EmojiMartPicker>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='myPostActive'>
//                                             <div className='block-icon-my-wall'>
//                                                 <MdPhotoCamera className='icon-my-post'/>
//                                                 <MdMusicNote className='icon-my-post'/>
//                                                 <MdTheaters className='icon-my-post'/>
//                                             </div>
//                                             <div className='block-button-my-wall'>
//                                                 <button className='buttonPushMyPost' onClick={() => {
//                                                     addMessageMyWall(callMessage, loginUser, now.getDate(), now.getMonth(), now.getHours(), now.getMinutes());
//                                                     setCallMessage('');
//                                                 }}>send
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 }
//                             </div>
//                         </div>
//                         <div className='allPostAndOnePost'>
//                             <div className='notActive active'>
//                                 Все записи
//                             </div>
//                             <div className='notActive'>
//                                 Мои записи
//                             </div>
//                         </div>
//                         <div className="massageAllUsers">
//                             {messageMyWall.map((el, index) => (
//                                 <div className="massages">
//                                     <div className='avatarDataName'>
//                                         <img className="avatarMassage" src={currentUser.photo}/>
//                                         <div className='dataName'>
//                                             <span className='nameUserPost'>{currentUser.name} {currentUser.lastName}</span>
//                                             <span
//                                                 className='data'>{dataMyWall.date[index]} {dataCheck[dataMyWall.month[index]]} в {dataMyWall.hours[index]}:{dataMyWall.minutes[index]}
//                                 </span>
//                                         </div>
//                                     </div>
//                                     <div className='textPostMyWall'>
//                                         <span>{el}</span>
//                                     </div>
//                                     <div className='iconItsMyPost'>
//                                         <MdFavoriteBorder className='icon-lick'/>
//                                         <MdChatBubbleOutline className='icon-comments'/>
//                                         <TiExportOutline className='icon-repost'/>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             );}
//
//
//     }
//     return ProfileSS;
// };
// let mapStateToProps = (state) => {
//     return {
//         currentUser: state.checkUserLogin.informationUsers[state.loginId.id],
//         loginUser: state.loginId.id,
//         messageMyWall: state.addMessageMyWall.informationUsers[state.loginId.id].myWall,
//         usersTest: state.checkUserLogin.informationUsers,
//         dataCheck: state.dataCheck.data,
//         dataMyWall: state.addMessageMyWall.informationUsers[state.loginId.id].data,
//         callMessage: state.callMessage.message,
//         flags: state.addMessageMyWall.flags,
//         idUsers: state.users.id,
//         statusUsers: state.users.status,
//         flagStatus: state.users.flagStatus,
//         information: state.users.information,
//         status: state.status.status
//     }
// };
// let mapDispatchToProps = (dispatch) => {
//     return {
//         addMessageMyWall: (message, id, date, month, hours, minutes) => {
//             dispatch(addMessageMyWallAction(message, id, date, month, hours, minutes))
//         },
//         loginUserAction: (mas) => {
//             dispatch(loginAction(mas))
//         },
//         setCallMessage: (message) => {
//             dispatch(messageCallAction(message))
//         },
//         onTextarea: () => {
//             dispatch(onTextareaBox())
//         },
//         offTextarea: () => {
//             dispatch(offTextareaBox())
//         },
//         addSmile: (s) => {
//             dispatch(addSmileAction(s))
//         },
//         authMeAction: () => {
//             dispatch(authMeAction())
//         },
//         flagStatusAction: () => {
//             dispatch(flagStatusAction())
//         },
//         // statusAction:(status,id)=>{
//         //     dispatch(statusAction(status,id))
//         // },
//         putStatusAction: (status) => {
//             dispatch(putStatusAction(status))
//         },
//         getStatusAction: (id) => {
//             dispatch(getStatusAction(id))
//         },
//         getInformationUser(){
//             dispatch(getInformationUser())
//         },
//         setInformationUser(){
//             dispatch(setInformationUser())
//         }
//     }
// };
//
//
// export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile)));
