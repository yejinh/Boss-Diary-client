import React from 'react';
import {
  Image,
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
    onSaveClick,
    onDeleteClick,
    onClick,
    isApprovalPage
  } = props;
  const { title, created_at: createdAt, url } = report;

  const _clickButton = () => {
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
            <Button transparent onPress={_clickButton}>
              <Text style={styles.icon}>{buttonText}</Text>
            </Button>
          </Left>
          {!isApprovalPage &&
            <>
              <Button transparent onPress={onSaveClick}>
                <Icon active name='ios-download' style={styles.icon} />
              </Button>
              <Button transparent onPress={onDeleteClick}>
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
