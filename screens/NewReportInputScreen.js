import React, { useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet
} from 'react-native';
import { Form, Textarea } from 'native-base';
import Color from '../constants/Colors';

export default function NewReportInputScreen(props) {
  const [ text, onChangeText ] = React.useState('');

  const { navigation } = props;
  const { url } = props.navigation.state.params.template;

  console.log(text);
  useEffect(() => {
    navigation.navigate('NewReportPreview', { text: text });
    return () => {
      console.log('clean up');
    };
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={{ uri: url }}
    >
      <Form>
        <Textarea
          style={styles.inputContainer}
          onChangeText={text => onChangeText(text)}
          placeholder='작성하세요'
          maxLength={200}
          multiline={true}
          value={text}
        />
      </Form>
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
    marginLeft: 30,
    marginTop: 200,
    marginRight: 30,
    paddingTop: 100,
    fontSize: 20
  }
});
