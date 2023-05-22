import { View, Text, SafeAreaView,  } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/route.js/routes'
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Provider } from 'react-redux'
import { store } from './src/redux/Store'



const App = () => {
  // const [publishableKey, setPublishableKey] = useState('');
  
  // const fetchPublishableKey = async () => {
  //   const key = await fetchKey(); // fetch key from your server here
  //   setPublishableKey(key);
  // };

  // useEffect(()=>{
  //   fetchPublishableKey()
  // },[])

  const getToken = async() => {
    const FMCToken = await messaging().getToken();
    // console.log( FMCToken)

    await AsyncStorage.setItem("FMCToken", FMCToken)

  }

 

  useEffect(()=>{
    getToken()
  },[])

  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (
    // <StripeProvider publishableKey={"pk_test_51M8ALKAgW8OMwbeWlIQVZDIbJX1S9hMC8vtik17jjS2P04HQi2sbPcxyvKcN90nLJIuYJpeltBZzvT9uh0hfyTWN00r1AqtMkC"}>
    <Provider store={store}>

      <SafeAreaView style={{flex:1}}>

    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
    </SafeAreaView>
    </Provider>
    // </StripeProvider>
  )
}

export default App