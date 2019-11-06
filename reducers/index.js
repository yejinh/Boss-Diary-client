import * as actionTypes from '../constants/actionType';
const initialState = {
  userData: null,
  profilePhoto: null,
  userReports: [],
  userTemplates: [],
  templates: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_DATA:
      return {
        ...state,
        userData: action.userData,
        profilePhoto: action.profilePhoto
      };

    case actionTypes.FETCH_USER_REPORTS:
      return {
        ...state,
        userReports: action.reports
      }

    case actionTypes.FETCH_USER_TEMPLATES:
      return {
        ...state,
        userTemplates: action.templates
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
