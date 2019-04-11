import React from 'react';
import {MdSearch} from "react-icons/md/index";
import {IoIosAdd} from "react-icons/io/index";
import './SearchStayle.css'


const Search = () => {
    return (
            <div className="search">
                <MdSearch className='icon-search'/>
                <input className='input-search'/>
                <IoIosAdd className='icon-add'/>
        </div>)

};

export default Search