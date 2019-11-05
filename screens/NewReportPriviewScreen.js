import React, { useState, useRef } from 'react';
import { captureRef } from 'react-native-view-shot';
import {
  ImageBackground,
  CameraRoll,
  Alert,
  Button,
  StyleSheet
} from 'react-native';
import {
  Container,
  View,
  Fab,
  Icon,
  Text
} from 'native-base';
import Colors from '../constants/Colors';
import { fontFamilyList, fontName, fontSizeList } from '../constants/Fonts';

export default function NewReportInputScreen(props) {
  const [ isActive, setIsActive ] = useState(false);
  const [ fontSize, setFontSize ] = useState(20);
  const [ fontFamily, setFontFamily ] = useState('myeongjo');
  const screen = useRef(null);

  const { onReportSubmit } = props.screenProps;
  const { text, template } = props.navigation.state.params;

  const submit = async() => {
    const data = await captureRef(screen, {
      result: 'base64',
      format: 'jpg',
      quality: 0.8,
    });

    console.log(data);
    onReportSubmit(text, url, template._id);
  };

  return (
    <Container>
        <ImageBackground
          style={styles.container}
          source={{ uri: template.url }}
          ref={screen}
        >
          <View style={styles.textContainer}>
            <Text
              style={{ fontFamily: fontFamily, fontSize: fontSize }}
            >
              {text}
            </Text>
          </View>
        </ImageBackground>
      <View style={styles.fabConatiner}>
        <Fab
          active={isActive}
          direction='up'
          style={styles.mainFab}
          position='bottomRight'
          onPress={() => setIsActive(!isActive)}
        >
          <Icon name='ios-color-wand' />
          {fontFamilyList.map((font, i) => (
            <Button
              style={styles.fontButton}
              key={font}
              onPress={() => setFontFamily(font)}
            >
              <Text style={[styles.fontBase, { fontFamily: font } ]}>
                {fontName[i]}
              </Text>
            </Button>
          ))}
          {fontSizeList.map(size => (
            <Button
              style={styles.sizeButton}
              key={size}
              onPress={() => setFontSize(size)}
            >
              <Text style={styles.fontBase}>{size}</Text>
            </Button>
          ))}
        </Fab>
      </View>
      <View style={styles.bottom}>
        <Button
          title='저장하기'
          onPress={() => Alert.alert(
            '보고서 제출',
            `${template.name}를 제출하시겠습니까?`,
            [
              {
                text: '제출',
                onPress: submit
              },
              {
                text: '취소',
                style: 'destructive',
              },
            ]
          )}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover'
  },
  textContainer: {
    height: 300,
    marginTop: 300,
    marginLeft: 30,
    marginRight: 30
  },
  mainFab: {
    backgroundColor: Colors.deepGray
  },
  sizeButton: {
    backgroundColor: Colors.deepGreen
  },
  fontButton: {
    backgroundColor: Colors.darkGray
  },
  fontBase: {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 12
  },
  bottom: {
    justifyContent: 'flex-end',
    marginBottom: 15
  }
});
