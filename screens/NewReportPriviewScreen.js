import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet
} from 'react-native';
import {
  Container,
  View,
  Fab,
  Button,
  Icon,
  Text
} from 'native-base';
import Colors from '../constants/Colors';

const fontFamilyList = [ 'yeonsung', 'euljiro', 'myeongjo', 'batang' ];
const fontName = [ '연성', '을지', '명조', '바탕' ];

export default function NewReportInputScreen(props) {
  const [ isActive, setIsActive ] = useState(false);
  const [ fontSize, setFontSize ] = useState(20);
  const [ fontFamily, setFontFamily ] = useState('myeongjo');

  const { text, template } = props.navigation.state.params;

  return (
    <Container>
      <ImageBackground
        style={styles.container}
        source={{ uri: template.url }}
      >
        <View style={styles.textContainer}>
          <Text
            style={{ fontFamily: fontFamily, fontSize: fontSize }}
          >
            {text}
          </Text>
        </View>
        <View style={styles.fabConatiner}>
          <Fab
            active={isActive}
            direction='left'
            style={styles.mainFab}
            position='bottomRight'
            onPress={() => setIsActive(!isActive)}
          >
            <Icon name='ios-hammer' />
            {fontFamilyList.map((font, i) => (
              <Button
                style={styles.fab}
                key={font}
                onPress={() => setFontFamily(font)}
              >
                <Text style={{ fontFamily: font, fontSize: 12 }}>{fontName[i]}</Text>
              </Button>
            ))}
          </Fab>
        </View>
      </ImageBackground>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover'
  },
  textContainer: {
    borderWidth: 1,
    height: 300,
    marginTop: 300,
    marginLeft: 30,
    marginRight: 30
  },
  fabConatiner: {
    flex: 1
  },
  mainFab: {
    backgroundColor: Colors.gray
  },
  fab: {
    backgroundColor: Colors.deepGreen
  },
  myeongjo: {
    fontSize: 12,
    fontFamily: 'myeongjo'
  },
  bating: {
    fontSize: 12,
    fontFamily: 'batang',
  },
  euljiro: {
    fontSize: 12,
    fontFamily: 'euljiro'
  },
  yeonsung: {
    fontSize: 12,
    fontFamily: 'yeonsung'
  }
});
