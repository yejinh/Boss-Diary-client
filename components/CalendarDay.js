import React from 'react';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';

export default function CalendarDay(props) {
  const { day } = props;

  console.log(day);
  return (
    <Container>
      <Text>
        {day ? day.day : ''}
      </Text>
    </Container>
  );
}
