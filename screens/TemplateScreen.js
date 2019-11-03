import React, { useEffect } from 'react';
import { Spinner } from 'native-base';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function SettingsScreen(props) {
  const { navigation } = props;
  const { fetchTemplates, templates } = props.screenProps;

  useEffect(() => {
    fetchTemplates();
  }, []);

  if (!templates.length) return <Spinner style={styles.spinnerContainer} color={'#999999'} />;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.templatesContainer}>
          {templates.map(template => (
            <TouchableOpacity
              key={template._id}
              onPress={() => navigation.navigate('TemplateDetail', { template: template })}
            >
              <View style={styles.templateContainer}>
                <Image
                  style={styles.templateThum}
                  source={{ uri: template.url }}
                />
                <Text>{template.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    width: 200,
    height: 300,
    borderRadius: 10
  }
});
