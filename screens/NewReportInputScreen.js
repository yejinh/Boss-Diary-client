import React from 'react';
import {
  ScrollView,
  ImageBackground,
  View,
  Button,
  Alert,
  StyleSheet
} from 'react-native';
import { Form, Textarea } from 'native-base';

export default function NewReportInputScreen(props) {
  const [ text, onChangeText ] = React.useState('라떼는 말이야...');

  const { navigation } = props;
  const { template } = props.navigation.state.params;
  const onPreviewClick = () => {
    if (text.length < 10) {
      return Alert.alert('작성', '보고서를 30자 이상 작성해 주세요');
    }

    navigation.navigate('NewReportPreview', { text: text, template: template });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='never'
    >
      <ImageBackground
        style={styles.imageContainer}
        source={{ uri: template.url }}
      >
        <Form>
          <Textarea
            style={styles.inputContainer}
            onChangeText={text => onChangeText(text)}
            placeholder='작성하세요'
            maxLength={100}
            multiline={true}
            value={text}
          />
        </Form>
      </ImageBackground>
      <View style={styles.bottom}>
        <Button
          style={styles.previewButton}
          title='미리보기'
          onPress={onPreviewClick}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  contentContainer: {
    flexGrow: 1
  },
  imageContainer: {
    flex: 1,
    resizeMode: 'cover'
  },
  inputContainer: {
    height: 300,
    marginTop: 250,
    marginLeft: 30,
    marginRight: 30,
    fontFamily: 'myeongjo'
  },
  bottom: {
    justifyContent: 'flex-end',
    marginBottom: 15
  }
});
