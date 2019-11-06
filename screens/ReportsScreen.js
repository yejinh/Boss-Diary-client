import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
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

export default function NewReportInputScreen(props) {
  const [ isActive,  setIsActive ] = useState(false);
  const [ isFetched, setIsFetched ] = useState(false);

  const { profilePhoto, userReports, fetchUserReports } = props.screenProps;

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserReports();
      setIsFetched(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    return setIsFetched(false);
  });

  if (!userReports.length && !isFetched) return <LoadingSpinner />;
  if (!userReports.length) return <EmptyScreen message={'작성한 보고서가 없습니다'}/>;

  // 여기서 나의 레포트들 보여주고 선택 시 사진첩 공유 가능하도록.
  // CameraRoll.saveToCameraRoll(url, 'photo');
  return (
    <Container>
      <ScrollView>
        {userReports.map(report => (
          <Report
            key={report._id}
            profilePhoto={profilePhoto}
            report={report}
          />
        ))}
      </ScrollView>
      <View style={styles.fabContainer}>
        <Fab
          active={isActive}
          direction='left'
          style={styles.mainFab}
          position='bottomRight'
          onPress={() => setIsActive(!isActive)}
        >
          <Icon name='ios-hammer' />
          <Button style={styles.fab} onPress={() => alert("This is Card Header")}>
            <Text style={styles.text}>굴림</Text>
          </Button>
          <Button style={styles.fab}>
            <Text style={styles.text}>궁서</Text>
          </Button>
          <Button disabled style={styles.fab}>
            <Text style={styles.text}>명조</Text>
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
