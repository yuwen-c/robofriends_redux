import { CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
 } from './constants';

export const setSearchField = (text) => {
    return {
        type: CHANGE_SEARCH_FIELD,
        payload: text
    }
}

// 2. after input, we need to grab this text, and set state of searchfield
// description: set searchfield

// import the constant from constants file, using destructuring
// it's a multuple export, and the way to import it is using { }

// declare an action which receives a parameter,
// and return an object, that includes type, and payload properties.
// type stands for the describing string/constant,
// payload means the data we'll send to reducer.

// componentDidMount, fetch robots.
// Not returns an obj, but a function
export const fetchRobots =  (dispatch) => {
    dispatch({type: REQUEST_ROBOTS_PENDING});
    fetch('https://jsonplaceholder.typicode.com/users') 
    .then(response => response.json())
    .then(robots => dispatch({type: REQUEST_ROBOTS_SUCCESS, payload: robots}))
    .catch(error => dispatch({type: REQUEST_ROBOTS_FAILED, payload: error})) 
}