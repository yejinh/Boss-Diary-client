import * as actionType from '../constants/actionType';

export const fetchUserData = userData => ({
  type: actionType.FETCH_USER_DATA,
  userData,
  userId: userData._id,
  email: userData.email,
  name: userData.name,
  points: userData.points,
  profilePhoto: userData.profile_photo,
  reports: userData.reports,
  templates: userData.templates
});

export const fetchUserReports = reports => ({
  type: actionType.FETCH_USER_REPORTS,
  reports
});

export const fetchAllUserReports = reports => ({
  type: actionType.FETCH_USER_ALL_REPORTS,
  reports
});

export const fetchUserTemplates = templates => ({
  type: actionType.FETCH_USER_TEMPLATES,
  templates
});

export const fetchTemplates = templates => ({
  type: actionType.FETCH_TEMPLATES,
  templates
});

export const addNewReport = newReport =>({
  type: actionType.ADD_NEW_REPORT,
  newReport
});

export const resetUserReports = () => ({
  type: actionType.RESET_USER_REPORTS
});
