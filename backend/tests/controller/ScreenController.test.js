const { expect } = require('chai');
const { getScreens } = require('../../controller/ScreenController');
const nock = require('nock');
const nockDefaultResponse = require('./nockDefaultResponse.json');

const req = {
    query: {

    },
    params: {
        screenType: 'series'
    },
    body: {

    }
};

let res = {
    sendCalledWith: '',
    send: function(arg) {
        this.sendCalledWith = arg;
    }
}



describe('ScreenController', () => {

    describe('getScreens()', () => {

        beforeEach(() => {

            nock('https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json')
                .persist()
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .get(/.*/)
                .reply(200, nockDefaultResponse);

        });

        afterEach(() => {

            nock.cleanAll();

        });

        it('Should filter the release years if sent in the query parameter', async() => {

            let newReq = JSON.parse(JSON.stringify(req));

            newReq.query.releaseYear = '2010';
            newReq.params.screenType = 'series';

            let expectedScreens = [
                {
                    "title": "E Younger",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "programType": "series",
                    "images": {
                        "Poster Art": {
                            "url": "https://streamcoimg-a.akamaihd.net/000/143/24/14324-PosterArt-a0168953a3b93681dbd60c7bcc50a0af.jpg",
                            "width": 1000,
                            "height": 1500
                        }
                    },
                    "releaseYear": 2010
                }
            ];

            await getScreens(newReq, res);

            expect(res.sendCalledWith.screens).to.deep.equal(expectedScreens);

        });

        it('Should return screens for the appropriate screen type', async () => {

            let newReq = JSON.parse(JSON.stringify(req));

            newReq.params.screenType = 'movie';

            let expectedScreens = [
                {
                    "title": "C Billions",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "programType": "movie",
                    "images": {
                        "Poster Art": {
                            "url": "https://streamcoimg-a.akamaihd.net/000/117/25/11725-PosterArt-deecf8dbd786dfa2d964413b0bf83726.jpg",
                            "width": 720,
                            "height": 1080
                        }
                    },
                    "releaseYear": 2016
                },
                {
                    "title": "11.22.63",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "programType": "movie",
                    "images": {
                        "Poster Art": {
                            "url": "https://streamcoimg-a.akamaihd.net/000/120/40/12040-PosterArt-2a08532d986336771ea5a70658b6a957.jpg",
                            "width": 400,
                            "height": 600
                        }
                    },
                    "releaseYear": 1999
                }

            ];

            await getScreens(newReq, res);

            expect(res.sendCalledWith.screens).to.deep.equal(expectedScreens);

        });

        it('Should return the correct number of screens', async () => {

            await getScreens(req, res);

            expect(res.sendCalledWith.numberOfScreens).to.equal(10);

        });

        it('Should return the correct number of pages', async () => {

            let newReq = JSON.parse(JSON.stringify(req));

            newReq.query.limit = 4;

            await getScreens(newReq, res);

            expect(res.sendCalledWith.lastPage).to.equal(3);

        });

        it('Should sort by title asc correctly', async () => {

            let newReq = JSON.parse(JSON.stringify(req));

            newReq.params.screenType = 'movie';
            newReq.body.sort = {
                title: 'asc'
            };

            let expectedScreens = [
                {
                    "title": "11.22.63",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "programType": "movie",
                    "images": {
                        "Poster Art": {
                            "url": "https://streamcoimg-a.akamaihd.net/000/120/40/12040-PosterArt-2a08532d986336771ea5a70658b6a957.jpg",
                            "width": 400,
                            "height": 600
                        }
                    },
                    "releaseYear": 1999
                },
                {
                    "title": "C Billions",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "programType": "movie",
                    "images": {
                        "Poster Art": {
                            "url": "https://streamcoimg-a.akamaihd.net/000/117/25/11725-PosterArt-deecf8dbd786dfa2d964413b0bf83726.jpg",
                            "width": 720,
                            "height": 1080
                        }
                    },
                    "releaseYear": 2016
                }

            ];

            await getScreens(newReq, res);

            expect(res.sendCalledWith.screens).to.deep.equal(expectedScreens);

        });

        it('Should sort by title desc correctly', async () => {

            let newReq = JSON.parse(JSON.stringify(req));

            newReq.params.screenType = 'movie';
            newReq.body.sort = {
                title: 'desc'
            };

            let expectedScreens = [
                {
                    "title": "C Billions",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "programType": "movie",
                    "images": {
                        "Poster Art": {
                            "url": "https://streamcoimg-a.akamaihd.net/000/117/25/11725-PosterArt-deecf8dbd786dfa2d964413b0bf83726.jpg",
                            "width": 720,
                            "height": 1080
                        }
                    },
                    "releaseYear": 2016
                },
                {
                    "title": "11.22.63",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "programType": "movie",
                    "images": {
                        "Poster Art": {
                            "url": "https://streamcoimg-a.akamaihd.net/000/120/40/12040-PosterArt-2a08532d986336771ea5a70658b6a957.jpg",
                            "width": 400,
                            "height": 600
                        }
                    },
                    "releaseYear": 1999
                }

            ];

            await getScreens(newReq, res);

            expect(res.sendCalledWith.screens).to.deep.equal(expectedScreens);

        });

        it('Should sort by release year asc correctly', async () => {

            let newReq = JSON.parse(JSON.stringify(req));

            newReq.params.screenType = 'movie';
            newReq.body.sort = {
                releaseYear: 'asc'
            };

            let expectedScreens = [
                {
                    "title": "11.22.63",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "programType": "movie",
                    "images": {
                        "Poster Art": {
                            "url": "https://streamcoimg-a.akamaihd.net/000/120/40/12040-PosterArt-2a08532d986336771ea5a70658b6a957.jpg",
                            "width": 400,
                            "height": 600
                        }
                    },
                    "releaseYear": 1999
                },
                {
                    "title": "C Billions",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "programType": "movie",
                    "images": {
                        "Poster Art": {
                            "url": "https://streamcoimg-a.akamaihd.net/000/117/25/11725-PosterArt-deecf8dbd786dfa2d964413b0bf83726.jpg",
                            "width": 720,
                            "height": 1080
                        }
                    },
                    "releaseYear": 2016
                }

            ];

            await getScreens(newReq, res);

            expect(res.sendCalledWith.screens).to.deep.equal(expectedScreens);

        });

        it('Should sort by release year desc correctly', async () => {

            let newReq = JSON.parse(JSON.stringify(req));

            newReq.params.screenType = 'movie';
            newReq.body.sort = {
                releaseYear: 'desc'
            };

            let expectedScreens = [
                {
                    "title": "C Billions",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "programType": "movie",
                    "images": {
                        "Poster Art": {
                            "url": "https://streamcoimg-a.akamaihd.net/000/117/25/11725-PosterArt-deecf8dbd786dfa2d964413b0bf83726.jpg",
                            "width": 720,
                            "height": 1080
                        }
                    },
                    "releaseYear": 2016
                },
                {
                    "title": "11.22.63",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "programType": "movie",
                    "images": {
                        "Poster Art": {
                            "url": "https://streamcoimg-a.akamaihd.net/000/120/40/12040-PosterArt-2a08532d986336771ea5a70658b6a957.jpg",
                            "width": 400,
                            "height": 600
                        }
                    },
                    "releaseYear": 1999
                }

            ];

            await getScreens(newReq, res);

            expect(res.sendCalledWith.screens).to.deep.equal(expectedScreens);

        });

        it('Should return the status 1 when the fetch and processing is successful', async () => {

            await getScreens(req, res);

            expect(res.sendCalledWith.status).to.equal(1);

        });

        it('Should return the status 2 when the fetch does not return 200', async () => {

            nock.cleanAll();

            nock('https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json')
                .persist()
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .get(/.*/)
                .reply(500, {});

            await getScreens(req, res);

            expect(res.sendCalledWith.status).to.equal(2);


        })

    })

});