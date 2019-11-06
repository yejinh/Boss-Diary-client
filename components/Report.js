import React from 'react';
import { Image } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from 'native-base';
import { getDate } from '../utils';

export default function Report(props) {
  const { profilePhoto, report } = props;
  const { title, created_at: createdAt, url } = report;

  return (
    <Container>
      <Header />
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: profilePhoto }} />
              <Body>
                <Text>{title}</Text>
                <Text note>{getDate(createdAt)}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{ uri: url }} style={{ height: 200, width: null, flex: 1 }}/>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Left>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4 Comments</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}
