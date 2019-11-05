import React from 'react';
import {
  ImageBackground,
  View,
  Button,
  Alert,
  StyleSheet
} from 'react-native';
import { Form, Textarea } from 'native-base';
import Color from '../constants/Colors';

export default function NewReportInputScreen(props) {
  const [ text, onChangeText ] = React.useState('안녕하세요 만나서 반가워요 이것은 보고서입니다. 보고서라구요 보고서보고서');

  const { navigation } = props;
  const { template } = props.navigation.state.params;
  const onPreviewClick = () => {
    if (text.length < 30) {
      return Alert.alert('작성', '보고서를 30자 이상 작성해 주세요');
    }

    navigation.navigate('NewReportPreview', { text: text, template: template });
  };

  return (
    <ImageBackground
      style={styles.container}
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
      <View style={styles.bottom}>
        <Button
          style={styles.previewButton}
          title='미리보기'
          onPress={onPreviewClick}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover'
  },
  inputContainer: {
    borderWidth: 1,
    height: 300,
    marginTop: 300,
    marginLeft: 30,
    marginRight: 30,
    fontFamily: 'myeongjo'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15
  }
});
