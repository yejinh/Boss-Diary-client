import React from 'react';
import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';
import getEnvVars from '../environment';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../constants/Colors';

const { API_URL, FACEBOOK_APP_ID } = getEnvVars();

export default function LoginScreen(props) {
  const { navigation } = props;

  async function _login() {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        FACEBOOK_APP_ID,
        { permissions: ['public_profile'] }
      );

      if (type === 'success') {
        const FBres = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=name,email,picture.type(large)`);
        const { name, email, picture } = await FBres.json();

        const res = await fetch(`${API_URL}/api/auth/authenticate`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ email, name, picture })
        });

        const { access_token } = await res.json();

        await SecureStore.setItemAsync('ACCESS_TOKEN', access_token);
        navigation.navigate('Main');
      }
    } catch(err) {
      alert(err);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.textContainer}>
          <Text>발행일자 2019. 10</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>부장님의 보고서</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={_login}>
            <Text style={styles.button}>보고서 작성 시작하기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.copyright}>
          <Text>Copyright © 2019 by yejinh All rights reserved</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginTop: 100,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10
  },
  titleContainer: {
    marginTop: 80,
    paddingTop: 40,
    paddingBottom: 40,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderColor: Color.deepGreen
  },
  titleText: {
    fontSize: 50
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 350,
    fontSize: 5
  },
  button: {
    fontSize: 20
  },
  copyright: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  }
});
