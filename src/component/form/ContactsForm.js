import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import { putInformationOfForm} from "../../reducer/usersReducer";
import './editingFormCss.css';

class ContactsForm extends React.Component{
    constructor(props){
        super(props);
        debugger
    }
    render(){
        return (
            <form className='form-container' onSubmit={this.props.handleSubmit(this.props.putInformationOfForm)}>
                {Object.keys(this.props.information.contacts).map(key => <div className='editing-form'>
                    <div className='name-editing-form'>{key}:</div> <Field
                        className='input-form'
                        name={key}
                        component="input"
                        type="text"
                        placeholder={key}
                    />
                    </div>
                )}
                <button className='button-form' type="submit" >Submit</button>
            </form>
        )
    }
}
let mapStateToProps = (state) => {
    debugger
    return {
        information: state.users.information,
        initialValues: {
            facebook: state.users.information.contacts.facebook,
            github: state.users.information.contacts.github,
            instagram: state.users.information.contacts.instagram,
            mainLink: state.users.information.contacts.mainLink,
            twitter: state.users.information.contacts.twitter,
            vk: state.users.information.contacts.vk,
            website: state.users.information.contacts.website,
            youtube: state.users.information.contacts.youtube
        }
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        putInformationOfForm: (e)=>{
            dispatch(putInformationOfForm(e))
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps) (reduxForm ({
    form: 'Contacts'
}) (ContactsForm));