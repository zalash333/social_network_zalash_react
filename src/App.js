import React from 'react';
import ProfilePage from "./component/ProfilePage";
import {Route} from "react-router-dom";
import Login from "./component/login/Login";
import './App.css'

const App = (props) => {
    return (
        <div className='app'>
            <Route path='/' component={Login} exact/>
            <Route path='/vk.com' render={()=><ProfilePage pprops={props.pprops}/>}/>
        </div>
    );
};


export default App;
