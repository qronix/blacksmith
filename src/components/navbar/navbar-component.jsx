import React from 'react';

import { Link } from 'react-router-dom';

import './navbar.styles.scss';

import { withAuthentication, UserContext } from '../session';
// import UserContext from '../../providers/session/session.provider';

const Navbar = () => {
    return(
        <UserContext.Consumer>
            {
               (user=>{
                    return (
                    <div className='navbar'>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/game'>Play</Link>
                            </li>
                            { user 
                                ? (
                                    <li>
                                        <Link to='/logout'>Logout</Link>
                                    </li>
                                 )
                                : (
                                    <li>
                                        <Link to='/login'>Login</Link>
                                    </li>
                                )
                            }
                        </ul>
                    </nav>
                </div>
                )
               }) 
            }
        </UserContext.Consumer>
        // <div className='navbar'>
        //     <nav>
        //         <ul>
        //             <li>
        //                 <Link to='/'>Home</Link>
        //             </li>
        //             <li>
        //                 <Link to='/login'>Login</Link>
        //             </li>
        //         </ul>
        //     </nav>
        // </div>
    );
}


export default withAuthentication(Navbar);