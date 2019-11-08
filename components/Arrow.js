import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import TabBarIcon from './TabBarIcon';

export default function Arrow(props) {
  const { direction } = props;

  if (direction === 'left') {
    return <TabBarIcon name='ios-arrow-back' />;
  }

  return <TabBarIcon name='ios-arrow-forward' />;
}
