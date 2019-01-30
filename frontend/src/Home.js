import React from 'react';
import { Link } from "react-router-dom";

import placeholder from './assets/placeholder.png';

const Home = (() => {

    return (

        <section>
            <header>
                <h2>Popular Titles</h2>
            </header>
            <div className="container">

                <div className="movie-banner">
                    <Link to="/series">
                        <div className="movie-banner-image">
                            <img src={placeholder} alt="" />
                            <p> Series </p>
                        </div>
                    </Link>
                    <span>Popular Series</span>
                </div>


                <div className="movie-banner">

                    <Link to="/movies">
                        <div className="movie-banner-image">
                            <img src={placeholder} alt="" />
                            <p> Movies </p>
                        </div>
                    </Link>
                    <span>Popular Movies</span>
                </div>

            </div>
        </section>

    );

});

export default Home;