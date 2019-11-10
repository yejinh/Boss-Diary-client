import React, { useState } from 'react';
import {
  Image,
  CameraRoll,
  Alert,
  StyleSheet
} from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
} from 'native-base';
import CardHeader from './CardHeader';
import ReportModal from './ReportModal';
import Colors from '../constants/Colors';

export default function Report(props) {
  const [ modalVisible, setModalVisible ] = useState(false);

  const { profilePhoto, report, onUserSearch, onClick } = props;
  const { title, created_at: createdAt, url } = report;

  const _saveToCameraRoll = async() => {
    try {
      Alert.alert(
        '사진첩 저장',
        '사진첩에 저장하시겠습니까?',
        [
          {
            text: '저장',
            onPress: async() => {
              await CameraRoll.saveToCameraRoll(url, 'photo');
              Alert.alert('사진첩 저장', '사진첩에 저장되었습니다');
            }
          },
          {
            text: '취소',
            style: 'destructive',
          },
        ]
      );
    } catch(err) {
      Alert.alert('사진첩 저장 에러', '다시 시도해주세요');
      console.log(err);
    }
  };

  const _toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const _requestApproval = onClick.bind(null, report._id);

  return (
    <Container style={styles.container}>
      <Card style={styles.cardContainer}>
        <CardHeader
          photo={profilePhoto}
          title={title}
          note={createdAt}
        />
        <CardItem cardBody style={styles.cardBody}>
          <Image source={{ uri: url }} style={styles.image}/>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent onPress={_toggleModal}>
              <Text style={styles.icon}>결재 요청</Text>
            </Button>
          </Left>
          <Button transparent onPress={_saveToCameraRoll}>
            <Icon active name='ios-download' style={styles.icon} />
          </Button>
          <Button transparent>
            <Icon active name='ios-share-alt' style={styles.icon} />
          </Button>
        </CardItem>
      </Card>
      <ReportModal
        modalVisible={modalVisible}
        closeModal={_toggleModal}
        onUserSearch={onUserSearch}
        onClick={_requestApproval}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 650
  },
  cardContainer: {
    borderWidth: 1
  },
  cardBody: {
    height: 500
  },
  image: {
    flex: 1,
    height: 500,
    width: null
  },
  icon: {
    color: Colors.darkGray
  },
  modal: {
    height: 300,
    backgroundColor: Colors.white
  },
  emailBox: {
    width: 300,
    height: 100,
    alignSelf: 'center' ,
    marginTop: 40,
  }
});
