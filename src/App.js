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


  const { isUserLoggedIn, onServerLogin, setUserLogin, verifyLogin } = useContext(AuthContext);
  const [isUserLoginState, setUserLoginState] = useState(false)
  const [showHud, setShowHud] = useState(false)
  const [getUrl, setgetUrl] = useState('')
  const [showPopUp, setShowPopUp] = useState(false)




  useEffect(() => {

  }, [])

  // const callFetchCall = async () => {
  //   // axios({
  //   //   method: 'POST',
  //   //   url: `http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json`,
  //   // }).then((response) => {
  //   //   console.log("data=============", response);
  //   // }).catch(err2 => {
  //   //   console.log("Err22=============", JSON.stringify(err2));
  //   // })

  //   const url = 'https://hubert.d.dom.de/auth/realms/Kaufland/protocol/openid-connect/auth?code_verifier=j9h7L1q703Vd7rJyqDH8rd4X8SufsXw5KKMpqFcrtqroiuy5HiXSsuzL19m9wzYd&response_type=code&client_id=kaufland&scope=openid+all+csc+prepaidActivation&code_challenge_method=S256&code_challenge=S7-6m06X5lx5c97fYAZxNmI4PRWWFJrjNWwzGrpOqPw&redirect_uri=pkce-smpl://callback'
  //   if (await InAppBrowser.isAvailable()) {
  //     InAppBrowser.openAuth(url, '', {
  //       // iOS Properties
  //       ephemeralWebSession: true,
  //       // Android Properties
  //       showTitle: false,
  //       enableUrlBarHiding: true,
  //       enableDefaultShare: false
  //     }).then((response) => {
  //       console.log('response-<', JSON.stringify(response))
  //       if (
  //         response.type === 'success' &&
  //         response.url
  //       ) {
  //         Linking.openURL(response.url)
  //       }
  //     }).catch((error12) => {
  //       InAppBrowser.closeAuth()
  //       callFetchCall()
  //       console.log('error123-<', JSON.stringify(error12))
  //     })

  //   }
  //   else Linking.openURL(url)

  //   // parses JSON response into native JavaScript objects
  // }

  // const callOpenURL = async () => {
  //   try {
  //     const url = 'https://www.proyecto26.com'
  //     if (await InAppBrowser.isAvailable()) {
  //       const result = await InAppBrowser.open(url, {
  //         // iOS Properties
  //         dismissButtonStyle: 'cancel',
  //         preferredBarTintColor: '#453AA4',
  //         preferredControlTintColor: 'white',
  //         readerMode: false,
  //         animated: true,
  //         modalPresentationStyle: 'fullScreen',
  //         modalTransitionStyle: 'coverVertical',
  //         modalEnabled: true,
  //         enableBarCollapsing: false,
  //         // Android Properties
  //         showTitle: true,
  //         toolbarColor: '#6200EE',
  //         secondaryToolbarColor: 'black',
  //         navigationBarColor: 'black',
  //         navigationBarDividerColor: 'white',
  //         enableUrlBarHiding: true,
  //         enableDefaultShare: true,
  //         forceCloseOnRedirection: false,
  //         // Specify full animation resource identifier(package:anim/name)
  //         // or only resource name(in case of animation bundled with app).
  //         animations: {
  //           startEnter: 'slide_in_right',
  //           startExit: 'slide_out_left',
  //           endEnter: 'slide_in_left',
  //           endExit: 'slide_out_right'
  //         },
  //         headers: {
  //           'my-custom-header': 'my custom header value'
  //         }
  //       })
  //       console.log('result0000-<', result)
  //       // Alert.alert(JSON.stringify(result))
  //     }
  //     else Linking.openURL(url)
  //   } catch (error) {
  //     InAppBrowser.close()
  //   }
  // }

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
    const redirectSchema = Platform.OS === 'ios' ? AppString.REDIRECT_SCHEMA : AppString.REDIRECT_URL;
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
          getDataUserAccessData(url)
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
  const onLogoutPress = () => {

  }

  return (

    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.headerText}>{AppString.userLogin} : {isUserLoginState.toString()}</Text>
      {
        !isUserLoginState && <Button title={AppString.loginButtonTitle} disabled={isUserLoginState} onPress={onloginPress} />
      }
      {
        isUserLoginState && <Button title={AppString.logoutButtonTitle} disabled={isUserLoginState} onPress={onLogoutPress} />
      }
      <Hud showHud={showHud} />
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
            onNavigationStateChange={(data) => {
              console.log('onNavigationStateChange1-->', data.url)
              if(data.url.indexOf('session_state') > -1){
                setShowPopUp(false)
                let cropedData = data.url.split('session_state=')[1].split('&code=')
                let session = cropedData[0];
                let  code  = cropedData[1]
                 setUserLoginState(true)
                console.log('onNavigationStateChange-->', session, code)
              }
            }}
            source={{
              uri: getUrl
            }}
          />
        </View>
      </Modal>
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
    zIndex : 2
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
