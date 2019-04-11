import React from 'react';
import {NavLink} from "react-router-dom";
import {addMessageMyWallAction} from "../../reducer/addMessageMyWallReducer";
import {load_a, toggleInformation} from "../../reducer/usersReducer";
import {connect} from "react-redux";

let SideBarEditing = (props)=>{

    return (<div className='block-checked-messages'>
        <span className={props.toggleInformationState==='CONTACTS'?'text-all-massage':'text-in-massage'} onClick={()=>props.toggleInformation('CONTACTS')}>Контакты</span>
        <span className={props.toggleInformationState==='PHOTO'?'text-all-massage':'text-in-massage'} onClick={()=>props.toggleInformation('PHOTO')}>Фото</span>
        <span className={props.toggleInformationState==='INFORMATION'?'text-all-massage':'text-in-massage'} onClick={()=>props.toggleInformation('INFORMATION')}>Информация</span>
    </div>)
};
let mapStateToProps = (state) => {
    return {
        toggleInformationState: state.users.toggleInformation
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        toggleInformation: (Information)=>{
            dispatch(toggleInformation(Information))
        }
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(SideBarEditing)