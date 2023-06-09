import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Start from './Screens/Start';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Gallery from './Screens/Gallery';
import Profile from './Screens/Profile';
import EditProfile from './Screens/EditProfile';
import BottomTab from './Screens/BottomTab';
import { SafeAreaView } from 'react-native';
import FollowTab from './Screens/FollowTab';
import { auth } from './Firebase/firebase-setup';
import { onAuthStateChanged } from 'firebase/auth';
import Create from './Screens/Create';
import Map from './Screens/Map';
import * as Notifications from 'expo-notifications'

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification:async()=>{
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,}
    }
  }
)


export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      onAuthStateChanged(auth, (user)=>{
          if (user) {
              setIsAuthenticated(true);
          } else {
              setIsAuthenticated(false);
          }
      });
  },[]);


  useEffect(()=>{
    const subscription1 =Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("notification received :", notification);
      });

    // const subscription2 = Notifications.addNotificationResponseReceivedListener(
    //   response => {
    //     const url = response.notification.request.content.data.url;
    //     Linking.openURL(url);
    //   })
    return () => {
      subscription1.remove();
      // subscription2.remove();
    }
  
  },[]);

  useEffect(() => {
    async function notificationCateogry() {
      await Notifications.setNotificationCategoryAsync("welcome", [
        {
          buttonTitle: `Don't open app`,
          identifier: "first-button",
          options: {
            opensAppToForeground: false,
          },
        },
        {
          buttonTitle: "Respond with text",
          identifier: "second-button-with-text",
          textInput: {
            submitButtonTitle: "Submit button",
            placeholder: "Placeholder text",
          },
        },
        {
          buttonTitle: "Open app",
          identifier: "third-button",
          options: {
            opensAppToForeground: true,
          },
        },
      ]);
    }
    notificationCateogry();
  }, []);

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
    <Stack.Screen name="Gallery" component={Gallery} options={{headerShown: true}}/>
    <Stack.Screen name="Follow" component={FollowTab} options={{headerShown: true}}/>
    <Stack.Screen name="Edit Profile" component={EditProfile} options={{headerShown: true}}/>
    <Stack.Screen name="Third Profile" component={Profile} options={{headerShown: true}}/>
    <Stack.Screen name="Edit Diary" component={Create} options={{headerShown: true}}/>
    <Stack.Screen name="Map" component={Map}/>
    </>
  )

  return (
    <SafeAreaView style={{ flex: 1}}>

    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {isAuthenticated ? AppStack : AuthStack}
        </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}
