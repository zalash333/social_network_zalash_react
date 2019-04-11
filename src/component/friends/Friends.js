import React from 'react';
import {connect} from "react-redux";
import {usersAction} from "../../reducer/usersReducer";
import missingAvatar from '../../img/missingAvatar.jpg';
import './FriendsStyle.css'
import {MdMailOutline} from "react-icons/md/index";
import {NavLink} from "react-router-dom";
import {getInformationFriends} from "../../reducer/followngReducer";
import FriendsHoc from "./FriendsHoc";
import InfiniteScroll from "react-infinite-scroll-component";
import Search from "../search/Search";

const Friends = (props) => {
    debugger
    return (
        <div className='friends'>
            <div className="friends-container">
                <Search/>
                <InfiniteScroll
                    dataLength={props.users.length}
                    loader={<h4>Loading...</h4>}
                    next={()=>props.usersAction(1)}
                    hasMore={true}
                >
                    {
                        props.users.map((el, i) => {
                            return (
                                <div className='friends-all-users'>
                                    <NavLink onClick={() => props.getInformationFriends(el.id)} className='link'
                                             to={`/vk.com/profile/users/id${el.id}`} activeClassName="">
                                        <img className='photo-all-users'
                                             src={el.photos.small === null ? missingAvatar : el.photos.small}/>
                                    </NavLink>
                                    <div className='friends-span'>
                                        <NavLink onClick={() => props.getInformationFriends(el.id)} className='link'
                                                 to={`/vk.com/profile/users/id${el.id}`}
                                                 activeClassName="">
                                            <span className='name-friends-all-users'>{el.name}</span>
                                        </NavLink>
                                        <span
                                            className='friends-status'>{el.status === null ? 'no status' : el.status}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </InfiniteScroll>
            </div>
            <div className='block-checked-messages'><span className='text-all-massage'>Все сообщения<MdMailOutline
                className='icon-in'/></span>
                <span className='text-in-massage'>Непрочитанные</span>
            </div>
        </div>
    );
};
let mapStateToProps = (state) => {
    return {
        users: state.users.users,
        page: state.users.page,
        status: state.status.status,
        totalCount: state.status.totalCount
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        usersAction(a) {
            dispatch(usersAction(a))
        },
        getInformationFriends(id) {
            dispatch(getInformationFriends(id))
        }
    }
};
export default FriendsHoc(connect(mapStateToProps, mapDispatchToProps)(Friends));