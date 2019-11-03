import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import LoadingSpinner from '../components/Spinner';
import Color from '../constants/Colors';

export default function SettingsScreen(props) {
  const { navigation } = props;
  const { fetchTemplates, templates } = props.screenProps;

  useEffect(() => {
    fetchTemplates();
  }, []);

  if (!templates.length) return <LoadingSpinner />;

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
    backgroundColor: Color.ultraLightGray,
  },
  spinnerContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center'
  },
  templatesContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginRight: 10,
    marginLeft: 20,
  },
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
