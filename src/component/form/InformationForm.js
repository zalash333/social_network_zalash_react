import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import './editingFormCss.css';
import {addMessageMyWallAction} from "../../reducer/addMessageMyWallReducer";
import {contactsFormAction, putInformationOfForm} from "../../reducer/usersReducer";

class InformationForm extends React.Component {
    constructor(props) {
        super(props)
        debugger
    }
    render() {
        return (
            <form className='form-container' onSubmit={this.props.handleSubmit(this.props.putInformationOfForm)}>
                <div className='editing-form'>
                    <div className='name-editing-form'>aboutMe:</div>
                    <Field
                        className='input-form'
                        name='aboutMe'
                        component="input"
                        type="text"
                        placeholder='aboutMe'
                    /></div>
                <button className='button-form' type="submit">Submit</button>
            </form>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currentUser: state.checkUserLogin.informationUsers[state.loginId.id],
        loginUser: state.loginId.id,
        messageMyWall: state.addMessageMyWall.informationUsers[state.loginId.id].myWall,
        information: state.users.information,
        toggleInformation: state.users.toggleInformation,
        initialValues: {
            aboutMe: state.users.information.aboutMe
        }
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        addMessageMyWall: (message,id)=>{
            dispatch(addMessageMyWallAction(message, id))
        },
        putInformationOfForm: (e)=>{
            dispatch(putInformationOfForm(e))
        },
        contactsFormAction: (e)=>{
            dispatch(contactsFormAction(e))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'Information'
})(InformationForm));