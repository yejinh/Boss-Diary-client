import React, { useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function ReportsScreen(props) {
  ReportsScreen.navigationOptions = {
    title: '이부장의 보고서',
  };

  const { fetchUserData } = props.screenProps;

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <ScrollView>
      <Text>HEllo</Text>
    </ScrollView>
  );
}
