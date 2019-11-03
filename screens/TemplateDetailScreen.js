import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

export default function SettingsScreen(props) {
  const { name, url } = props.navigation.state.params.template;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.templateThum}
          source={{ uri: url }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  spinnerContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center'
  },
  templatesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  templateContainer: {
    flex: 1,
    alignItems: 'center'
  },
  templateThum: {
    width: 400,
    height: 600,
    borderRadius: 10
  }
});
