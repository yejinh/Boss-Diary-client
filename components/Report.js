import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body
} from 'native-base';
import { getDetailDate } from '../utils';

export default function Report(props) {
  const { profilePhoto, report } = props;
  const { title, created_at: createdAt, url } = report;

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
            <Button transparent>
              <Icon active name='thumbs-up' />
              <Text>결재 요청</Text>
            </Button>
          </Left>
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
  }
});
