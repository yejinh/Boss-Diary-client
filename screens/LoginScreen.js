import React from 'react';
import * as Facebook from 'expo-facebook';
import { SecureStore } from 'expo';
import getEnvVars from '../environment';
import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';

const { FACEBOOK_ID } = getEnvVars();

export default function LoginScreen() {
  const _login = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        FACEBOOK_ID,
        { permissions: ['public_profile'] }
      )

      if (type === 'success') {
        const res = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const { id, name } = await res.json();
      }

      // fetch하기
    } catch(err) {
      alert(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>부장님의 일기</Text>
        <View style={styles.button}>
          <Button title="시작하기" onPress={_login} />
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
    marginTop: 150,
  },
  text: {
    fontSize: 100
  },
  button: {
    marginTop: 100,
    fontSize: 5
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
