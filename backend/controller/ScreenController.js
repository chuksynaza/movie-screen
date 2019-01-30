const fetch = require('node-fetch');

module.exports = {

    getScreens: async (req, res) => {

        let theResponse = {
            error: true,
            status: 0,
            message: "Oops, something went wrong...",
            description: "An unknown error occured."
        }

        let fetchUrl = "https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json";

        await fetch(fetchUrl)
            .then(async (response) => {

                if (response.status !== 200) {

                    //There was an error fetching the data

                    theResponse.description += ` Status Code: ${response.status}`;

                    theResponse.status = 2;

                } else {

                    await response.json().then((data) => {

                        let entries = data.entries;

                        let releaseYear = req.query.releaseYear || null;

                        let screenType = req.params.screenType || 'movie';

                        //Initialize Unique release years

                        let releaseYears = {};

                        //Filter Data

                        let screens = entries.filter((entry) => {

                            let filters = true;

                            filters = (filters && entry.programType == screenType);

                            if (filters) {

                                //Before filtering years, If filters pass, populate unique release years
                                releaseYears[entry.releaseYear] = entry.releaseYear;

                            }

                            if (releaseYear !== null) {

                                filters = (filters && entry.releaseYear == releaseYear);

                            }

                            return (filters);

                        });

                        //Sort Data

                        let sortOptions = req.body.sort || null;

                        if (sortOptions !== null) {

                            screens.sort((a, b) => {

                                for (let i in sortOptions) {

                                    if (a[i] !== undefined && b[i] !== undefined) {

                                        if (sortOptions[i] && sortOptions[i].toLowerCase() == 'asc') {

                                            if (a[i] > b[i]) return 1;
                                            if (a[i] < b[i]) return -1;

                                        } else if (sortOptions[i] && sortOptions[i].toLowerCase() == 'desc') {

                                            if (a[i] < b[i]) return 1;
                                            if (a[i] > b[i]) return -1;

                                        }

                                    }

                                }
                            });

                            //Get the release years as an array

                            theResponse.releaseYears = [];

                            for (let i in releaseYears) {

                                theResponse.releaseYears.push(i);

                            }

                        }

                            //Paginate Data

                            let limit = parseInt(req.query.limit) || 50;
                            let start = 0;
                            let currentPage = req.query.page || 0;

                            if (currentPage > 0) {

                                start = (currentPage - 1) * limit;

                            }

                            let numberOfScreens = screens.length;
                            let lastPage = Math.ceil(numberOfScreens / limit);

                            theResponse.numberOfScreens = numberOfScreens;
                            theResponse.lastPage = lastPage;

                            screens = screens.splice(start, limit);

                        //Things went well

                        theResponse.status = 1;
                        theResponse.error = false;
                        theResponse.message = "Successful";
                        theResponse.description = "Successfully loaded data";
                        theResponse.screens = screens;

                    })
                        .catch((err) => {

                            //There was an error processing the data

                            theResponse.status = 3;
                            theResponse.description += ` Error processing data ${err}`;

                        });

                }


            })
            .catch((err) => {

                //There was an error fetching the data

                theResponse.status = 3;
                theResponse.description += ` Error fetching data ${err}`;

            });

        res.send(theResponse);

    }

}
