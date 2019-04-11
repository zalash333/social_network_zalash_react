import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {addMessageMyWallAction} from "../../reducer/addMessageMyWallReducer";
import { putInformationOfForm} from "../../reducer/usersReducer";
import './editingFormCss.css';
import {NavLink} from "react-router-dom";

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);
const FileInput = ({
                       input: { value: omitValue, onChange, onBlur, ...inputProps },
                       meta: omitMeta,
                       ...props
                   }) => {
    return (
        <input
            onChange={adaptFileEventToValue(onChange)}
            onBlur={adaptFileEventToValue(onBlur)}
            type="file"
            {...props.input}
            {...props}
        />
    );
};
export const PhotoForm = (props) => {
    const { handleSubmit } = props;
    const onFormSubmit = (data) => {
        console.log(data)
        props.putInformationOfForm(data);
    };
    return (
        <form className='form-container' onSubmit={handleSubmit(onFormSubmit)}>
            <div className='editing-form-img'>
                {props.photo?<NavLink className='link' to={`/vk.com/profile/id${props.id}`} activeClassName=""><img src={props.photo.small}/></NavLink>:''}
            </div>
            <div className='editing-form'>
                {/*<input onChange={fileEventToValue} type='file' id='asas'/>*/}
                <div className='name-editing-form'>Photo upload</div>
                <Field name="attachment" component={FileInput} type="file"/>
            </div>
            <button className='button-form' type="submit">Submit</button>
        </form>
    )
};
let mapStateToProps = (state) => {
    debugger
    return {
        currentUser: state.checkUserLogin.informationUsers[state.loginId.id],
        loginUser: state.loginId.id,
        messageMyWall: state.addMessageMyWall.informationUsers[state.loginId.id].myWall,
        information: state.users.information,
        toggleInformation: state.users.toggleInformation,
        initialValues: {
            facebook: state.users.information.contacts.facebook,
            github: state.users.information.contacts.github,
            instagram: state.users.information.contacts.instagram,
            mainLink: state.users.information.contacts.mainLink,
            twitter: state.users.information.contacts.twitter,
            vk: state.users.information.contacts.vk,
            website: state.users.information.contacts.website,
            youtube: state.users.information.contacts.youtube
        },
        photo: state.users.photo,
        id:state.users.id
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        addMessageMyWall: (message,id)=>{
            dispatch(addMessageMyWallAction(message, id))
        },
        putInformationOfForm: (e)=>{
            dispatch(putInformationOfForm(e))
        }
    }
};

export default reduxForm ({
    form: 'Photo'
})( connect(mapStateToProps,mapDispatchToProps)(PhotoForm));
