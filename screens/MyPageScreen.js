import React, { useState, useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LoadingSpinner from '../components/Spinner';
import Calendar from '../components/Calendar';
import Colors from '../constants/Colors';

export default function MyPageScreen(props) {
  const [ isFetched, setIsFetched ] = useState(false);

  const {
    userData,
    userReports,
    reportsDateMark,
    reportsCalendarItem
  } = props.screenProps;
  const {
    name,
    profile_photo,
    points,
    reports,
    templates
  } = userData;

  useEffect(() => {
    const fetchData = async() => {
      try {
        await props.screenProps.fetchUserAllReports();

        setIsFetched(true);
      } catch(err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const infoName = [ '상여금', '보고서', '템플릿' ];
  const userInfo = [ points, reports.length, templates.length ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.userProfileContainer}>
          <View style={styles.userProfile}>
            <Image
              style={styles.userPhoto}
              source={{ uri: profile_photo }}
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
        <View>
          {isFetched
          ?  <Calendar
              reports={userReports}
              reportDates={reportsDateMark}
              reportItems={reportsCalendarItem}
            />
          : <LoadingSpinner />
          }
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
    borderBottomWidth: 0.3,
    flex: 1,
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 20,
    marginRight: 15,
    marginBottom: 20,
    paddingLeft: 15,
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 20
  },
  userProfile: {
    flex: 1,
    alignItems: 'center',
  },
  userPhoto: {
    width: 70,
    height: 70,
    borderRadius: 10
  },
  userInfo: {
    flex: 3,
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 3,
    marginBottom: 15
  },
  infoContent: {
    flex: 1,
    alignItems: 'center',
    width: 90
  },
  infoName: {
    borderWidth: 1,
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
    backgroundColor: Colors.lightGray
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
  }
});
