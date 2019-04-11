import Header from "../heder/Header";
import React from "react";
import SideBar from "../sideBar/SideBar";
import Dialogs from "./Dialogs";

const DialogsPage = () => {
    return (

            <div className='content-wrapper'>
                <div className='sidebar-block'>
                    {/*<SideBar/>*/}
                </div>
                <div className='content'>
                    <Dialogs/>
                </div>
            </div>
    );
};
export default DialogsPage;