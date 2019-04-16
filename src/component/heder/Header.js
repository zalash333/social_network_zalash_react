import React from 'react';
import Img from "../../img/logo.png"
import "./HeaderStyle.css";
import {Link, NavLink, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {setIsAuth} from "../../reducer/authReducer";
import {authLogout, authMeAction, getStatusAction} from "../../reducer/usersReducer";
import {MdSearch} from "react-icons/md/index";
import HeaderHoc from "./HeaderHoc";
import missingAvatar from '../../img/missingAvatar.jpg';


let Header = (props) => {
    let {currentUser, loginBack, authMeAction, loginUser,idUsers,statusUsers} = props;
    return (
        <div className="header">
            {/*{!statusUsers&&idUsers?props.getStatusAction(idUsers):''}*/}
            <div>
                <img className="imgLogo" src={Img}/>
            </div>
            <div className="search-header">
                <MdSearch className='icon-header-search'/>
                <textarea placeholder='Поиск' wrap='off' className='search-text-area'/>
            </div>
            <Link className='nameLogo' to={''} onClick={props.authLogout}>
                <div className="userAuthorized" >
                    {/*{loginBack(false)}*/}
                    <span className="nameUser">{currentUser.name}</span>
                    <img className="imgLogoAction" src={props.information.photos ? props.information.photos.small : missingAvatar}/>
                </div>
            </Link>
        </div>
    );
};

let mapDispatchToProps = (dispatch) => {
    return {
        loginBack: (mas) => {
            dispatch(setIsAuth(mas))
        },
        authMeAction:()=>{
            dispatch(authMeAction())
        },
        getStatusAction:(id)=>{
            dispatch(getStatusAction(id))
        },
        authLogout(){
            dispatch(authLogout())
        }
    }
};
let mapStateToProps = (state) => {
    return {
        loginUser: state.loginId.id,
        currentUser: state.checkUserLogin.informationUsers[state.loginId.id],
        idUsers: state.users.id,
        statusUsers: state.users.status,
        loginCheck: state.users.loginCheck,
        isAnswerServer: state.users.isAnswerServer,
        status: state.status.status,
        information: state.users.information,
    }
};
export default HeaderHoc(withRouter(connect(mapStateToProps, mapDispatchToProps)(Header)));
