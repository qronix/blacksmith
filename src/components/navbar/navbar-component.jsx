import React from 'react';

import { Link } from 'react-router-dom';

import './navbar.styles.scss';


const Navbar = () => {
    return(
        <div className='navbar'>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}


export default Navbar;