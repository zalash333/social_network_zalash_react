import React from 'react';
import './LoginStyle.css'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {ErrorAction, falseErrorAction, loginAction} from "../../reducer/loginIdReducer";
import {LoginAuth} from "../../reducer/authReducer";

const Login = (props) => {
    const {currentUser, loginUser, checkUsers, ErrorUser, checkError, submitButtonClick, loading} = props;
    let loginRef = React.createRef();
    let passwordRef = React.createRef();
    let checkboxRef = React.createRef();
    let captchaRef = React.createRef();
    if (!props.isAuth) {
        return (<div className='LoginStyle'>
            <div className='loginPut'>
                <h2>Hi, please set id</h2>
                <textarea defaultValue='zalash1993@gmail.com' disabled={loading} placeholder={checkError ? 'error' : 'login'}
                          className={checkError ? 'error' : ''} ref={loginRef} onClick={() => {
                    loginRef.current.value = '';
                    ErrorUser()
                }}/>
                <textarea defaultValue='12345678' disabled={loading} placeholder={checkError ? 'error' : 'password'}
                          className={checkError ? 'error' : ''} ref={passwordRef} onClick={() => {
                    passwordRef.current.value = '';
                    ErrorUser()
                }}/>
                <br/>
                {props.captcha?<div><img src={props.captcha}/><br/><textarea ref={captchaRef} placeholder='please set captcha'/></div>:''}
                <br/>
                <input type='checkbox' ref={checkboxRef}/>
                <button disabled={loading} onClick={() => {
                    if (!checkUsers[loginRef.current.value]) {
                        if (!props.captcha) {
                            submitButtonClick(loginAction(loginRef.current.value, passwordRef.current.value, checkboxRef.current.checkId));
                        } else {
                            submitButtonClick(loginAction(loginRef.current.value, passwordRef.current.value, checkboxRef.current.checkId, captchaRef.current.value));
                        }
                        loginRef.current.value = '';
                        passwordRef.current.value=''
                    } else {
                        submitButtonClick(ErrorAction());
                        loginRef.current.value = ''
                    }
                }}>{loading ? 'LOADING' : 'LOGIN'}
                </button>

            </div>
            {props.message}
            {loading ? (
                <img className='loading' src='https://loading.io/spinners/dual-ring/lg.dual-ring-loader.gif'/>) : ''}
        </div>)
    } else {
        return (
            <div className='LoginStyle'>
                <div className='loginDiv'>
                    <span>{currentUser.name}</span>
                    <Link to={'/vk.com/profile/id' + loginUser}>
                        <span><img src={currentUser.photo}/></span>
                    </Link>
                    <span>welcome my friends</span>
                </div>
            </div>)
    }
};

let mapStateToProps = (state) => {
    return {
        loginUser: state.loginId.id,
        currentUser: state.checkUserLogin.informationUsers[state.loginId.id],
        location: state.loginId.location,
        checkUsers: state.checkUserLogin.informationUsers,
        checkError: state.loginId.error,
        loading: state.auth.isLoggedIn,
        // status: state.loginId.status,
        message: state.loginId.message,
        isAuth: state.auth.isAuth,
        captcha: state.loginId.captcha


    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        loginUserAction(l,p,rm,c) {
            dispatch(loginAction(l,p,rm,c))
        },
        ErrorUser() {
            dispatch(falseErrorAction())
        },
        submitButtonClick(id) {
            dispatch(LoginAuth(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);