import React, {Component} from 'react';
import {Text, StyleSheet, View, BackHandler, Dimensions,} from 'react-native';
import RootSiblings from 'react-native-root-siblings';

let lastPopView;
class LoadView extends Component {
  static show = () => {
    if (lastPopView !== undefined) {
      LoadView.hide(lastPopView);
    }
    lastPopView = new RootSiblings((<DialogLoading />));

    this.back = BackHandler.addEventListener('hardwareBackPress', () => {
      this.hide();
      return true;
    });
  };

  static hide = () => {
    this.back.remove();
    lastPopView.destroy();
  };

  render() {
    return null;
  }
}

class DialogLoading extends Component {
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.6)',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}>
        <Text> 正在加载.... </Text>
      </View>
    );
  }
}

export default LoadView;
