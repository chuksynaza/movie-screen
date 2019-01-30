import React from 'react';
import ReactDOM from 'react-dom';

import { expect } from 'chai';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter, StaticRouter } from 'react-router';

import App from '../App';
import Home from '../Home';
import Screen from '../Screen';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {

    it('renders without crashing', () => {

        const div = document.createElement('div');
        ReactDOM.render(
            <StaticRouter context={{}}>
            <App />
            </StaticRouter>, div);

        ReactDOM.unmountComponentAtNode(div);

    });

    it('renders the Home component on path /', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        expect(wrapper.find(Home)).to.have.lengthOf(1);

    });

    it('renders the Screen component', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/series']}>
                <App />
            </MemoryRouter>
        );

        expect(wrapper.find(Screen)).to.have.lengthOf(1);

    });

    it('renders the Screen component for Series on path /series', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/series']}>
                <App />
            </MemoryRouter>
        );

        expect(wrapper.find(Screen).prop('type')).to.equal('series');

    });

    it('renders the Screen component for Movies on path /movies', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/movies']}>
                <App />
            </MemoryRouter>
        );

        expect(wrapper.find(Screen).prop('type')).to.equal('movie');

    });

})

