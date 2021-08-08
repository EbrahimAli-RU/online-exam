import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faUser, faHome, faBook} from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    return (
        <div className='sidebar__container'>
            <h1 className='sidebar__title'>Exam</h1>
            <ul className='sidebar__list'>
                <Link to='/' >
                    <li className='sidebar__list__item'> 
                        <FontAwesomeIcon className='sidebar__icon__position' icon={faHome} /> Overview
                    </li>
                </Link>
                <Link to='/course' >
                    <li className='sidebar__list__item'> 
                        <FontAwesomeIcon className='sidebar__icon__position' icon={faBook} /> Course
                    </li>
                </Link>
                <Link to='/' >
                    <li className='sidebar__list__item'>
                        <FontAwesomeIcon className='sidebar__icon__position' icon={faUser} /> Students
                    </li>
                </Link>
                <Link to='/' >
                    <li className='sidebar__list__item'>
                        <FontAwesomeIcon className='sidebar__icon__position' icon={faSignInAlt} />  Logout
                    </li>
                </Link>
            </ul>
        </div>
    );
};

export default Sidebar;