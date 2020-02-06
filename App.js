import React from 'react'
import { Text, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import Heading from './components/Heading';

const App = () => {
  return <>
    <StatusBar barStyle="default"/>
    <SafeAreaView>
      <Heading title="todos" />
      <ScrollView>
      </ScrollView>
    </SafeAreaView>
  </>
};

export default App;
