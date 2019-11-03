import React from 'react';
import { Spinner } from 'native-base';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Color from '../constants/Colors';

import { MonoText } from '../components/StyledText';

export default function MyPageScreen(props) {
  const {
    name,
    profilePhoto,
    points,
    reports,
    templates
  } = props.screenProps.userData;

  if (!name) return <Spinner style={styles.spinnerContainer} color={'#999999'} />;

  const infoName = [ '상여금', '보고서', '템플릿' ];
  const userInfo = [ points, reports.length, templates.length ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.userProfileContainer}>
          <View style={styles.userProfile}>
            <Image
              style={styles.userPhoto}
              source={{ uri: profilePhoto }}
            />
            <Text>{name}</Text>
          </View>
          <View style={styles.userInfo}>
            {userInfo.map((info, i) => (
              <View key={i} style={styles.infoContent}>
                <View style={styles.infoName}>
                  <Text>{infoName[i]}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.infoText}>{info}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.getStartedContainer}>
          <View
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          >
            <MonoText>YAY</MonoText>
          </View>
        </View>
        <View style={styles.helpContainer}>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  spinnerContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center'
  },
  userProfileContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 20,
    marginRight: 30,
    marginBottom: 20,
  },
  userProfile: {
    alignItems: 'center',
  },
  userPhoto: {
    width: 90,
    height: 90,
    borderRadius: 10
  },
  userInfo: {
    flex: 3,
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 5,
    marginBottom: 20
  },
  infoContent: {
    flex: 1,
    alignItems: 'center',
    width: 85
  },
  infoName: {
    borderWidth: 1,
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1
  },
  info: {
    borderWidth: 1,
    flex: 2,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 18,
    fontWeight: '500'
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  }
});
