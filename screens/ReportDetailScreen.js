import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, FlatList, StyleSheet } from 'react-native';
import {
  Container,
  View,
  Fab,
  Button,
  Icon,
  Text
} from 'native-base';
import LoadingSpinner from '../components/Spinner';
import Report from '../components/Report';
import EmptyScreen from '../components/EmptyScreen';
import Colors from '../constants/Colors';

export default function ReportDetailScreen(props) {
  const [ isActive,  setIsActive ] = useState(false);
  const [ isFetched, setIsFetched ] = useState(false);

  const { navigation } = props;
  const { profilePhoto, userReports, fetchUserReports } = props.screenProps;

  const didFocus = navigation.addListener('didFocus', async() => {
    await fetchUserReports();
    setIsFetched(true);
  });

  useEffect(() => {
    return () => didFocus.remove();
  });

  if (!userReports.length && !isFetched) return <LoadingSpinner />;
  if (!userReports.length) return <EmptyScreen message={'작성한 보고서가 없습니다'}/>;

  // 여기서 나의 레포트들 보여주고 선택 시 사진첩 공유 가능하도록.
  // CameraRoll.saveToCameraRoll(url, 'photo');
  return (
    <Container>
      <FlatList>
        <View style={styles.cardContainer}>
          {userReports.map(report => (
            <Report
              key={report._id}
              profilePhoto={profilePhoto}
              report={report}
            />
          ))}
        </View>
      </FlatList>
      <View style={styles.fabContainer}>
        <Fab
          active={isActive}
          direction='left'
          style={styles.mainFab}
          position='bottomRight'
          onPress={() => setIsActive(!isActive)}
        >
          <Icon name='ios-download' />
          <Button style={styles.fab}>
            <Icon name='ios-image' />
          </Button>
          <Button style={styles.fab}>
            <Icon name='logo-facebook' />
          </Button>
        </Fab>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover'
  },
  cardContainer: {
    flex: 1,
    flexWrap: 'wrap'
  },
  fabContainer: {
    flex: 1
  },
  mainFab: {
    backgroundColor: Colors.gray
  },
  fab: {
    backgroundColor: Colors.deepGreen
  },
  text: {
    fontSize: 12
  }
});
