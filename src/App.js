/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useContext, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  Platform,
  TextInput,
  Linking,
  Text,
} from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
// import Config from 'react-native-config';
import { AuthContext, AuthManager, AuthProvider } from "@hb-nasiruddin/dom-library";

//Internal Export 
import AppString from './lib/AppString';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const App = () => {


  const { isUserLoggedIn, onLogin } = useContext(AuthContext);
  const [isUserLogin, setUserLogin] = useState(false)
  const [number, setNumber] = useState('')
  const [passwordInput, setPasswordInput] = useState('')


  useEffect(() => {
   
    // callFetchCall()

  }, [])

  // const callFetchCall = async () => {
  //   axios({
  //     method: 'POST',
  //     url: `http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json`,
  //   }).then((response) => {
  //     console.log("data=============", response);
  //   }).catch(err2 => {
  //     console.log("Err22=============", JSON.stringify(err2));
  //   })
  //   // parses JSON response into native JavaScript objects
  // }

  // handle login press
  const onloginPress = async (url) => {
    onLogin({
      username: number,
      password: passwordInput
    })

    // const redirectSchema = Platform.OS === 'ios' ? Config.REDIRECT_SCHEMA : Config.REDIRECT_URL;
    // try {
    //   if (await InAppBrowser.isAvailable()) {
    //     InAppBrowser.openAuth(url, redirectSchema, {
    //       // iOS Properties
    //       ephemeralWebSession: false,
    //       // Android Properties
    //       showTitle: false,
    //       enableUrlBarHiding: true,
    //       enableDefaultShare: false,
    //     }).then(response => {
    //       console.log('response===>', response)
    //       // Handle SccressData
    //       getDataUserAccessData(response);
    //     });
    //   } else {
    //     Linking.openURL(url);
    //   }
    // } catch (error) {
    //   console.log('respons errore===>', error)
    //   Linking.openURL(url);
    // }
  }

  // Handle UserGErAccessData
  const getDataUserAccessData = () => {

  }


  // handle logout press
  const onLogoutPress = () => {

  }

  return (

    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.headerText}>{AppString.userLogin} : {isUserLoggedIn}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text)=>{
          setNumber(text)
        }}
        value={number}
        placeholder="Phone Nuber"
        keyboardType="numeric"
      />
       <TextInput
        style={styles.input}
        onChangeText={(text)=>{
          setPasswordInput(text)
        }}
        value={passwordInput}
        placeholder="Password"
        keyboardType="numeric"
      />
      <Button title={AppString.loginButtonTitle} disabled={isUserLogin} color={'blue'} onPress={onloginPress} />
      <Button title={AppString.logoutButtonTitle} disabled={!isUserLogin} color={'red'} onPress={onLogoutPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop  :100,
    width : '100%',
    // alignItems: 'center'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign  :'center'
  },
  input :{
    marginBottom : 20,
    borderBottomColor : 'black',
    borderBottomWidth : 1,
    marginHorizontal  :20
  }
});

export default () => {
  const env = {
    "REACT_APP_AUTH_REALM": 'Kaufland',
    "REACT_APP_AUTH_HOST": "https://hubert.d.dom.de",
    "REACT_APP_AUTH_CLIENT_SECRET": 'aa0cec6c-454d-4d75-a9ba-b213d86aa02f',
    "REACT_APP_AUTH_CLIENT_ID": 'kaufland'
  }
  return (
    <AuthManager
      {
      ...{
        env: env,
        storage: AsyncStorage
      }
      }
    >
      <App />
    </AuthManager>
  )
} 
