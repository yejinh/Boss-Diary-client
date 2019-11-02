import * as actionTypes from '../constants/actionType';
const initialState = {
  userData: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_DATA:
      return {
        ...state,
        userData: action.userData
      };

    default:
      return state;
  }
};

export default reducer;
