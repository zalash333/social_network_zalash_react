import React from 'react';
import {connect} from "react-redux";
import {addMessageMyWallAction} from "../../reducer/addMessageMyWallReducer";
import ContactsForm from "./ContactsForm";
import {load_a} from "../../reducer/usersReducer";
import SideBarEditing from "./SideBarEditing";
import PhotoForm from "./PhotoForm";
import InformationForm from "./InformationForm";

const InformationEditing = (props) => {
    let toggleComponent = (type) => {
        switch (type) {
            case 'CONTACTS':
                return <ContactsForm/>;
            case 'PHOTO':
                return <PhotoForm/>;
            case 'INFORMATION':
                return <InformationForm/>
        }
    };
    debugger
    return (
        <div className='container-dialog'>
            <div className="dialog">
                <div className="dialog-search">
                    {props.toggleInformation === 'CONTACTS' ? 'Контакты' : props.toggleInformation === 'PHOTO' ? 'Фото' : props.toggleInformation === 'INFORMATION' ? 'Информация' : ''}
                </div>
                {toggleComponent(props.toggleInformation)}
            </div>
            <SideBarEditing/>
        </div>
    );

};
let mapStateToProps = (state) => {
    return {
        currentUser: state.checkUserLogin.informationUsers[state.loginId.id],
        loginUser: state.loginId.id,
        messageMyWall: state.addMessageMyWall.informationUsers[state.loginId.id].myWall,
        information: state.users.information,
        toggleInformation: state.users.toggleInformation,
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        addMessageMyWall: (message, id) => {
            dispatch(addMessageMyWallAction(message, id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InformationEditing);
