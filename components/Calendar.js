import React from 'react';
import { CalendarList } from 'react-native-calendars';
import Arrow from './Arrow';

export default function Calendar(props) {
  return (
    <CalendarList
      horizontal={true}
      pagingEnabled={true}
      minDate={'2017-01-01'}
      onDayPress={day => {console.log('selected day', day)}}
      onDayLongPress={day => {console.log('selected day', day)}}
      monthFormat={'yyyy년 MM월'}
      onMonthChange={month => {console.log('month changed', month)}}
      renderArrow={direction => (<Arrow direction={direction} />)}
      firstDay={1}
      onPressArrowLeft={substractMonth => substractMonth()}
      onPressArrowRight={addMonth => addMonth()}
      markedDates={{
        '2019-10-10': {marked: true},
        '2019-11-13': {marked: true}
      }}
    />
  );
}
