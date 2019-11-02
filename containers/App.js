import React from 'react';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import AppNavigator from '../navigation/AppNavigator';
import getEnvVars from '../environment';
import { fetchUserData } from '../actions';

const { API_URL } = getEnvVars();

const dispatchFacebookData = dispatch => async token => {
  try {
    const FBres = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=name,email,picture.type(large)`);
    const { name, email, picture } = await FBres.json();

    const res = await fetch(`${API_URL}/api/auth/authenticate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, name, picture })
    });

    const { access_token } = await res.json();

    await SecureStore.setItemAsync('ACCESS_TOKEN', access_token);
  } catch(err) {
    console.log(err);
  }
};

const dispatchUserData = dispatch => async() => {
  try {
    const access_token = await SecureStore.getItemAsync('ACCESS_TOKEN');

    const userRes = await fetch(`${API_URL}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    });

    const { userData } = await userRes.json();
    dispatch(fetchUserData(userData));
  } catch(err) {
    console.log(err);
  }
};

const mapStateToProps = state => ({
  userData: state.userData
});

const mapDispatchToProps = dispatch => ({
  fetchFacebookData: dispatchFacebookData(dispatch),
  fetchUserData: dispatchUserData(dispatch)
});

const AppContainer = props => {
  return <AppNavigator screenProps={props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
