import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Start from './Screens/Start';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Gallery from './Screens/Gallery';
import Profile from './Screens/Profile';
import Follow from './Screens/Follow';
import EditProfile from './Screens/EditProfile';
import BottomTab from './Screens/BottomTab';
import { SafeAreaView } from 'react-native';
import FollowTab from './Screens/FollowTab';

const Stack = createNativeStackNavigator();

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const AuthStack = (
    <>
    <Stack.Screen name="Start" component={Start} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
    </>
  )

  const AppStack = (
    <>
    <Stack.Screen name="Plant Diary" component={BottomTab} />
    <Stack.Screen name="Gallery" component={Gallery} />
    <Stack.Screen name="Follow" component={FollowTab} options={{headerShown: true}}/>
    <Stack.Screen name="Edit Profile" component={EditProfile} options={{headerShown: true}}/>
    <Stack.Screen name="Third Profile" component={Profile} options={{headerShown: true}}/>
    </>
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
        {/* <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:"pink"}, headerTitleStyle:{color:"purple", fontSize: 18}, headerTitleAlign:"center"}}> */}
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {isAuthenticated ? AppStack : AuthStack}
        </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}
