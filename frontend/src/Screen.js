import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSync, faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

import SortIcon from './SortIcon';

library.add(faSync, faArrowCircleLeft, faArrowCircleRight);


class Screen extends Component {

    constructor(props) {

        super(props);

        this.state = {

            screens: [],
            screenStatus: 'loading',
            sort: {},
            releaseYear: 'all',
            limit: 20,
            currentPage: 1,
            lastPage: 10,
            numberOfScreens: 0,
            releaseYears: []

        }

        this.abortController = new AbortController();
        this.signal = this.abortController.signal;

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event, type, change = null){

        event.preventDefault();

        if(type === "sort"){

            let currentSort = this.state.sort;

            let newSort = currentSort;

            if(currentSort[change] === "asc"){

                newSort[change] = "desc";

            } else if(currentSort[change] === "desc"){

                delete newSort[change];

            } else {

                newSort[change] = "asc";

            }

            this.setState({sort: newSort, currentPage: 1}, () => {
                this.fetchScreens();
            });

        } else if (type === "pager"){

            this.setState((state) => ({
                currentPage: (change === 'next' ? state.currentPage + 1 : state.currentPage - 1)
            }), () => {
                this.fetchScreens();
            });

        } else if(type === "load"){

            this.setState((state) => ({
                currentPage: 1
            }), () => {
                this.fetchScreens();
            });
        }
        else {

            let newState = {
                currentPage: 1
            };

            newState[type] = event.target.value;

            this.setState(newState);

        }

    }

    fetchScreens(fromInterval = false) {

        if(!fromInterval){

            this.setState({ screenStatus: 'loading' });

        }

        const releaseYearFilter = (this.state.releaseYear !== 'all' ? `&releaseYear=${this.state.releaseYear}` : ``);

        const fetchUrl = `http://localhost:5000/api/v1/${this.props.type}?page=${this.state.currentPage}&limit=${this.state.limit}${releaseYearFilter}`;

        fetch(fetchUrl, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sort: this.state.sort
            }),
            signal: this.signal
        })
            .then((response) => {

                if (response.status !== 200) {

                    //There was an error fetching the data

                    if (!fromInterval) {

                        this.setState({ screenStatus: 'error' });

                    }

                } else {

                    response.json().then((data) => {

                        if (data.status === 1 && data.error === false) {

                            this.setState({ screens: data.screens,
                                            releaseYears: data.releaseYears,
                                            numberOfScreens: data.numberOfScreens,
                                            lastPage: data.lastPage,
                                            screenStatus: 'done'
                                        });

                        } else {

                            if (!fromInterval) {

                                this.setState({ screenStatus: 'error' });

                            }

                        }

                    });

                }

            })
            .catch((err) => {

                if (!fromInterval) {

                    this.setState({ screenStatus: 'error' });

                }


            });

    }

    componentDidMount() {

        this.fetchScreens();

        this.fetchScreenInterval = setInterval(() => this.fetchScreens(true), 60000);

    }

    componentWillUnmount(){

        this.abortController.abort();

        if(this.fetchScreenInterval){

            clearInterval(this.fetchScreenInterval);

        }

    }

    render() {

        let screens = this.state.screens.map((screen) =>

            <div className="movie-banner">
                <img src={screen.images['Poster Art'].url} className="movie-banner-image" alt={screen.title} />
                <p>{screen.title}</p>
            </div>

        );

        let releaseYears = this.state.releaseYears.map((releaseYear) =>

            <option value={releaseYear} key={releaseYear}>{releaseYear}</option>

        );

        return (

            <section className = {'screen-' + this.props.name}>
                <header>
                    <h2>Popular {this.props.name}</h2>
                </header>

                <nav className="screen-options">

                    <ul>
                        <li>
                            <a href="/#" onClick={(e) => this.handleChange(e, 'sort', 'title')} id='sortTitle'>Title <SortIcon value={this.state.sort.title}/> </a>
                        </li>
                        <li>
                            <a href="/#" onClick={(e) => this.handleChange(e, 'sort', 'releaseYear')} id='sortReleaseYear'>Release Year <SortIcon value={this.state.sort.releaseYear} /> </a>
                        </li>
                        <li>
                            <select value={this.state.releaseYear} onChange={(e) => this.handleChange(e, 'releaseYear')} id="filterReleaseYear">
                                <option disabled>Filter by release year</option>
                                <option value='all'>All years</option>
                                {releaseYears}
                            </select>
                        </li>
                        <li>
                            <select value={this.state.limit} onChange={(e) => this.handleChange(e, 'limit')} id="limit">
                                <option disabled>Screens Per Page</option>
                                <option default value = '10'>10</option>
                                <option value = '20'>20</option>
                                <option value = '50'>50</option>
                            </select>
                        </li>
                        <li>
                            <span>
                            {this.state.numberOfScreens} screen(s)
                            </span>
                        </li>
                        <li>
                            <a href="/#" className="button" onClick={(e) => this.handleChange(e, 'load')}>Load <FontAwesomeIcon icon="sync"/> </a>
                        </li>
                    </ul>

                </nav>

                {(this.state.screenStatus !== 'done' ?

                    <div className="loader">

                        <span> {(this.state.screenStatus === 'error' ? 'Oops, something went wrong...' : 'Loading...')} </span>

                    </div>

                : ''
                )}

                <div className={(this.state.screenStatus === 'done' ? '' : 'hidden')}>

                <div className="container">

                    {screens}

                </div>

                <div className="pager">
                <nav>
                    <ul>
                            <li>
                                {
                                    (this.state.currentPage > 1 ? <a href="/#" onClick={(e) => this.handleChange(e, 'pager', 'previous')} className="pager-button" id="previousPage"> <FontAwesomeIcon icon="arrow-circle-left" /> Previous </a> : '')
                                }
                            </li>

                            <li>
                                {
                                        (this.state.lastPage > this.state.currentPage ? <a href="/#" onClick={(e) => this.handleChange(e, 'pager', 'next')} className="pager-button" id="nextPage">Next <FontAwesomeIcon icon="arrow-circle-right" /> </a> : '')
                                }
                            </li>


                    </ul>
                </nav>
                </div>

                </div>

            </section>

        )

    }

}

export default Screen;