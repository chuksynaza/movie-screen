import React from 'react';

import { Link } from 'react-router-dom';

const Header = (() => {

    return (

        <header>

            <nav>
                <h1>
                    <Link to="/">DEMO Streaming</Link>
                </h1>
                <ul>
                    <li>
                        <a href="/#">Login</a>
                    </li>
                    <li>
                        <a href="/#" className="button">Start your free trial</a>
                    </li>
                </ul>
            </nav>

        </header>

    );

});

export default Header;