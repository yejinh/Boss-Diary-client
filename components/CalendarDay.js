import React from 'react';
import { Container, Text } from 'native-base';

export default function CalendarDay(props) {
  const { day } = props;

  return (
    <Container>
      <Text>
        {day ? day.day : ''}
      </Text>
    </Container>
  );
}
