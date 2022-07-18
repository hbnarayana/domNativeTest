/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { ExampleComponent } from "@hbnarayana/dom-auth-sdk-react-library";
import { App as DApp, TodosContext } from "@hb-nasiruddin/dom-library";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { getAllList } = useContext(TodosContext);

  useEffect(() => {
    console.log("Working or What!!!?", getAllList());
  },[]);
  
  return (


    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {

  useEffect(() => {
    callAPI()
  }, [])

  const callAPI = async () => {
    try {
      var data = await ExampleComponent()
      console.log('data', JSON.stringify(data))
    } catch (error) {
      console.log('Error', JSON.stringify(error))
    }

  }

  // var ExampleComponent = async() =>{
  //   try {
  //     await axios({
  //       method: 'POST',
  //       url: "http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json"
  //     }).then(function (response) {
  //       console.log('data',JSON.stringify(response))
  //     });
  //   } catch (error) {
  //     console.log('Error',JSON.stringify(error))
  //   }
  // };
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <DApp>


      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.js</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            <Section title="Debug">
              <DebugInstructions />
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </DApp>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;