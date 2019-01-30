import React from 'react';

import appStore from './assets/app-store.svg';
import facebook from './assets/facebook-white.svg';
import instagram from './assets/instagram-white.svg';
import twitter from './assets/twitter-white.svg';
import windowsStore from './assets/windows-store.svg';
import playStore from './assets/play-store.svg';

import {Link} from 'react-router-dom';

const Footer = (() => {

    return (

        <footer>
            <nav id="footer-links">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/#">Terms and Conditions</Link></li>
                    <li><Link to="/#">Privacy Policy</Link></li>
                    <li><Link to="/#">Collection Statement</Link></li>
                    <li><Link to="/#">Help</Link></li>
                    <li><Link to="/#">Manage Account</Link></li>
                </ul>
            </nav>
            <div id="copyright">
                <small>Copyright &copy; 2016 DEMO Streaming. All Rights Reserved</small>
            </div>
            <nav id="footer-social-links">
                <ul id="social">
                    <li><a href="/#"><img src={facebook} className="social" alt="" /></a></li>
                    <li><a href="/#"><img src={twitter} className="social" alt="" /></a></li>
                    <li><a href="/#"><img src={instagram} className="social" alt="" /></a></li>
                </ul>
                <ul id="store">
                    <li><a href="/#"><img src={appStore} className="store" alt="" /></a></li>
                    <li><a href="/#"><img src={playStore} className="store" alt="" /></a></li>
                    <li><a href="/#"><img src={windowsStore} className="store" alt="" /></a></li>
                </ul>
            </nav>

        </footer>

    );


});

export default Footer;