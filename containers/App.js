import React from 'react';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import getEnvVars from '../environment';
import {
  fetchUserData,
  fetchUserReports,
  fetchUserTemplates,
  fetchTemplates,
  resetUserReports
} from '../actions';
import { getDate, getTime } from '../utils';

const { API_URL } = getEnvVars();

const getAccessToken = async() => await SecureStore.getItemAsync('ACCESS_TOKEN');
const getUserId = async() => await SecureStore.getItemAsync('USER_ID');

const dispatchFacebookData = dispatch => async(token) => {
  try {
    const FBres = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name,picture.type(large)`);
    const { name, email, picture } = await FBres.json();

    const res = await fetch(`${API_URL}/api/auth/authenticate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, name, picture })
    });

    const { user_id, access_token } = await res.json();

    await SecureStore.setItemAsync('ACCESS_TOKEN', access_token);
    await SecureStore.setItemAsync('USER_ID', user_id);

    Alert.alert('로그인', `안녕하세요, ${name} 부장님`);
  } catch(err) {
    Alert.alert('로그인 에러', err.message);
    console.log(err);
  }
};

const dispatchUserData = dispatch => async() => {
  try {
    const accessToken = await getAccessToken();
    const userId = await getUserId();

    const res = await fetch(`${API_URL}/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { userData } = await res.json();

    dispatch(fetchUserData(userData));
  } catch(err) {
    Alert.alert('사용자 정보 로딩 에러', err.message);
    console.log(err);
  }
};

const dispatchUserReports = dispatch => async(pageNumber) => {
  try {
    const accessToken = await getAccessToken();
    const userId = await getUserId();

    const api = `${API_URL}/api/users/${userId}/reports${pageNumber ? `/page?page_number=${pageNumber}&page_size=2` : '' }`

    const res = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { reports } = await res.json();

    if (reports.length) {
      dispatch(fetchUserReports(reports));
    }

    return reports;
  } catch(err) {
    Alert.alert('보고서 로딩 에러', err.message);
    console.log(err);
  }
};

const dispatchTemplates = dispatch => async() => {
  try {
    const accessToken = await getAccessToken();

    const res = await fetch(`${API_URL}/api/templates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { templates } = await res.json();

    dispatch(fetchTemplates(templates));
  } catch(err) {
    Alert.alert('템플릿 로딩 에러', err.message);
    console.log(err);
  }
};

const dispatchTemplateAdd = dispatch => async(templateId, price) => {
  try {
    const accessToken = await getAccessToken()
    const userId = await getUserId();

    const res = await fetch(`${API_URL}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ templateId, price })
    });

  } catch(err) {
    Alert.alert('템플릿 구입 에러', err.message);
    console.log(err);
  }
};

const dispatchUserTemplates = dispatch => async() => {
  try {
    const accessToken = await getAccessToken()
    const userId = await getUserId();

    const res = await fetch(`${API_URL}/api/users/${userId}/templates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { templates } = await res.json();

    dispatch(fetchUserTemplates(templates));
  } catch(err) {
    Alert.alert('보고서 템플릿 로딩 에러', err.message);
    console.log(err);
  }
};

const dispatchReportSubmit = dispatch => async(text, reportUri, templateId) => {
  try {
    const accessToken = await getAccessToken();
    const userId = await getUserId();
    const data = new FormData();

    data.append('photo', reportUri);
    data.append('text', text);
    data.append('templateId', templateId);
    data.append('date', new Date().toISOString());

    const res = await fetch(`${API_URL}/api/users/${userId}/reports`, {
      method: 'POST',
       headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      },
      body: data
    });

    // id응답 받아서 state 추가
  } catch(err) {
    Alert.alert('보고서 제출 에러', err.message);
    console.log(err);
  }
};

const reportsDateMark = userReports => {
  const dates = userReports.map(report => getDate(report.created_at));

  return dates.reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: 'gray' };
    return acc;
  }, {});
};

const reportsCalendarItem = userReports => {
  return userReports.reduce((acc, report) => {
    const date = getDate(report.created_at);
    const time = getTime(report.created_at);
    const data = {
      title: report.title,
      body: `${report.body.slice(0, 25)}...`,
      time: time
    };

    acc[date]
      ? acc[date].push(data)
      : acc[date] = [data];
    return acc;
  }, {});
}

const mapStateToProps = state => ({
  userData: state.userData,
  userReports: state.userReports,
  reportsDateMark: reportsDateMark(state.userReports),
  reportsCalendarItem: reportsCalendarItem(state.userReports),
  profilePhoto: state.profilePhoto,
  userTemplates: state. userTemplates,
  templates: state.templates
});

const mapDispatchToProps = dispatch => ({
  fetchFacebookData: dispatchFacebookData(dispatch),
  fetchUserData: dispatchUserData(dispatch),
  fetchUserReports: dispatchUserReports(dispatch),
  fetchTemplates: dispatchTemplates(dispatch),
  fetchUserTemplates: dispatchUserTemplates(dispatch),
  onTemplateAdd: dispatchTemplateAdd(dispatch),
  onReportSubmit: dispatchReportSubmit(dispatch),
  onUserReportsReset: () => dispatch(resetUserReports())
});

const AppContainer = props => {
  return <AppNavigator screenProps={props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
