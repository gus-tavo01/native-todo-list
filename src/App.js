import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import Home from './views/Home';
import Tasks from './views/Tasks';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <StatusBar backgroundColor={Colors.statusbar} />
        <NavigationContainer initialRoute="Lists">
          <Stack.Navigator>
            <Stack.Screen name="Lists" component={Home} options={{ title: 'My lists' }} />
            <Stack.Screen name="Tasks" component={Tasks} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};
export default App;
