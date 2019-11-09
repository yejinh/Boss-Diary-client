import React, { useState } from 'react';
import { Image, CameraRoll, Alert, StyleSheet,  Picker } from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Thumbnail,
  View,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body
} from 'native-base';
import Modal from 'react-native-modal';
import BottomButton from './BottomButton';
import { getDetailDate } from '../utils';
import Colors from '../constants/Colors';

export default function Report(props) {
  const [ modalVisible, setModalVisible ] = useState(false);

  const { profilePhoto, report } = props;
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

  return (
    <Container style={styles.container}>
      <Card style={styles.cardContainer}>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: profilePhoto }} />
            <Body>
              <Text>{title}</Text>
              <Text note>{getDetailDate(createdAt)}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody style={styles.cardBody}>
          <Image source={{ uri: url }} style={styles.image}/>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent onPress={() => setModalVisible(!modalVisible)}>
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
      <Modal isVisible={modalVisible}>
        <View style={styles.modal}>
          {/* 유저 아이디 넣어서 찾기 */}
          <BottomButton
            title='찾기'
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </Modal>
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
  }
});
