/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import * as http from './src/request/index';
import * as Net from './src/request/requestTest';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const App: () => React$Node = () => {
  return (
    <View style={styles.containt}>
      <TouchableOpacity
        style={styles.bttton}
        onPress={() => {
          http.get('users', {showLoading: true}).then(res => {
            console.log('-------------------res', res[0].address.city);
          });
          
          // 去除重复请求
          // for (var i = 0; i < 10; i++) {
          //   Net.getRequest('users',{showLoading: true}).then(res => {
          //     console.log('-------------------res', res[0].address.city);
          //   });
          // }

          // Net.getRequest('users', {showLoading: true}).then(res => {
          //   console.log('-------------------res', res[0].address.city);
          // });
        }}>
        <Text>请求</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bttton: {
    width: 200,
    height: 50,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0',
  },
});

export default App;
