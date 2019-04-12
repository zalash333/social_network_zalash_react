import React from 'react';
import {connect} from "react-redux";
import {addMessageMyWallAction} from "../../reducer/addMessageMyWallReducer";
import {MdMailOutline, MdSearch} from "react-icons/md/index";
import {IoIosAdd} from "react-icons/io/index";
import Search from "../search/Search";

const News = (props) => {
    let message = React.createRef();
    return (
        <div className='container-dialog'>
            <div className="dialog">
                <Search/>
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
        currentUser: state.checkUserLogin.informationUsers[state.loginId.id],
        loginUser: state.loginId.id,
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        addMessageMyWall: (message, id) => {
            dispatch(addMessageMyWallAction(message, id))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(News);
