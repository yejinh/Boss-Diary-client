import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native';
import LoadingSpinner from '../components/Spinner';
import Template from '../components/Template';
import EmptyScreen from '../components/EmptyScreen';
import Color from '../constants/Colors';

export default function NewReportScreen(props) {
  const [ isFetched, setIsFetched ] = useState(false);

  const { navigation } = props;
  const { userData, userTemplates, fetchUserTemplates } = props.screenProps;

  const didFocus = navigation.addListener('didFocus', async() => {
    await fetchUserTemplates(userData._id);
    setIsFetched(true);
  });

  useEffect(() => {
    return () => didFocus.remove();
  });

  if (!userTemplates.length && !isFetched) return <LoadingSpinner />;
  if (!userTemplates.length) return <EmptyScreen message={'보유한 템플릿이 없습니다'}/>;

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
