import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native';
import LoadingSpinner from '../components/Spinner';
import Template from '../components/Template';
import Color from '../constants/Colors';

export default function NewReportScreen(props) {
  const { navigation } = props;
  const { userData, userTemplates, fetchUserTemplates } = props.screenProps;

  if (!userData) return <LoadingSpinner />;

  useEffect(() => {
    fetchUserTemplates(userData._id);
  }, [ userData ]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.templatesContainer}>
          {userTemplates.map(template => (
            <Template
              key={template._id}
              template={template}
              navigation={navigation}
              path={'NewReportInput'}
            />
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
  templatesContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginRight: 10,
    marginLeft: 20,
  }
});
