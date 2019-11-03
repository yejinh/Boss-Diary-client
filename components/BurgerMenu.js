import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import TabBarIcon from './TabBarIcon';

export default function BurgerMenu(props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.nav.openDrawer()}
    >
      <TabBarIcon name='ios-menu' />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20
  }
});
