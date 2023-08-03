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




const App = () => {
  // const [publishableKey, setPublishableKey] = useState('');

  // const fetchPublishableKey = async () => {
  //   const key = await fetchKey(); // fetch key from your server here
  //   setPublishableKey(key);
  // };

  // useEffect(()=>{
  //   fetchPublishableKey()
  // },[])

  useEffect(() => {

    // console.log("Running>>>>>>>>>>>>>>>>")
    RNPdftron.initialize("Dynamic Digital Solutions, LLC (agilewebstudios.com):OEM:Dynamic Digital Solutions, LLC::I:AMS(20240618):5C77A7201FA7D4D0D3337A7160610F9DB708AD0595D54DCA54E510D65A8CB6F5C7");

    RNPdftron.enableJavaScript(true);
    
    // RNPdftron.getVersion().then((version) => {
    //   console.log("Current PDFNet version:", version);
    // });
  }, [])

  const getToken = async () => {
    const FMCToken = await messaging().getToken();
    // console.log( FMCToken)

    await AsyncStorage.setItem("FMCToken", FMCToken)

  }



  useEffect(() => {
    getToken()
  }, [])

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