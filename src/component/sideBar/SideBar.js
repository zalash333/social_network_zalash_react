import React from 'react';
import './sideBarStyle.css'
import {Link, NavLink, withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {MdAssignment, MdForum, MdHome, MdLibraryMusic, MdPerson} from "react-icons/md/index";
import {GoGear} from "react-icons/go/index";
import {usersAction} from "../../reducer/usersReducer";
import {getDialogs} from "../../reducer/setDialogIdReducer";

const SideBar = (props) => {
    let {id} = props;
    return (
        <div className="sideBar">
            <div className="spanElement">
                <NavLink className='link' to={`/vk.com/profile/id${id}`} activeClassName="">
                    <div className='sideBar-menu-el'>
                        <MdHome className='icon-side-bar'/>
                        <span className='name-side-bar'>
                   Профиль
                </span></div>
                </NavLink>
                <NavLink className='link' to={`/vk.com/dialogs/id${id}`} activeClassName="">
                    <div className='sideBar-menu-el'>
                        <MdForum className='icon-side-bar'/>
                        <span className='name-side-bar'>
                    Сообщения
                </span>
                    </div>
                </NavLink>
                <NavLink className='link' to={`/vk.com/friends/id${id}`}  activeClassName="">
                    <div className='sideBar-menu-el'>
                        <MdPerson className='icon-side-bar'/>
                        <span className='name-side-bar'>
                    Друзья
                </span>
                    </div>
                </NavLink>
                <NavLink className='link' to={`/vk.com/news/id${id}`} activeClassName="">
                    <div className='sideBar-menu-el'>
                        <MdAssignment className='icon-side-bar'/>
                        <span className='name-side-bar'>
                   Новости
                </span>
                    </div>
                </NavLink>
                <NavLink className='link' to="/vk.com/music" activeClassName="">
                    <div className='sideBar-menu-el'>
                        <MdLibraryMusic className='icon-side-bar'/>
                        <span className='name-side-bar'>
                    Музыка
                </span>
                    </div>
                </NavLink>
                <div className='block-br'>

                </div>
                <NavLink className='link' to={`/vk.com/settings/id${id}`} activeClassName="">
                    <div className='sideBar-menu-el'>
                        <GoGear className='icon-side-bar'/>
                        <span className='name-side-bar'>
                        Настройки
                    </span>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

let mapStateToProps = (state) => {
    return {
        loginUser: state.loginId.id,
        id:state.users.id,
        currentMessageUser: state.setDialogId.currentMessageUser,

    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        usersAction(a) {
            dispatch(usersAction(a))
        },
        getDialogs() {
            dispatch(getDialogs())
        },
    }
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SideBar));
