import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/route.js/routes'
// import { StripeProvider } from '@stripe/stripe-react-native';


const App = () => {
  // const [publishableKey, setPublishableKey] = useState('');
  
  // const fetchPublishableKey = async () => {
  //   const key = await fetchKey(); // fetch key from your server here
  //   setPublishableKey(key);
  // };

  // useEffect(()=>{
  //   fetchPublishableKey()
  // },[])
  return (
    // <StripeProvider publishableKey={"pk_test_51M8ALKAgW8OMwbeWlIQVZDIbJX1S9hMC8vtik17jjS2P04HQi2sbPcxyvKcN90nLJIuYJpeltBZzvT9uh0hfyTWN00r1AqtMkC"}>

    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
    // </StripeProvider>
  )
}

export default App