import { View, Text, SafeAreaView, } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/route.js/routes'
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Provider } from 'react-redux'
import { store } from './src/redux/Store'
import { RNPdftron, PDFViewCtrl, } from "react-native-pdftron";

import { fcmService} from './src/screen/Notifications/FCM-Services'
import { localNotificationService } from './src/screen/Notifications/Local-Notification-Services'
// const admin = require('firebase-admin');


const App = () => {

  useEffect(() => {

    requestUserPermission()
    RNPdftron.initialize("Dynamic Digital Solutions, LLC (agilewebstudios.com):OEM:Dynamic Digital Solutions, LLC::I:AMS(20240618):5C77A7201FA7D4D0D3337A7160610F9DB708AD0595D54DCA54E510D65A8CB6F5C7");
    RNPdftron.enableJavaScript(true);
  }, [])

  // useEffect(() => {
  //   getToken()
  // }, [])
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  // const getToken = async () => {
  //   const FMCToken = await messaging().getToken();
  //   // console.log( FMCToken)
  //   await AsyncStorage.setItem("FMCToken", FMCToken)

  // }

  //notification 
  useEffect(() => {

    notificationInitilize();
  }, []);

  const notificationInitilize = () => {
    if (Platform.OS === 'android') {
      localNotificationService.createNotificationChannel();
    }
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
    return () => {
      fcmService.unRegister();
      localNotificationService.unRegister();
    };
  };

  const onRegister =async  token => {


  
    console.log("tokenn....",token)


    try {
      const data = JSON.stringify({fcmToken: token});
  
      await AsyncStorage.setItem("FMCToken", token)


      // const response = await fetchApi({
      //   method: 'put',
      //   endPoint: endPoint.POST_FCM,
      //   token: true,
      //   data,
      // });
    } catch (error) {
      console.log(error, 'fcm api error');
    }
  };
  
  const onNotification = notify => {
    const options = {
      soundName: 'default',
      playSound: true,
    };
  
    localNotificationService.showNotification(
      0,
      notify.notification.title,
      notify.notification.body,
      notify,
      options,
    );
  };
  
  const onOpenNotification = async notify => {

  }  


  //notitification





  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    // <StripeProvider publishableKey={"pk_test_51M8ALKAgW8OMwbeWlIQVZDIbJX1S9hMC8vtik17jjS2P04HQi2sbPcxyvKcN90nLJIuYJpeltBZzvT9uh0hfyTWN00r1AqtMkC"}>
    <Provider store={store}>

      <SafeAreaView style={{ flex: 1 }}>

        <NavigationContainer>
          <Routes />

        </NavigationContainer>
      </SafeAreaView>
    </Provider>
    // </StripeProvider>
  )
}

export default App