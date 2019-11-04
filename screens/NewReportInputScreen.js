import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native';
import Color from '../constants/Colors';

export default function NewReportInputScreen(props) {
  return (
    <View>
      <ScrollView>
        <Text>
          INPUT
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.ultraLightGray,
  }
});
