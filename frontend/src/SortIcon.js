import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

library.add(faSort, faSortUp, faSortDown);

const SortIcon = ((props) => {

    if(props.value === "asc"){

        return <FontAwesomeIcon icon="sort-up" />

    } else if(props.value === "desc"){

        return <FontAwesomeIcon icon="sort-down" />

    } else {

        return <FontAwesomeIcon icon="sort" />

    }

});

export default SortIcon;