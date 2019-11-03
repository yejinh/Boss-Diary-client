import React from 'react';
import {
  ScrollView,
  View,
  Button,
  Image,
  Text,
  Alert,
  StyleSheet
} from 'react-native';
import Color from '../constants/Colors';

export default function SettingsScreen(props) {
  const { navigation } = props;
  const { name, points, url } = props.navigation.state.params.template;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.templateContainer}>
          <Image
            style={styles.templateThum}
            source={{ uri: url }}
          />
          <View>
            <Text>{points} points</Text>
            <Button
              onPress={() => {
                Alert.alert('보고서 추가', `${name}를 구매 하시겠습니까?`,
                  [
                    {
                      text: '구입',
                      onPress: () => console.log('Ask me later pressed')
                    },
                    {
                      text: '취소',
                      onPress: () => navigation.navigate('Templates'),
                      style: 'destructive',
                    }
                  ]
                );
              }}
              title='구매하기'
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
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
    alignItems: 'center',
    marginTop: 20
  },
  templateThum: {
    width: 400,
    height: 600,
    borderRadius: 10
  }
});
