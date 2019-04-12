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
        initialValues: {
            aboutMe: state.users.information.aboutMe
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'Information'
})(InformationForm));