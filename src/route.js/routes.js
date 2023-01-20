import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import GetStart from '../screen/auth/GetStart'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/auth/Login';
import Home from '../screen/protected/Home';
import Detail from '../screen/protected/Detail';
import Emergency from '../screen/protected/Emergency';
import Operational from '../screen/protected/Operational';
import Maintenances from '../screen/protected/Maintenances';
import Notes from '../screen/protected/Notes';
import Communication from '../screen/protected/Communication';
import NoteDetail from '../screen/protected/NoteDetail';
import Animation from '../screen/protected/Animation';

import auth from '@react-native-firebase/auth';
import EditProfile from '../screen/protected/EditProfile';
import SignUp from '../screen/auth/SignUp';
import ForgetPassword from '../screen/auth/ForgetPassword';
import Payment from '../screen/protected/Payment';
import PrivacyPolicy from '../screen/auth/PrivacyPolicy';
import PDFText from '../screen/protected/PDFText';

const Stack = createNativeStackNavigator();


const Routes = () => {

  const [Loader, setLoader] = useState(true)

  useEffect(() => {

    setTimeout(() => {
      setLoader(false)
    }, 4000);

  }, [])


  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  return (
    <Stack.Navigator initialRouteName='GetStart' screenOptions={{ headerShown: false }}>
      {
        Loader == true ?

          <Stack.Screen name='Animation' component={Animation} />
          :

          !user ?
            <>
              <Stack.Screen name="GetStart" component={GetStart} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
              <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />



            </>
            :
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name='Detail' component={Detail} />
              <Stack.Screen name='Emergency' component={Emergency} />
              <Stack.Screen name='Operational' component={Operational} />
              <Stack.Screen name='Maintenances' component={Maintenances} />
              <Stack.Screen name='EditProfile' component={EditProfile} />
              <Stack.Screen name='Communication' component={Communication} />
              <Stack.Screen name='Notes' component={Notes} />
              <Stack.Screen name='NoteDetail' component={NoteDetail} />
              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen name="PDFText" component={PDFText} />
            </>
      }
    </Stack.Navigator>
  )
}


export default Routes