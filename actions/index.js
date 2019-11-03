import * as actionType from '../constants/actionType';

export const fetchUserData = userData => ({
  type: actionType.FETCH_USER_DATA,
  userData, userData,
  email: userData.email,
  name: userData.name,
  points: userData.points,
  profilePhoto: userData.profilePhoto,
  reports: userData.reports,
  templates: userData.templates
});

export const fetchTemplates = templates => ({
  type: actionType.FETCH_TEMPLATES,
  templates
});
