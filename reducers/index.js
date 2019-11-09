import * as actionTypes from '../constants/actionType';
const initialState = {
  userData: null,
  userReports: [],
  profilePhoto: null,
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
      if (state.userReports[0] && state.userReports[0]._id === action.reports[0]._id) return state;

      return {
        ...state,
        userReports: state.userReports.concat(action.reports)
      };

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

    case actionTypes.RESET_USER_REPORTS:
      return {
        ...state,
        userReports: []
      };

    default:
      return state;
  }
};

export default reducer;
