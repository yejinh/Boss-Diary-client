import * as actionTypes from '../constants/actionType';
const initialState = {
  userData: null,
  templates: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_DATA:
      return {
        ...state,
        userData: action.userData
      };

    case actionTypes.FETCH_TEMPLATES:
      return {
        ...state,
        templates: action.templates
      };

    default:
      return state;
  }
};

export default reducer;
