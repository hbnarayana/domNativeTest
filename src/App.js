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
  Platform,
  View,
  Linking,
  Text,
  Modal,
} from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { AuthContext, AuthManager, AuthProvider } from "@hb-nasiruddin/dom-library";
import { appStorage } from "@hb-nasiruddin/dom-library/dist/utils/Constant"
import { WebView } from 'react-native-webview';

//Internal Export 
import { AppString } from './lib/AppString';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Button from './component/Button';
import { env } from './lib/globalConstant';
import Hud from './component/Hud';


const App = () => {


  const { isUserLoggedIn, onServerLogin, setUserLogin, verifyLogin, onLogout } = useContext(AuthContext);
  const [isUserLoginState, setUserLoginState] = useState(false)
  const [showHud, setShowHud] = useState(false)
  const [getUrl, setgetUrl] = useState('')
  const [showPopUp, setShowPopUp] = useState(false)




  useEffect(() => {
    checkedUserLogin()
  }, [])


  // handle login press
  const onloginPress = async () => {
    onServerLogin()
      .then((result) => {
        console.log('result--->', result);
        if (result.success === true) {

          AsyncStorage.setItem(
            appStorage.AUTH_CODE_VERIFIER,
            result.codeVerifier
          );
          setShowPopUp(true)
          setgetUrl(result.url)
          // getDataUserAccessData(result.url)
        }
      })
      .catch((err) => {
        console.log('err--->', err);
      });

  }

  // Handle UserGErAccessData
  const getDataUserAccessData = async (url) => {
    const redirectSchema = Platform.OS === 'android' ? AppString.REDIRECT_SCHEMA : AppString.REDIRECT_URL;
    
    console.log('hwiiii===>',url.split('redirect_uri=')[0] + `redirect_uri=${redirectSchema}`) 
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, redirectSchema, {
          // iOS Properties
          ephemeralWebSession: true,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }).then(response => {
          console.log('response===>', response)
          // Handle SccressData
          // getDataUserAccessData(response);
        }).catch((error12) => {
          InAppBrowser.closeAuth()
          // getDataUserAccessData(url)
          console.log('error123-<', JSON.stringify(error12))
        })
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      console.log('respons errore===>', error)
      Linking.openURL(url);
    }
  }


  // handle logout press
  const onLogoutPress = async() => {
    let authToken = await AsyncStorage.getItem(appStorage.AUTH_TOKEN);
    let refreshToken =await AsyncStorage.getItem(appStorage.AUTH_REFRESH_TOKEN);
    onLogout(
      refreshToken,
      authToken
    ).then((value)=>{
      setgetUrl(value.url)
      setShowPopUp(true)
      console.log('value===>',JSON.stringify(value))
      // getDataUserAccessData(value.url)
    })
  }

  // CallToken API
  const callTokenAPI = async (code) => {
    setShowHud(true)

    var codeVerifier = await AsyncStorage.getItem(appStorage.AUTH_CODE_VERIFIER)
    verifyLogin(code, codeVerifier)
      .then((result) => {
        console.log('verifyLogin---<', result);
        if (result && result.access_token) {
          setUserLogin(true);
          setShowHud(false)
          AsyncStorage.setItem(appStorage.AUTH_TOKEN, result.access_token);
          AsyncStorage.setItem(appStorage.AUTH_REFRESH_TOKEN, result.refresh_token);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }

  //Foir checking user is logged in or not
  const checkedUserLogin = async () => {
    await AsyncStorage.getItem(appStorage.AUTH_TOKEN).then((value) => {
      value ?
        setUserLogin(true)
        :
        setUserLogin(false)
    })
  }

  //UI component
  const LoginPage = () =>{
   return(
    <Modal
    visible={showPopUp}
    transparent={true}
  >
    <View style={styles.webView}>
      <WebView
        containerStyle={styles.webView}
        useWebkit
        startInLoadingState={true}
        cacheEnabled={false}
        onMessage={(data) => {
          console.log('data-->', data)
          // setWebviewData(data.nativeEvent.data)
        }}
        onNavigationStateChange={async (data) => {
          console.log('onNavigationStateChange1-->', data.url)
          if (data.url.indexOf('session_state') > -1) {
            setShowPopUp(false)
            let cropedData = data.url.split('session_state=')[1].split('&code=')
            let sessionState = cropedData[0];
            let code = cropedData[1]
            AsyncStorage.setItem(appStorage.AUTH_CODE, code);
            AsyncStorage.setItem("session_state", sessionState);
            setUserLoginState(true)
            callTokenAPI(code, sessionState)
            console.log('sessionState-->', sessionState, code)
          }
        }}
        source={{
          uri: getUrl
        }}
      />
    </View>
  </Modal>
   ) 
  }

  return (

    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.headerText}>{AppString.userLogin} : {isUserLoggedIn.toString()}</Text>
      {
        !isUserLoggedIn && <Button title={AppString.loginButtonTitle} disabled={isUserLoggedIn} onPress={onloginPress} />
      }
      {
        isUserLoggedIn && <Button title={AppString.logoutButtonTitle} disabled={!isUserLoggedIn} onPress={onLogoutPress} />
      }
      <Hud showHud={showHud} />
      <LoginPage/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 100,
    width: '100%',
    // alignItems: 'center'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    marginBottom: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginHorizontal: 20
  },
  webView: {
    flex: 1,
    zIndex: 2
  }
});

export default () => {

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
