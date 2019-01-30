import React from 'react';
import ReactDOM from 'react-dom';

import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router';
import nock from 'nock';
import waitUntil from 'async-wait-until';

import Screen from '../Screen';

Enzyme.configure({ adapter: new Adapter() });

const nockResponse = { "error": false, "status": 1, "message": "Successful", "description": "Successfully loaded data", "releaseYears": ["0", "1989", "1990", "1993", "1994", "2002", "2006", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"], "numberOfScreens": 64, "lastPage": 4, "screens": [{ "title": "Wolf Creek", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "programType": "series", "images": { "Poster Art": { "url": "https://streamcoimg-a.akamaihd.net/000/128/61/12861-PosterArt-ec32a81986a45eac7e080112075ab466.jpg", "width": 1000, "height": 1500 } }, "releaseYear": 2016 }, { "title": "The Wrong Mans", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "programType": "series", "images": { "Poster Art": { "url": "https://streamcoimg-a.akamaihd.net/000/124/31/12431-PosterArt-f7d91329c70a7fa206e838423caa31bd.jpg", "width": 1000, "height": 1500 } }, "releaseYear": 2013 }] };
const mockedEvent = { target: {}, preventDefault: () => {} };

describe('<Screen />', () => {

    beforeAll(() => {

        nock('http://localhost:5000/api/v1')
            .persist()
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .post(/.*/)
            .reply(200, nockResponse);

    });

    afterAll(() => {

        nock.cleanAll();

    });

    it('renders without crashing', () => {

        const div = document.createElement('div');
        ReactDOM.render(
            <StaticRouter context={{}}>
                <Screen name="Movies" type="movie"/>
            </StaticRouter>, div);

    });

    it('should set the state screenStatus as done after successfully fetching the screens', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        expect(wrapper.state('screenStatus')).to.equal('done');

    });

    it('should set the state screens correctly after a successful fetchScreens()', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        expect(wrapper.state('screens')).to.deep.equal(nockResponse.screens);

    });

    it('should set the state releaseYears correctly after a successful fetchScreens()', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        expect(wrapper.state('releaseYears')).to.deep.equal(nockResponse.releaseYears);

    });

    it('should set the state numberOfScreens correctly after a successful fetchScreens()', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        expect(wrapper.state('numberOfScreens')).to.deep.equal(nockResponse.numberOfScreens);

    });

    it('should set the state lastPage correctly after a successful fetchScreens()', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        expect(wrapper.state('lastPage')).to.deep.equal(nockResponse.lastPage);

    });

    it('the number of screen elements should equal the length of screens returned from a successful fetchScreens()', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        expect(wrapper.find('.movie-banner').length).to.deep.equal(nockResponse.screens.length);

    });


    it('should set the sort title state as asc when the sort by title is clicked once', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        wrapper.find('#sortTitle').simulate('click', mockedEvent);

        expect(wrapper.state().sort.title).to.equal('asc');

    });

    it('should set the sort title state as desc when the sort by title is clicked twice', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        wrapper.find('#sortTitle').simulate('click', mockedEvent);
        wrapper.find('#sortTitle').simulate('click', mockedEvent);

        expect(wrapper.state().sort.title).to.equal('desc');

    });

    it('should delete the sort title state when the sort by title is clicked thrice', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        wrapper.find('#sortTitle').simulate('click', mockedEvent);
        wrapper.find('#sortTitle').simulate('click', mockedEvent);
        wrapper.find('#sortTitle').simulate('click', mockedEvent);

        expect(wrapper.state().sort.title).to.equal(undefined);

    });

    it('should set the sort releaseYear state as asc when the sort by releaseYear is clicked once', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        wrapper.find('#sortReleaseYear').simulate('click', mockedEvent);

        expect(wrapper.state().sort.releaseYear).to.equal('asc');

    });

    it('should set the sort releaseYear state as desc when the sort by releaseYear is clicked twice', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        wrapper.find('#sortReleaseYear').simulate('click', mockedEvent);
        wrapper.find('#sortReleaseYear').simulate('click', mockedEvent);

        expect(wrapper.state().sort.releaseYear).to.equal('desc');

    });

    it('should delete the sort releaseYear state when the sort by releaseYear is clicked thrice', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        wrapper.find('#sortReleaseYear').simulate('click', mockedEvent);
        wrapper.find('#sortReleaseYear').simulate('click', mockedEvent);
        wrapper.find('#sortReleaseYear').simulate('click', mockedEvent);

        expect(wrapper.state().sort.releaseYear).to.equal(undefined);

    });

    it('should set the release year filter state correctly on change of the release year select', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        let changeEvent = { target: { value: '2019' }, preventDefault: () => { } };

        wrapper.find('#filterReleaseYear').simulate('change', changeEvent);

        expect(wrapper.state().releaseYear).to.equal('2019');

    });

    it(' should set the limit state correctly on change of the limit select', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        let changeEvent = { target: { value: 100 }, preventDefault: () => { } };

        wrapper.find('#limit').simulate('change', changeEvent);

        expect(wrapper.state().limit).to.equal(100);

    });

    it('the next page button should not appear when current page is not less than last page', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        await wrapper.setState({ currentPage: 10, lastPage: 10 });

        expect(wrapper.find('#nextPage').length).to.equal(0);



    });

    it('the previous page button should not appear when current page is not greater than 1', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        await wrapper.setState({ currentPage: 1});

        expect(wrapper.find('#previousPage').length).to.equal(0);



    });

    it('the next page button should appear when current page is less than last page', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        await wrapper.setState({ currentPage: 9, lastPage: 10 });

        expect(wrapper.find('#nextPage').length).to.equal(1);



    });

    it('the previous page button should appear when current page is greater than 1', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        await wrapper.setState({ currentPage: 2 });

        expect(wrapper.find('#previousPage').length).to.equal(1);

    });

    it('should increase the current Page when next page is clicked', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        await wrapper.setState({ currentPage: 9, lastPage: 10 });

        wrapper.find('#nextPage').simulate('click', mockedEvent);

        expect(wrapper.state('currentPage')).to.equal(10);


    });

    it('should reduce the current Page when previous page is clicked', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        await wrapper.setState({ currentPage: 9, lastPage: 10 });

        wrapper.find('#previousPage').simulate('click', mockedEvent);

        expect(wrapper.state('currentPage')).to.equal(8);


    });

    it('should show the preloader Loading ... when loading the screens', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        await wrapper.setState({ screenStatus: 'loading'});

        expect(wrapper.find('.loader').children('span').text()).to.equal(' Loading... ');

    });

});

describe('<Screen />', () => {

    beforeAll(() => {

        nock('http://localhost:5000/api/v1')
            .persist()
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .post(/.*/g)
            .reply(500, {});

    });

    afterAll(() => {

        nock.cleanAll();

    });

    it('should set the screenStatus as error if an error occured', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');


        expect(wrapper.state('screenStatus')).to.be.equal('error');

    });

    it('should show the error Oops something went wrong if an error occured', async () => {

        const wrapper = await shallow(
            <Screen name="Series" type="series" />
        );

        await waitUntil(() => wrapper.state('screenStatus') != 'loading');

        expect(wrapper.find('.loader').children('span').text()).to.equal(' Oops, something went wrong... ');

    });

});


