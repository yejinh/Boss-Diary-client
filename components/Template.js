import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function Template(props) {
  const { navigation, template, path } = props;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(path, { template: template })}
    >
      <View style={styles.templateContainer}>
        <Image
          style={styles.templateThum}
          source={{ uri: template.url }}
        />
        <Text>{template.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  templateContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 20
  },
  templateThum: {
    borderWidth: 0.3,
    width: 180,
    height: 280,
    marginBottom: 10
  }
});
