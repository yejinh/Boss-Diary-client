import React, { useState } from 'react';
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
  Header,
  Body,
  Form,
  Item,
  Label,
  Input
} from 'native-base';
import { getDetailDate } from '../utils';

export default function CardHeader(props) {
  const { photo, title, note } = props;

  return (
    <CardItem>
      <Left>
        <Thumbnail source={{ uri: photo }} />
        <Body>
          <Text>{title}</Text>
          {note && <Text note>{getDetailDate(note)}</Text>}
        </Body>
      </Left>
    </CardItem>
  );
}
