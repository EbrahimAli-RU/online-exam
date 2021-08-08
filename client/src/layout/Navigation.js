import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt} from '@fortawesome/free-solid-svg-icons'

const Navigation = () => {
    return (
        <div className='nav__container'>
            <Link to='/' >
                <FontAwesomeIcon className='' icon={faSignInAlt} />  Logout
            </Link>
        </div>
    );
};

export default Navigation;