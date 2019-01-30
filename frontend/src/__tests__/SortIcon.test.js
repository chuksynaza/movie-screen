import React from 'react';
import ReactDOM from 'react-dom';

import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SortIcon from '../SortIcon';

Enzyme.configure({ adapter: new Adapter() });

describe('<SortIcon />', () => {

    it('renders without crashing', () => {

        const div = document.createElement('div');
        ReactDOM.render(
            <SortIcon value='asc' />, div);

    });

    it('renders the FontAwesomeIcon component',  async () => {

        const wrapper = await shallow(
            <SortIcon  />
        );

        expect(wrapper.find(FontAwesomeIcon)).to.have.lengthOf(1);

    });

    it('should show the font awesome sort up icon when the value prop is passed as asc', async () => {

        const wrapper = await shallow(
            <SortIcon value='asc'/>
        );

        expect(wrapper.find(FontAwesomeIcon).prop('icon')).to.equal('sort-up');

    });

    it('should show the font awesome sort up icon when the value prop is passed as desc', async () => {

        const wrapper = await shallow(
            <SortIcon value='desc' />
        );

        expect(wrapper.find(FontAwesomeIcon).prop('icon')).to.equal('sort-down');

    });

    it('should show the font awesome sort icon when the value prop is passed as not asc or desc', async () => {

        const wrapper = await shallow(
            <SortIcon value='something-else' />
        );

        expect(wrapper.find(FontAwesomeIcon).prop('icon')).to.equal('sort');

    });

});


