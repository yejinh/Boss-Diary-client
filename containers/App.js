import React from 'react';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import getEnvVars from '../environment';
import {
  fetchUserData,
  fetchTemplates,
  fetchUserTemplates
} from '../actions';

const { API_URL } = getEnvVars();

const dispatchFacebookData = dispatch => async(token) => {
  try {
    const FBres = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name,picture.type(large)`);
    const { name, email, picture } = await FBres.json();

    Alert.alert('로그인', `안녕하세요, ${name} 부장님`);

    const res = await fetch(`${API_URL}/api/auth/authenticate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, name, picture })
    });

    const { access_token } = await res.json();

    await SecureStore.setItemAsync('ACCESS_TOKEN', access_token);

  } catch(err) {
    Alert.alert('로딩 에러', err.message);
    console.log(err);
  }
};

const dispatchUserData = dispatch => async() => {
  try {
    const access_token = await SecureStore.getItemAsync('ACCESS_TOKEN');

    const res = await fetch(`${API_URL}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    });

    const { userData } = await res.json();

    dispatch(fetchUserData(userData));
  } catch(err) {
    Alert.alert('로딩 에러', err.message);
    console.log(err);
  }
};

const dispatchTemplates = dispatch => async() => {
  try {
    const access_token = await SecureStore.getItemAsync('ACCESS_TOKEN');

    const res = await fetch(`${API_URL}/api/templates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    });

    const { templates } = await res.json();

    dispatch(fetchTemplates(templates));
  } catch(err) {
    Alert.alert('로딩 에러', err.message);
    console.log(err);
  }
};

const dispatchAddTemplate = dispatch => async(userId, templateId, price) => {
  try {
    const access_token = await SecureStore.getItemAsync('ACCESS_TOKEN');

    const res = await fetch(`${API_URL}/api/users/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      },
      body: JSON.stringify({ userId, templateId, price })
    });
  } catch(err) {
    Alert.alert('로딩 에러', err.message);
    console.log(err);
  }
};

const dispatchUserTemplates = dispatch => async(userId) => {
  try {
    const access_token = await SecureStore.getItemAsync('ACCESS_TOKEN');

    const res = await fetch(`${API_URL}/api/templates/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    });

    const { templates } = await res.json();

    dispatch(fetchUserTemplates(templates));
  } catch(err) {
    Alert.alert('로딩 에러', err.message);
    console.log(err);
  }
}

const mapStateToProps = state => ({
  userData: state.userData,
  templates: state.templates,
  userTemplates: state. userTemplates
});

const mapDispatchToProps = dispatch => ({
  fetchFacebookData: dispatchFacebookData(dispatch),
  fetchUserData: dispatchUserData(dispatch),
  fetchTemplates: dispatchTemplates(dispatch),
  fetchUserTemplates: dispatchUserTemplates(dispatch),
  onAddTemplate: dispatchAddTemplate(dispatch)
});

const AppContainer = props => {
  return <AppNavigator screenProps={props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
