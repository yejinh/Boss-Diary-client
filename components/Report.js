import React from 'react';
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
import Colors from '../constants/Colors';

export default function Report(props) {
  const {
    buttonText,
    profilePhoto,
    report,
    openModal,
    onClick,
    onDeleteClick,
    isApprovalPage
  } = props;
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

  const _delete = async() => {
    try {
      Alert.alert(
        '보고서 삭제',
        '선택한 보고서를 삭제하시겠습니까?',
        [
          {
            text: '삭제',
            onPress: async() => {
              await onDeleteClick();
              Alert.alert('보고서 삭제', '보고서가 삭제되었습니다');
            }
          },
          {
            text: '취소',
            style: 'destructive',
          },
        ]
      );
    } catch(err) {
      Alert.alert('보고서 삭제 에러', '다시 시도해주세요');
      console.log(err);
    }
  };

  const _requestApproval = () => {
    if (openModal) {
      openModal();
    }
    onClick();
  };

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
            <Button transparent onPress={_requestApproval}>
              <Text style={styles.icon}>{buttonText}</Text>
            </Button>
          </Left>
          {!isApprovalPage &&
            <>
              <Button transparent onPress={_saveToCameraRoll}>
                <Icon active name='ios-download' style={styles.icon} />
              </Button>
              <Button transparent onPress={_delete}>
                <Icon active name='ios-trash' style={styles.icon} />
              </Button>
            </>
          }
        </CardItem>
      </Card>
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
